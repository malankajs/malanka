import {Component} from './Component';

export class RegionComponent extends Component {

    /**
     * @param args
     *
     * @returns {*}
     */
    render(...args) {
        if (!this.isRendered()) {
            this.component.on(() => this.render());
        }

        this.content = this.component.getValue();

        return super.render(...args);
    }

}