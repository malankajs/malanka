import {Collection, Prototype} from '../../es5';
import {Task} from '../models/Task';

@Prototype({
    Model: Task
})
export class Tasks extends Collection {

    initialize() {
        if (this.env.isBrowser) {
            setTimeout(() => {
                if (localStorage.tasks) {
                    this.mergeModels(JSON.parse(localStorage.tasks));
                }

                this.on(() => this.save());
                this.channel('remove').on(() => this.save());
                this.channel('change:done').on(() => this.save());
                this.channel('change:title').on(() => this.save());
            });
        }
    }

    save() {
        localStorage.tasks = JSON.stringify(super.serialize().models);
    }

    serialize() {
        // do not serialize
    }

}