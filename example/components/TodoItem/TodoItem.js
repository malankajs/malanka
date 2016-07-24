import {Component, Defaults, Mutator} from '../../../es5';

import styles from './TodoItem.css';
import template from './TodoItem.hbs';

/**
 * @property {TasksState} tasksState
 */
@Defaults({
    styles,
    template
})
export class TodoItem extends Component {

    @Mutator(['task.done', 'current'])
    className([done, current]) {
        var classes = [done ?
            this.styles.done :
            this.styles.root];

        if (current) {
            classes.push(this.styles.current);
        }

        return classes.join(' ');
    }

    @Mutator('tasksState.currentTask')
    current(task) {
        return this.task === task;
    }

    onEdit() {
        this.state.set('taskName', this.task.title);
        this.state.set('edit', true);
    }

    onRemove() {
        this.task.remove();
    }

    onSave() {
        let title = this.state.taskName;

        if (title) {
            this.task.set('title', title);
            this.state.set('edit', false);
        }
    }

    setCurrent() {
        this.tasksState.setCurrentTask(this.task);
    }

}