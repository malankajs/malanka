import {Component, Defaults} from '../../../es5';

import styles from './TodoDetails.css';
import template from './TodoDetails.hbs';

@Defaults({
    styles,
    template
})
export class TodoDetails extends Component {

    onRemove() {
        return this.task.remove().then(() => {
            this.tasksState.setCurrentTask(null);
        });
    }

}