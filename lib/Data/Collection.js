import {Model} from './Model';
import {Events} from './Events';
import {Prototype} from '../Decorators/Prototype';

@Prototype({
    Model
})
export class Collection extends Events {

    /**
     * @param {{}[]} [models]
     * @param {{}} [options]
     */
    constructor(models, options) {
        super();

        this.models = [];
        this._index = {};

        if (options) {
            Object.assign(this, options);
        }

        if (models) {
            this.mergeModels(models, {silent: true});
        }

        if (this.initialize) {
            this.initialize(models, options);
        }
    }

    /**
     * @param {{data: {}, [query]: {}}} params
     *
     * @returns {Promise<Collection>}
     */
    fetch(params = {}) {
        let options = {
            url: params.url || this.url,
            query: params.query || {}
        };

        if (!params.force) {
            if (this.isQueriesSame(options.query)) {
                return Promise.resolve(this);
            }
        }

        return this._promise = this.getRequest().request(options)
            .then(response => this.processResponse(response, params))
            .then(() => {
                this._lastQuery = options.query;
                
                return this;
            });
    }

    /**
     * @param {[]} response
     * @param {{}} params
     *
     * @returns {*}
     */
    processResponse(response, params) {
        return this.mergeModels(this.parse(response, params), params);
    }

    /**
     * @param {{}[]} models
     * @param {{}} [params]
     */
    mergeModels(models, params = {}) {
        let Model = this.Model,
            silent = params.silent,
            idAttribute = Model.prototype.idAttribute,
            addChannel = this.channel('add'),
            currentModels = this.models.slice(),
            newModels = [],
            toAdd = [];

        for (let index = 0; index < models.length; index++) {
            let attrs = models[index],
                isModel = models[index] instanceof Model,
                id = attrs[idAttribute],
                previous = id && this._index[id];

            // Merge
            if (previous) {
                let index = currentModels.indexOf(previous);
                currentModels.splice(index, 1);

                if (!isModel) {
                    previous.setAttrs(attrs);
                }

                newModels.push(previous);
            } else {
                let model = isModel ? attrs : Model.dataFactory(attrs, {
                    request: this.getRequest()
                });

                this._index[model[idAttribute]] = model;
                newModels.push(model);
                toAdd.push(model);

                this.listenModel(model);
            }
        }

        if (params.remove) {
            this.models = newModels;

            for (let index = 0; index < currentModels.length; index++) {
                this.remove(currentModels[index]);
            }
        } else {
            this.models = currentModels.concat(newModels);
        }

        if (this.comparator && newModels.length) {
            if (this.comparator.length === 2) {
                this.models.sort(this.comparator);
            } else {
                this.models.sort((a, b) => {
                    return this.comparator(a) - this.comparator(b);
                });
            }
        }

        if (!silent) {
            for (let index = 0; index < toAdd.length; index++) {
                addChannel.emit(toAdd[index]);
            }

            this.channel('update').emit(this);
        }

        this.emit(this.models);

        return toAdd;
    }

    /**
     * @param {Model|{}} model
     */
    remove(model) {
        let index = this.models.indexOf(model),
            idAttribute = this.Model.prototype.idAttribute;

        if (index > -1) {
            this.models.splice(index, 1);
        }

        this._index[model[idAttribute]] = undefined;
        this.stopListening(model);

        this.channel('remove').emit(model);
    }

    /**
     * @param {{}} attrs
     * @param {{}} [options]
     */
    add(attrs, options) {
        var models = this.mergeModels([attrs], options);

        return models[0];
    }

    /**
     * @param {{}} attrs
     * @param {{}} [options]
     */
    create(attrs, options) {
        return this.add(attrs, options).save(options);
    }

    /**
     * @param {Model} model
     */
    listenModel(model) {
        this.listenTo(model, (model, key) => {
            this.channel('change:' + key).emit(model);
        });

        this.listenTo(model.channel('remove'), model => {
            this.remove(model);
        });
    }

    /**
     * @param {function} callback
     *
     * @returns {[]}
     */
    map(callback) {
        return this.models.map(callback);
    }

    /**
     * @param {function} callback
     */
    forEach(callback) {
        this.models.forEach(callback);
    }

    /**
     * @param {function} callback
     * 
     * @returns {Model}
     */
    find(callback) {
        return this.models.find(callback);
    }

    /**
     * @param {function} callback
     *
     * @returns {boolean}
     */
    every(callback) {
        return this.models.every(callback);
    }

    /**
     * @returns {Model}
     */
    first() {
        return this.models[0];
    }

    /**
     * @param {Model} model
     *
     * @returns {number}
     */
    indexOf(model) {
        return this.models.indexOf(model);
    }

    /**
     * @returns {number}
     */
    get length() {
        return this.models.length;
    }

    /**
     * @param {{}} query
     * @returns {boolean}
     */
    isQueriesSame(query) {
        return JSON.stringify(query) === JSON.stringify(this._lastQuery);
    }

    /**
     * @param {{}} data
     * @param {{}} params
     *
     * @returns {*}
     */
    parse(data, params) {
        return data;
    }

    /**
     * @returns {AbstractRequest}
     */
    getRequest() {
        return this.request;
    }

    /**
     * @returns {Model[]}
     */
    getValue() {
        return this.models;
    }

    /**
     * @param {string} name
     *
     * @returns {ValueProxy}
     */
    proxy(name) {
        return this[name];
    }

    /**
     * Wait for complete last promise
     *
     * @returns {ValueProxy}
     */
    async() {
        return this._promise;
    }

    /**
     * @returns {{}}
     */
    serialize() {
        let models = this.models.map(model => model.serialize());

        return {
            query: this._lastQuery,
            models
        };
    }

    /**
     * @param {{}[]} models
     * @param {{}} query
     * @param {{}} dependencies
     *
     * @returns {Model}
     */
    static restore({models, query}, dependencies) {
        let Model = this.prototype.Model,
            modelsInstances = models.map(model => Model.restore(model, dependencies)),
            instance = this.dataFactory(modelsInstances, dependencies);

        instance._lastQuery = query;

        return instance;
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