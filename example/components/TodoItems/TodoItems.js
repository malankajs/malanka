import {Defaults} from '../../../es5';
import {SortableCollection} from '../SortableCollection/SortableCollection'
import {TodoItem} from '../TodoItem/TodoItem'

import styles from './TodoItems.css';

@Defaults({
    styles,
    ChildComponent: TodoItem,
    modelName: 'task'
})
export class TodoItems extends SortableCollection {

    componentOptions() {
        return {
            tasksState: this.tasksState
        };
    }

}