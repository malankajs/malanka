import {Component, Defaults} from '../../../es5';

import styles from './Checkbox.css';
import template from './Checkbox.hbs';

@Defaults({
    styles,
    template,
    tagName: 'label'
})
export class Checkbox extends Component {

    initialize() {
        this.listenTo(this.value, value => this.copyValueToCheck());
    }

    onRender() {
        this.copyValueToCheck();
    }

    onChange(event) {
        this.value.setValue(event.currentTarget.checked);
    }

    copyValueToCheck() {
        this.check.getElement().checked = Boolean(this.value.getValue());
    }

}