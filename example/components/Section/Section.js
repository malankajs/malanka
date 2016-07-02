import {Component, Defaults} from '../../../es5';

import styles from './Section.css';
import template from './Section.hbs';

@Defaults({
    template,
    styles,
    tagName: 'section'
})
export class Section extends Component {

}