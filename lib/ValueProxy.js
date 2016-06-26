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
    }

    /**
     * @param {function} callback
     *
     * @returns {ValueProxy}
     */
    on(callback) {
        if (this.subscribe && !this._listeners.length) {
            this.subscribe();
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
        return new ValueProxy(() => obj);
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
        let value = mutate(proxy.getValue());

        let valueProxy = new ValueProxy({
            get() {
                return value
            },

            set(value) {
                return proxy.setValue(value)
            },

            subscribe() {
                valueProxy.listenTo(proxy, () => {
                    let currentValue = mutate(proxy.getValue());

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
        let valueProxy = new ValueProxy({
            get() {
                return proxies.map(proxy => proxy.getValue());
            },
            subscribe() {
                proxies.forEach(proxy => proxy.on(() => {
                    valueProxy.emit(valueProxy.getValue());
                }));
            }
        });

        return valueProxy;
    }

}