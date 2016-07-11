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

    @Mutator(['value', 'collection'])
    currentItem([value, collection]) {
        return collection.find(item => {
            return this._getValue(item) === value;
        });
    }

    @Mutator('currentItem')
    title(item) {
        return this.itemName(item);
    }
    
    isCurrent(item) {
        return this.currentItem.mutate(current => current === item);
    }

    itemName(item) {
        if (!item) {
            return '';
        }

        return item.proxy(this.textFrom);
    }
    
    _getValue(item) {
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
    onClick(item) {
        this.value.setValue(this._getValue(item));
        this.state.set('opened', false);
    }

}