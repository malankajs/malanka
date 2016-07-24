import {Collection, Prototype, Mutator} from '../../es5';
import {Task} from '../models/Task';

@Prototype({
    Model: Task,
    url: 'http://localhost:8080/api/tasks'
})
export class Tasks extends Collection {

    /**
     * @param {TasksState} tasksState
     */
    setTasksState(tasksState) {
        this.tasksState = tasksState;
    }


    /**
     * @returns {Promise<Collection>}
     */
    @Mutator('tasksState.currentList')
    forCurrentList(currentList) {
        if (!currentList) {
            return this;
        }

        this._promise = this.fetch({
            remove: true,
            query: {
                list: currentList._id
            }
        });

        return this;
    }

}