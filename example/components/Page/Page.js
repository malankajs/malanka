import {Component, Defaults} from '../../../es5';

import template from './Page.hbs';
import styles from './Page.css';

@Defaults({styles, template})
export class Page extends Component {

    onSearch(event) {
        console.log(event);
    }

}