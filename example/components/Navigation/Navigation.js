import {Component, Defaults} from '../../../es5';

import template from './Navigation.hbs';
import styles from './Navigation.css';

@Defaults({
    styles,
    template,

    links: [
        {title: 'Documentation', route: 'home'},
        {title: 'Test', route: 'test'},
        {title: 'ToDo', route: 'todo'}
    ]
})
export class Navigation extends Component {

}