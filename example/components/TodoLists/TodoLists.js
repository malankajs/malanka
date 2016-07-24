import {Component, Defaults} from '../../../es5';

import styles from './TodoLists.css';
import template from './TodoLists.hbs';

/**
 * @property {TasksState} tasksState
 */
@Defaults({
    styles,
    template,

    stateDefaults: {
        title: ''
    }
})
export class TodoLists extends Component {

    onCreate() {
        let title = this.state.title;


        if (title) {
            this.lists.create({title}).then(list => {
                this.tasksState.setCurrentList(list);
            });

            this.state.setAttrs({
                title: '',
                create: false
            });
        }
    }

    setCreateMode() {
        this.state.set('create', true);
    }

    setNormalMode() {
        this.state.set('create', false);
    }

}