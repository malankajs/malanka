import {Events} from './Events';
import {Planner} from './Planner';

export class ValueProxy<T> extends Events {
    private parents: ValueProxy<T>[];
    private isActive: boolean;
    protected value: T;

    protected values: T[];
    protected _promise: Promise<any>;
    protected _generation: number;

    public setValue: (value: T) => void;
    public subscribe: () => void;
    public unsubscribe: () => void;

    /**
     * @param {function} set
     * @param {function} get
     * @param {function} subscribe
     * @param {function} unsubscribe
     * @param {ValueProxy<T>[]} parents
     * @param {number} generation
     */
    constructor({set = null, get = null, subscribe = null, unsubscribe = null, parents = [], generation = 0} = {}) {
        super();

        this.parents = parents || [];
        this.setValue = set;
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;
        this.isActive = false;
        this._generation = generation || 0;

        if (get) {
            this.getValue = get;
        }
    }

    /**
     * @param {function} callback
     *
     * @returns {ValueProxy}
     */
    on(callback) {
        super.on(callback);

        if (!this.isActive) {
            if (this.subscribe) {
                this.subscribe();
            }

            this.isActive = true;
        }

        return this;
    }

    /**
     * @param {function} callback
     *
     * @returns {ValueProxy}
     */
    off(callback) {
        super.off(callback);

        if (!this._listeners.length) {
            if (this.unsubscribe) {
                this.unsubscribe();
            }

            this.isActive = false;

            this.stopListening();
        }

        return this;
    }

    /**
     * @param {*} value
     * @param {boolean} noCache
     */
    emitValue(value, {noCache = false} = {}): void {
        if (value !== this.value || noCache) {
            this.value = value;
            this.emit(value);
        }
    }

    /**
     * @returns {*}
     */
    getValue(): T {
        return this.value;
    }

    /**
     * @param {function} mutate
     *
     * @returns {ValueProxy}
     */
    pipe(mutate) {
        return ValueProxy.pipe(this, mutate);
    }

    /**
     * @param {ValueProxy} args
     *
     * @returns {ValueProxy}
     */
    and(...args) {
        return ValueProxy.all([this, ...args]);
    }

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    proxy(key) {
        return this.pipe((value) => {
            return value && value[key];
        });
    }

    /**
     * @param {function(*, function(*))} producer
     * @param {{}} [options]
     *
     * @returns {ValueProxy}
     */
    async(producer, options?) {
        let proxy = this;

        return new ValueProxy({
            generation: this._generation + 1,
            get() {
                if (!this.isActive) {
                    producer(proxy.getValue(), (value) => {
                        this.emitValue(value, options);
                    });
                }

                return this.value;
            },
            subscribe() {
                this.listenTo(proxy, (value) => {
                    producer(value, (value) => {
                        this.emitValue(value, options);
                    });
                });

                this.getValue();
            }
        });
    }

    /**
     * @returns {ValueProxy}
     */
    atom(options) {
        let planner = Planner.getInstance().atom();

        return this.async((value, callback) => {
            planner.commit(() => callback(value));
        }, options);
    }

    /**
     * @returns {ValueProxy[]}
     */
    getNestedParents() {
        let parents = this.parents.slice();

        parents.forEach(parent => parents.concat(parent.getNestedParents()));

        return parents;
    }

    /**
     * @returns {Promise[]}
     */
    getNestedPromises() {
        return this.getNestedParents()
            .map(parent => parent._promise)
            .filter(Boolean);
    }

    /**
     * @returns {string}
     */
    toString() {
        return String(this.getValue());
    }

    /**
     * @returns {number}
     */
    toNumber() {
        return Number(this.getValue());
    }

    /**
     * @param {*} obj
     *
     * @returns {ValueProxy}
     */
    static fromValue(obj) {
        if (obj instanceof ValueProxy) {
            return obj;
        }

        return new ValueProxy({
            generation: 0,
            get() {
                return this.value = obj;
            }
        });
    }

    /**
     * @param {Model} obj
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    static fromModel(obj, key) {
        return new ValueProxy({
            generation: obj._generation,
            get() {
                return this.value = obj.get(key);
            },
            set(value) {
                obj.set(key, value)
            },
            subscribe() {
                let change = obj.channel('change:' + key);

                this.listenTo(change, value => this.emitValue(value));

                this.getValue();
            }
        });
    }

    /**
     * @param proxy
     * @param mutate
     * @returns {ValueProxy}
     */
    static pipe(proxy, mutate) {
        let valueProxy = new ValueProxy({
            generation: proxy._generation + 1,
            parents: [proxy],
            get() {
                if (!this.isActive) {
                    this.value = mutate(proxy.getValue());
                }

                return this.value;
            },

            set(value) {
                return proxy.setValue(value)
            },

            subscribe() {
                //noinspection JSUnusedAssignment
                valueProxy.listenTo(proxy, (args) => {
                    this.emitValue(mutate(args));
                });

                this.getValue();
            }
        });

        return valueProxy;
    }

    /**
     * @param {ValueProxy[]} proxies
     *
     * @returns {ValueProxy}
     */
    static all(proxies) {
        let generation = proxies.reduce((generation, proxy) => {
            return Math.max(generation, proxy._generation + 1)
        }, 0);

        let valueProxy = new ValueProxy({
            generation,
            parents: proxies,
            get() {
                if (!this.isActive) {
                    this.values = proxies.map(proxy => proxy.getValue());
                }

                return this.values;
            },
            subscribe() {
                proxies.forEach((proxy, index) => {
                    valueProxy.listenTo(proxy, (value) => {
                        if (this.values[index] !== value) {
                            let newValues = this.values; //.slice();

                            newValues[index] = value;

                            valueProxy.emit(newValues);
                        }
                    });
                });

                // force get value to override cache
                this.getValue();
            }
        });

        return valueProxy;
    }

}
