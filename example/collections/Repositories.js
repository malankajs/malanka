import {Collection, Prototype} from '../../es5';
import {Repository} from '../models/Repository';

@Prototype({
    url: 'https://api.github.com/search/repositories',
    model: Repository
})
export class Repositories extends Collection {

    initialize() {
        this.query.on(() => this.update());
        this.update();
    }

    /**
     *
     */
    update() {
        var query = this.query.getValue();

        if (query) {
            this._promise = Promise.resolve(this._promise)
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
        } else {

        }
    }

    /**
     * @param {{}[]} items
     * @returns {{}}
     */
    parse({items}) {
        return items;
    }

}

