import {Component, Defaults} from '../../../es5';

import styles from './TodoPage.css';
import template from './TodoPage.hbs';

@Defaults({
    styles,
    template,

    stateDefaults: {
        taskName: ''
    }
})
export class TodoPage extends Component {

    onCreate() {
        let taskName = this.state.taskName;
        this.state.set('taskName', '');

        if (taskName) {
            this.tasks.create({
                title: taskName
            });
        }
    }

}