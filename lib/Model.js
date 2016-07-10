import {ValueProxy} from './ValueProxy';
import {Prototype} from './Prototype';

@Prototype({
    idAttribute: 'id'
})
export class Model {

    /**
     * @param {{}} attrs
     * @param {{}} options
     */
    constructor(attrs, options = {}) {
        this._proxies = {};

        if (this.defaults) {
            Object.assign(this, this.defaults);
        }

        if (attrs) {
            Object.assign(this, attrs);
        }

        this._options = options;
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        if (this[key] !== value) {
            this[key] = value;

            if (this._proxies[key]) {
                this._proxies[key].emit(value);
            }
        }
    }

    /**
     * @param {{}} attrs
     */
    setAttrs(attrs) {
        Object.keys(attrs).forEach(key => this.set(key, attrs[key]));
    }

    /**
     * @param {string} key
     *
     * @returns {*}
     */
    get(key) {
        return this[key];
    }

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    proxy(key) {
        if (!this._proxies[key]) {
            let value = this.get(key);

            if (value instanceof ValueProxy) {
                this._proxies[key] = value;
            } else {
                this._proxies[key] = ValueProxy.fromModel(this, key);
            }
        }

        return this._proxies[key];
    }

    /**
     * @returns {AbstractRequest}
     */
    getRequest() {
        return this._options.request;
    }

    /**
     * @returns {{id: number, name: string, full_name: string}}
     */
    serialize() {
        let result = {};

        Object.keys(this)
            .filter(key => key[0] !== '_')
            .forEach(key => {
                let value = result[key];

                if (value && value.serialize) {
                    result[key] = value.serialize();
                } else {
                    result[key] = value;
                }
            });

        return result;
    }

    /**
     * @param {{}} data
     * @param {{}} dependencies
     *
     * @returns {Model}
     */
    static restore(data, dependencies) {
        return this.dataFactory(data, dependencies);
    }

    /**
     * @param {{}} options
     * @returns {Model}
     */
    static factory(options) {
        return this.dataFactory(null, options);
    }

    /**
     * @param {{}|null} data
     * @param {{}} [options]
     *
     * @returns {Model}
     */
    static dataFactory(data, options) {
        return new this(data, options);
    }

}