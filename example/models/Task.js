import {Model, Prototype} from '../../es5';

@Prototype({
    idAttribute: '_id',
    url: 'http://localhost:8080/api/tasks',

    defaults: {
        done: false
    }
})
export class Task extends Model {

    initialize() {
        this.channel('change:done').on(() => this.save());
    }

}