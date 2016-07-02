import {Events} from './Events';

export class ValueProxy extends Events {

    /**
     * @param {function} set
     * @param {function} get
     * @param {function} subscribe
     */
    constructor({set, get, subscribe}) {
        super();

        this.getValue = get;
        this.setValue = set;
        this.subscribe = subscribe;
        this.isActive = false;
    }

    /**
     * @param {function} callback
     *
     * @returns {ValueProxy}
     */
    on(callback) {
        if (!this._listeners.length) {
            if (this.subscribe) {
                this.subscribe();
            }

            this.isActive = true;
        }

        return super.on(callback);
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
     * @param {function} mutate
     *
     * @returns {ValueProxy}
     */
    mutate(mutate) {
        return ValueProxy.mutateProxy(this, mutate);
    }

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    proxy(key) {
        let value = this.getValue();

        if (value.proxy) {
            return value.proxy(key);
        }

        return this.mutate(() => {
            return this.getValue()[key];
        });
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
     * @param {{}} obj
     *
     * @returns {ValueProxy}
     */
    static fromObject(obj) {
        return new ValueProxy({
            get() {
                return obj;
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
                return obj.get(key);
            },
            set(value) {
                obj.set(key, value)
            }
        });
    }

    /**
     * @param proxy
     * @param mutate
     * @returns {ValueProxy}
     */
    static mutateProxy(proxy, mutate) {
        let value;

        let valueProxy = new ValueProxy({
            get() {
                if (this.isActive) {
                    return value;
                } else {
                    return value = mutate(proxy.getValue());
                }
            },

            set(value) {
                return proxy.setValue(value)
            },

            subscribe() {
                value = mutate(proxy.getValue());

                valueProxy.listenTo(proxy, (args) => {
                    let currentValue = mutate(args);

                    if (currentValue !== value) {
                        value = currentValue;
                        valueProxy.emit(currentValue);
                    }
                });
            }
        });

        return valueProxy;
    }

    /**
     * @param {ValueProxy[]} proxies
     *
     * @returns {ValueProxy}
     */
    static fromArray(proxies) {
        let values;

        let valueProxy = new ValueProxy({
            get() {
                if (this.isActive) {
                    return values;
                } else {
                    return values = proxies.map(proxy => proxy.getValue());
                }
            },
            subscribe() {
                values = proxies.map(proxy => proxy.getValue());

                proxies.forEach((proxy, index) => {
                    valueProxy.listenTo(proxy, (value) => {
                        values[index] = value;

                        valueProxy.emit(values);
                    });
                });
            }
        });

        return valueProxy;
    }

}