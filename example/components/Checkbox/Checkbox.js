import {Component, Defaults} from '../../../es5';

import styles from './Checkbox.css';
import template from './Checkbox.hbs';

@Defaults({
    styles,
    template,
    tagName: 'label'
})
export class Checkbox extends Component {

    onClick() {
        this.value.setValue(!this.value.getValue());
    }

}