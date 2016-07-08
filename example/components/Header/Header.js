import {Component, Defaults} from '../../../es5';

import styles from './Header.css';
import template from './Header.hbs';

@Defaults({
    template,
    styles,
    tagName: 'header'
})
export class Header extends Component {

    render(...args) {
        super.render(...args);

        console.log('render')
    }

}