import {Component} from './Component';

export class RegionComponent extends Component {

    /**
     * @param args
     *
     * @returns {*}
     */
    render(...args) {
        this.content = this.component.getValue();

        if (!this.isRendered()) {
            this.component.on(() => this.render());
        }

        return super.render(...args);
    }
}