import {Component, Defaults} from '../../../es5';

import template from './HomePage.hbs';
import styles from './HomePage.css';

@Defaults({styles, template})
export class HomePage extends Component {

    onSearch(event) {
        console.log(event);
    }

}