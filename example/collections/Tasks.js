import {Collection, Prototype, Mutator} from '../../es5';
import {Task} from '../models/Task';

@Prototype({
    Model: Task,
    url: 'http://localhost:8080/api/tasks'
})
export class Tasks extends Collection {

    updateDependencies() {
        return this.fetch();
    }

}