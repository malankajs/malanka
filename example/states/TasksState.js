import {Model, Prototype} from '../../es5';

@Prototype({
    defaults: {
        currentList: null
    }
})
export class TasksState extends Model {

    /**
     * @param {List} currentList
     */
    setCurrentList(currentList) {
        this.set('currentList',currentList);
    }

    /**
     * @returns {List}
     */
    getCurrentList() {
        return this.get('currentList');
    }

    /**
     * @param {Task} task
     */
    setCurrentTask(task) {
        this.set('currentTask', task);
    }

    /**
     * @returns {Task}
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