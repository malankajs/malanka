import {Events} from './Events';

export class ValueProxy extends Events {

    /**
     * @param {function} set
     * @param {function} get
     * @param {function} subscribe
     * @param {ValueProxy[]} parents
     */
    constructor({set, get, subscribe, parents} = {}) {
        super();

        this.parents = parents || [];
        this.setValue = set;
        this.subscribe = subscribe;
        this.isActive = false;

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
            this.isActive = false;

            this.stopListening();
        }

        return this;
    }

    /**
     * @param {*} value
     */
    emitValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.emit(value);
        }
    }

    /**
     * @returns {*}
     */
    getValue() {
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
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    proxy(key) {
        let value = this.getValue();
        //
        // if (typeof value.proxy === 'function') {
        //     return value.proxy(key);
        // }

        return this.pipe((value) => {
            return value && value[key];
        });
    }

    /**
     * @returns {ValueProxy}
     */
    then() {
        return ValueProxy.then(this);
    }

    //noinspection ReservedWordAsName
    /**
     * @returns {ValueProxy}
     */
    catch() {
        return ValueProxy.catch(this);
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
            get() {
                return this.value = obj.get(key);
            },
            set(value) {
                obj.set(key, value)
            },
            subscribe() {
                var change = obj.channel('change:' + key);

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
        let valueProxy = new ValueProxy({
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

    /**
     * @param {ValueProxy} proxy
     *
     * @returns {ValueProxy}
     */
    static then(proxy) {
        return this.fromPromise(proxy, 'then');
    }

    //noinspection ReservedWordAsName
    /**
     * @param {ValueProxy} proxy
     *
     * @returns {ValueProxy}
     */
    static catch(proxy) {
        return this.fromPromise(proxy, 'catch');
    }

    /**
     * @param {ValueProxy} proxy
     * @param {string} method
     *
     * @returns {ValueProxy}
     */
    static fromPromise(proxy, method) {
        var valueProxy = new ValueProxy({
            parents: [proxy],
            get: function () {
                // If activated return current value
                if (!this.isActive) {
                    // If not activated force activate
                    this.emitPromise(proxy.getValue());
                }

                return this.value;
            },
            subscribe() {
                this.listenTo(proxy, promise => this.emitPromise(promise));

                // force get value to override cache
                this.getValue();
            }
        });

        /**
         * @param {Promise} promise
         */
        valueProxy.emitPromise = function (promise) {
            if (promise) {
                this._promise = Promise.resolve(this._promise)
                    .catch(() => {
                        // fix previous
                    })
                    .then(() => {
                        return promise[method](value => this.emitValue(value));
                    })
            }
        };

        return valueProxy;
    }

}