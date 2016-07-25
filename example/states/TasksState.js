import {Model, Prototype} from '../../es5';

@Prototype({
    defaults: {
        currentList: null
    }
})
export class TasksState extends Model {

    initialize() {
        this.channel('change:currentList').on(() => {
            this.setCurrentTask(null);
        });
    }

    /**
     * @param {ListEntity} currentList
     */
    setCurrentList(currentList) {
        this.set('currentList',currentList);
    }

    /**
     * @returns {ListEntity}
     */
    getCurrentList() {
        return this.get('currentList');
    }

    /**
     * @param {TaskEntity} task
     */
    setCurrentTask(task) {
        this.set('currentTask', task);
    }

    /**
     * @returns {TaskEntity}
     */
    getCurrentTask() {
        return this.get('currentTask');
    }

    /**
     * @param {Lists} lists
     */
    updateDependencies({lists}) {
        this.setCurrentList(lists.first());
    }

}