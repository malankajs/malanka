import {Collection, Prototype, Mutator} from '../../es5';
import {Repository} from '../models/Repository';

@Prototype({
    url: 'https://api.github.com/search/repositories',
    Model: Repository
})
export class Repositories extends Collection {

    @Mutator('searchState.query', {
        after: function(proxy) {
            return proxy.then().pipe(() => this.models)
        }
    })
    update(query) {
        return this._promise = Promise.resolve(this._promise)
            .catch(() => {
                // fix previous promise
            })
            .then(() => {
                if (query && this.searchState.query === query) {
                    return this.fetch({
                        remove: true,

                        query: {
                            q: query
                        }
                    });
                }
            })
            .then(() => this.models);
    }

    /**
     * @param {{}[]} items
     * @returns {{}}
     */
    parse({items}) {
        return items;
    }

    /**
     * @returns {Promise|Promise[]}
     */
    async() {
        return this.update.getNestedPromises();
    }

}

