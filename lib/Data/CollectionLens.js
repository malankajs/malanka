import {Collection} from './Collection';
import {ValueProxy} from './ValueProxy';

export class CollectionLens extends Collection {

    constructor(baseCollection, filter) {
        super(null, {});

        this._baseCollection = baseCollection;
        this._filter = filter;
    }

    subscribe() {
        this.listenTo(this._baseCollection.channel('add'), model => this._add(model));
        this.listenTo(this._baseCollection.channel('remove'), model => this._remove(model));

        this._baseCollection.forEach(model => this._add(model));
    }

    constructValueProxy() {
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

    _add(model) {
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

    _remove(model) {
        this.remove(model);
    }

    _getProxy(model) {
        return this._filter.call(this._baseCollection, model);
    }

    static lens() {
        return (proto, name, desc) => {
            let filter = desc.value;

            return {
                get() {
                    let collection = new CollectionLens(this, filter),
                        proxy = collection.constructValueProxy();

                    Object.defineProperty(this, name, {value: proxy});

                    return proxy;
                }
            };
        };
    }

}