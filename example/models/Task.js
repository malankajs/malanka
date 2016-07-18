import {Model, Prototype} from '../../es5';

@Prototype({
    defaults: {
        done: false
    }
})
export class Task extends Model {

    initialize() {
        if (!this.id) {
            this.id = Date.now();
        }
    }

}