import {ValueProxy} from './ValueProxy';
import {Prototype} from './Prototype';

@Prototype({
    idAttribute: 'id'
})
export class Model {

    /**
     * @param {{}} attrs
     */
    constructor(attrs) {
        this._proxies = {};

        if (this.defaults) {
            Object.assign(this, this.defaults);
        }

        if (attrs) {
            Object.assign(this, attrs);
        } 
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
            this._proxies[key] = ValueProxy.fromModel(this, key);
        }

        return this._proxies[key];
    }


}