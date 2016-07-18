import {Component, Defaults, ValueProxy, Model, Collection, Mutator} from '../../../es5';

import template from './Tabs.hbs';
import styles from './Tabs.css';

@Defaults({
    styles,
    template
})
export class Tabs extends Component {

    initialize() {
        this.body = {};
        this.state.set('active', this.active);
    }

    /**
     * @returns {Array}
     */
    tabs() {
        return Object.keys(this.body).map(key => {
            return {
                id: key,
                title: this[key]
            };
        });
    }

    /**
     * @param {string} id
     * @returns {ValueProxy}
     */
    isActive(id) {
        return this.state.proxy('active').pipe(active => active === id);
    }

    /**
     * @param {string} id
     */
    onSelect(id) {
        this.state.set('active', id);
    }

    /**
     * @param active
     * @returns {*}
     */
    @Mutator('state.active')
    currentTab(active) {
         return this.body[active];
    }

}