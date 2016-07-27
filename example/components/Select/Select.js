import {Defaults, Component, Mutator} from '../../../es5';

import styles from './Select.css';
import template from './Select.hbs';

@Defaults({
    styles,
    template,

    stateDefaults: {
        opened: false
    }
})
export class Select extends Component {

    /**
     * @param {*} value
     * @param {Collection} collection
     *
     * @returns {ValueProxy<boolean>}
     */
    @Mutator(['value', 'collection'])
    currentItem([value, collection]) {
        return collection.find(item => {
            return this.getValue(item) === value;
        });
    }

    /**
     * @param {*} item
     *
     * @returns {ValueProxy<string>}
     */
    @Mutator('currentItem')
    title(item) {
        return this.itemName(item);
    }

    /**
     * Click out implementation
     */
    onRender() {
        if (!this.isRendered()) {
            this.listenTo(this.getEnv().body.event('click'), (event) => {
                let node = event.target;

                while(node && node !== this.element) {
                    node = node.parentNode;
                }

                if (!node) {
                    this.state.set('opened', false);
                }
            });
        }
    }

    /**
     * @param {*} item
     * @returns {ValueProxy<boolean>}
     */
    isCurrent(item) {
        return this.currentItem.pipe(current => current === item);
    }

    /**
     * @param {*} item
     *
     * @returns {ValueProxy<string>}
     */
    itemName(item) {
        if (!item) {
            return '';
        }

        return item.proxy(this.textFrom);
    }

    /**
     * @param {*} item
     * @returns {*}
     */
    getValue(item) {
        if (this.valueFrom) {
            return item[this.valueFrom];
        } else {
            return item;
        }
    }

    /**
     * Toggle menu
     */
    onTitleClick() {
        this.state.set('opened', !this.state.opened);
    }

    /**
     * @param {Repository} item
     */
    onSelectItem(item) {
        this.value.setValue(this.getValue(item));
        this.state.set('opened', false);
    }

}