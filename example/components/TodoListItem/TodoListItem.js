import {Component, Defaults, Mutator} from '../../../es5';

import styles from './TodoListItem.css';
import template from './TodoListItem.hbs';

@Defaults({
    styles,
    template,

    events: {
        click: 'setCurrent'
    }
})
export class TodoListItem extends Component {

    @Mutator('current')
    className(isCurrent) {
        return isCurrent ?
            this.styles.current :
            this.styles.root;
    }

    @Mutator('tasksState.currentList')
    current(current) {
        return this.list === current;
    }

    setCurrent() {
        this.tasksState.setCurrentList(this.list);
    }

}