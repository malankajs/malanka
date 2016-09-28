import {Model} from './Model';
import {Events} from './Events';
import {ValueProxy} from './ValueProxy';
import {Prototype} from '../Decorators/Prototype';
import {AbstractRequest} from '../Request/AbstractRequest';
import {CollectionFetchOptions, CollectionOptions, CollectionMergeOptions} from '../declarations';

@Prototype({
    Model
})
export class Collection<T extends Model> extends Events {
    protected Model: {
        new(): T,
        dataFactory: (attrs:Object, options?:Object) => T,
        restore: (attrs:Object, deps:Object) => T
    };
    protected models: T[];
    protected url: string;
    protected request:AbstractRequest;
    protected _index: Object;
    protected _promise: Promise<Collection<T>>;
    protected _lastQuery: CollectionFetchOptions;
    protected _lengthProxy: ValueProxy<number>;

    protected initialize: (models: any[], options) => void;

    public comparator: (a: T, b?: T) => number;

    /**
     */
    constructor(models: (T|Object)[], options = ({} as CollectionOptions)) {
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
    fetch(params = ({} as CollectionFetchOptions)): Promise<Collection<T>> {
        params = Object.assign({parse: true}, params);

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
        if (params.parse) {
            response = this.parse(response, params);
        }

        return this.mergeModels(response, params);
    }

    /**
     * @param {{}[]} models
     * @param {{}} [params]
     */
    mergeModels(models, params = ({} as CollectionMergeOptions)) {
        let Model = this.Model,
            silent = params.silent,
            reset = params.reset,
            remove = reset || params.remove,
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
                    request: this.getRequest(),
                    parse: params.parse
                });

                this._index[model[idAttribute]] = model;
                newModels.push(model);
                toAdd.push(model);

                this.listenModel(model);
            }
        }

        if (remove) {
            this.models = newModels;

            for (let index = 0; index < currentModels.length; index++) {
                this.remove(currentModels[index], {silent: silent || reset});
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

        if (!silent && !reset) {
            for (let index = 0; index < toAdd.length; index++) {
                addChannel.emit(toAdd[index]);
            }

            this.channel('update').emit(this);
        }

        if (reset) {
            this.channel('reset').emit(this);
        }

        this.emit(this.models);

        return toAdd;
    }

    /**
     * @param {Model|{}} model
     * @param {{}} options
     */
    remove(model, options = ({} as CollectionMergeOptions)) {
        let index = this.models.indexOf(model),
            idAttribute = this.Model.prototype.idAttribute;

        if (index > -1) {
            this.models.splice(index, 1);
        }

        this._index[model[idAttribute]] = undefined;
        this.stopListening(model);

        if (!options.reset) {
            this.channel('remove').emit(model);
        }
    }

    /**
     * @param {{}} attrs
     * @param {{}} [options]
     */
    add(attrs, options?) {
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
     * @returns {number}
     */
    findIndex(callback) {
        return this.models.findIndex(callback);
    }

    /**
     * @param {function} callback
     *
     * @returns {[]}
     */
    filter(callback) {
        return this.models.filter(callback);
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
     * @param {function} callback
     *
     * @returns {boolean}
     */
    some(callback) {
        return this.models.some(callback);
    }

    /**
     * @param {Model} model
     *
     * @returns {boolean}
     */
    includes(model) {
        return this.models.indexOf(model) > -1;
    }

    /**
     * @param {number} n
     *
     * @returns {Model|Model[]}
     */
    first(n = 1) {
        return n === 1 ? this.models[0] : this.models.slice(0, n);
    }

    /**
     * @param {string}name
     *
     * @return {*[]}
     */
    pluck(name) {
        return this.models.map(model => model[name]);
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
        if (name === 'length') {
            return this.lengthProxy();
        }

        return this[name];
    }

    /**
     * @returns {ValueProxy<number>}
     */
    lengthProxy() {
        if (!this._lengthProxy) {
            let _this = this;

            let proxy = this._lengthProxy = new ValueProxy<number>({
                get() {
                    return _this.length;
                },
                subscribe() {
                    this.listenTo(_this, () => proxy.emitValue(_this.length));
                }
            })
        }

        return this._lengthProxy;
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
     * Default destroy
     */
    destroy() {
        this.stopListening();
        this.off();
        this.models = [];
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
     * @returns {Collection<T>}
     */
    static restore<T extends Model>({models, query}, dependencies):Collection<T> {
        let Model = this.prototype.Model,
            modelsInstances = models.map(model => Model.restore(model, dependencies)),
            instance = this.dataFactory<T>(modelsInstances, dependencies);

        instance._lastQuery = query;

        return instance;
    }

    /**
     * @param {{}} options
     *
     * @returns {Collection<T>}
     */
    static factory<T extends Model>(options):Collection<T> {
        return this.dataFactory<T>(null, options);
    }

    /**
     * @param {{}|null} data
     * @param {{}} [options]
     *
     * @returns {Collection<T>}
     */
    static dataFactory<T extends Model>(data, options):Collection<T> {
        return new this<T>(data, options);
    }

}
