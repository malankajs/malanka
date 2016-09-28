import {Collection} from './Collection';
import {ValueProxy} from './ValueProxy';

export class CollectionLens<T> extends Collection<T> {
    protected _baseCollection: Collection<T>;
    protected _filter: (model: T) => ValueProxy<boolean>;

    constructor(baseCollection:Collection<T>, filter) {
        super(null, {});

        this._baseCollection = baseCollection;
        this._filter = filter;

        if (baseCollection.comparator) {
            this.comparator = baseCollection.comparator.bind(baseCollection);
        }
    }

    /**
     * Subscribe to base collection
     */
    public subscribe() {
        this.listenTo(this._baseCollection.channel('add'), model => this._add(model));
        this.listenTo(this._baseCollection.channel('remove'), model => this._remove(model));

        this._baseCollection.forEach(model => this._add(model));
    }

    /**
     * Create value proxy which listen base collection
     */
    public constructValueProxy():ValueProxy<CollectionLens<T>> {
        let _this = this;

        return new ValueProxy({
            get() {
                return _this;
            },
            subscribe() {
                _this.subscribe();
            },
            unsubscribe() {
                _this.stopListening();
            }
        });
    }

    /**
     * Add event handler
     *
     * @param {Model} model
     * @private
     */
    protected _add(model:T) {
        let proxy = this._getProxy(model);

        this.listenTo(proxy, accept => {
            if (accept) {
                this.add(model);
            } else {
                this.remove(model);
            }
        });

        if (proxy.getValue()) {
            this.add(model);
        }
    }

    /**
     * Remove event handler
     */
    protected _remove(model:T) {
        this.remove(model);
    }

    /**
     * Create value proxy for model
     */
    protected _getProxy(model):ValueProxy<boolean> {
        return this._filter.call(this._baseCollection, model);
    }

    /**
     * Decorator
     */
    public static lens<T>():Function {
        return (proto, name, desc) => {
            let filter = desc.value;

            return {
                get() {
                    let collection = new CollectionLens<T>(this, filter),
                        proxy = collection.constructValueProxy();

                    Object.defineProperty(this, name, {value: proxy});

                    return proxy;
                }
            };
        };
    }

}
