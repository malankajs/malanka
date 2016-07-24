import {Model, Prototype} from '../../es5';

@Prototype({
    idAttribute: '_id',
    url: 'http://localhost:8080/api/lists',

    defaults: {
    }
})
export class List extends Model {

    initialize() {
        this.channel('change:title').on(() => this.save());
    }

}