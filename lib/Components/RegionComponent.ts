import {Component} from './Component';
import {ValueProxy} from '../Data/ValueProxy';
import {TemplateContent} from './AbstractComponent';

export class RegionComponent extends Component {
    protected component:ValueProxy<TemplateContent>;

    /**
     * @param args
     *
     * @returns {*}
     */
    render(...args) {
        if (!this.isRendered()) {
            this.listenTo(this.component, () => this.render());
        }

        this.content = this.component.getValue();

        return super.render(...args);
    }

}
