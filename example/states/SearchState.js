import {Model, Prototype} from '../../es5';

@Prototype({
    defaults: {
        query: ''
    }
})
export class SearchState extends Model {

    /**
     */
    navigate() {
        this.router.replace({query: this.query}, {trigger: false});
    }

    /**
     * @param {Router} router
     * @param {string} query
     */
    updateDependencies({router, event: {query: {query}}}) {
        this.set('router', router);
        this.set('query', String(query || ''));
    }

    /**
     * @returns {{query: string}}
     */
    serialize() {
        return {
            query: this.query
        };
    }

}