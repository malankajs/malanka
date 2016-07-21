import {Component, Defaults} from '../../../es5';

import styles from './TestPage.css';
import template from './TestPage.hbs';

@Defaults({
    styles,
    template,

    stateDefaults: {
        calc: false
    }
})
export class TestPage extends Component {

    onCalc() {
        this.state.set('calc', true);
    }

    onRepositories() {
        this.state.set('calc', false);
    }

}