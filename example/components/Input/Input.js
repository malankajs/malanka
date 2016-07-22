import {Component, Defaults} from '../../../es5';

import template from './Input.hbs';
import styles from './Input.css';

@Defaults({styles, template, placeholder: ''})
export class Input extends Component {

    /**
     * @param {Event} event
     */
    onInput(event) {
        this.value.setValue(event.currentTarget.value);
    }

    /**
     * @param {Event} event
     */
    onKeyDown(event) {
        if (event.which === 13) {
            this.emitEvent('enter', event);
        }
    }

}