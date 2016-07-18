import {Component, Defaults, Mutator} from '../../../es5';

import styles from './TodoItem.css';
import template from './TodoItem.hbs';

@Defaults({
    styles,
    template
})
export class TodoItem extends Component {

    @Mutator('task.done')
    className(done) {
        return done ?
            this.styles.done :
            this.styles.root;
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

}