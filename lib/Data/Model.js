import {ValueProxy} from './ValueProxy';
import {Prototype} from '../Decorators/Prototype';
import {Events} from './Events';

@Prototype({
    idAttribute: 'id'
})
export class Model extends Events {

    /**
     * @param {{}} attrs
     * @param {{[parse]: boolean}} options
     */
    constructor(attrs, options = {}) {
        super();

        this._proxies = {};

        if (this.defaults) {
            Object.assign(this, this.defaults);
        }

        if (options.parse) {
            attrs = this.parse(attrs);
        }

        if (attrs) {
            Object.assign(this, attrs);
        }

        this._options = options;

        if (this.initialize) {
            this.initialize(attrs, options);
        }
    }

    /**
     * @param {string} key
     * @param {*} value
     * @param {boolean} trigger
     */
    set(key, value, {trigger = true} = {}) {
        if (this[key] !== value) {
            this[key] = value;

            if (trigger) {
                this.emitToChannel('change:' + key, value);
            }

            this.emit(this, key);
        }
    }

    /**
     * @param {{}} attrs
     */
    setAttrs(attrs, options) {
        this.emitBuffer(() => {
            Object.keys(attrs).forEach(key => this.set(key, attrs[key], options));
        });
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
     * @param {{}} options
     */
    remove(options) {
        let promise = this.getRequest().del({
            url: this._prepareUrl()
        });

        return promise.then(() => {
            this.set(this.idAttribute, null);

            this.channel('remove').emit(this);
        });
    }

    /**
     * @returns {Promise}
     */
    save() {
        let data = this.toJSON(),
            idAttribute = this.idAttribute,
            request = this.getRequest(),
            promise;

        if (data[idAttribute]) {
            promise = request.put({
                url: this._prepareUrl(),
                data: data
            });
        } else {
            promise = request.post({
                url: this._prepareUrl(),
                data: data
            });
        }

        return promise.then(attrs => {
            this.setAttrs(attrs);

            return this;
        });
    }

    /**
     * @returns {string}
     * @private
     */
    _prepareUrl() {
        let id = this[this.idAttribute];

        if (id) {
            return `${this.url}/${id}`;
        } else {
            return this.url;
        }
    }

    /**
     * @returns {AbstractRequest}
     */
    getRequest() {
        return this._options.request;
    }

    /**
     * @returns {{}}
     */
    toJSON() {
        let result = {};

        Object.keys(this)
            .filter(key => key[0] !== '_' || key === this.idAttribute)
            .forEach(key => {
                let value = this[key];

                if (value && value.serialize) {
                    result[key] = value.serialize();
                } else {
                    result[key] = value;
                }
            });

        return result;
    }

    /**
     * @returns {{}}
     */
    serialize() {
        return this.toJSON();
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