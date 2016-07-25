import {Defaults} from '../../../es5';

import {SortableCollection} from '../SortableCollection/SortableCollection'
import {TodoListItem} from '../TodoListItem/TodoListItem';
import styles from './TodoListItems.css';

/**
 * @property {Lists} collection
 */
@Defaults({
    styles,
    ChildComponent: TodoListItem,
    modelName: 'list'
})
export class TodoListItems extends SortableCollection {

    /**
     * @returns {{}}
     */
    componentOptions() {
        return {
            tasksState: this.tasksState
        };
    }

}