import {Model} from '../../es5';

export class Repository extends Model {

    /**
     * @returns {{id: number, name: string, full_name: string}}
     */
    serialize() {
        return {
            id: this.id,
            name: this.name,
            full_name: this.full_name
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