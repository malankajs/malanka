import {Collection, Prototype} from '../../es5';
import {Repository} from '../models/Repository';

@Prototype({
    url: 'https://api.github.com/search/repositories',
    Model: Repository
})
export class Repositories extends Collection {

    initialize() {
        this.query = this.searchState.proxy('query');

        this.query.on(() => this.update());
    }

    /**
     * @returns {Promise}
     */
    update() {
        var query = this.query.getValue();

        if (query) {
            return this._promise = Promise.resolve(this._promise)
                .catch(() => {
                    this._promise = null;
                })
                .then(() => {
                    if (this.query.getValue() === query) {
                        return this.fetch({
                            remove: true,

                            query: {
                                q: query
                            }
                        });
                    }
                });
        }
    }

    /**
     * @returns {Promise}
     */
    updateDependencies() {
        return this.update();
    }

    /**
     * @param {{}[]} items
     * @returns {{}}
     */
    parse({items}) {
        return items;
    }

}

