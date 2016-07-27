import {Collection, CollectionLens, Prototype, Mutator} from '../../es5';
import {Task} from '../models/Task';

@Prototype({
    Model: Task,
    url: 'http://localhost:8080/api/tasks'
})
export class Tasks extends Collection {

    initialize() {
        this.channel('change:list').on(task => {
            if (this._lastQuery.list !== task) {
                this.remove(task);
            }
        });
    }

    /**
     * @param {TasksState} tasksState
     */
    setTasksState(tasksState) {
        this.tasksState = tasksState;
    }

    /**
    //  * @returns {Promise<Collection>}
    //  */
    // @Mutator('tasksState.currentList')
    // forCurrentList(currentList) {
    //     if (!currentList) {
    //         return this;
    //     }
    //
    //     this._promise = this.fetch({
    //         remove: true,
    //         query: {
    //             list: currentList._id,
    //             _order: 'weight'
    //         }
    //     });
    //
    //     return this;
    // }

    @CollectionLens.lens()
    currentListLens(model) {
        return model.proxy('list')
            .and(this.tasksState.proxy('currentList'))
            .pipe(([listId, currentList]) => {
                return currentList && listId === currentList._id;
            });
    }

    /**
     * @param {Task} task
     *
     * @returns {Number}
     */
    comparator(task) {
        return task.getWeight() || 0;
    }

    updateDependencies() {
        return this.fetch({
            query: {
                _order: 'weight'
            }
        })
    }

}