import {Component, Defaults} from '../../../es5';

import template from './Input.hbs';
import styles from './Input.css';

@Defaults({styles, template})
export class Input extends Component {

    /**
     * @param {Event} event
     */
    onInput(event) {
        this.value.setValue(event.currentTarget.value);
    }

    onKeyDown(event) {
        if (event.which === 13) {
            this.emitEvent('enter', event);
        }
    }

}