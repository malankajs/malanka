import {Model, Prototype} from '../../es5';

@Prototype({
    defaults: {
        query: ''
    }
})
export class SearchState extends Model {

    /**
     * @param {string} query
     */
    updateDependencies({event: {query: {query}}}) {
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

    /**
     * @param {{}} data
     * @param {{}} dependencies
     * 
     * @returns {Model}
     */
    static restore(data, dependencies) {
        return this.dataFactory(data, dependencies);
    }

}