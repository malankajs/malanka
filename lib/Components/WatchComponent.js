import {Component} from './Component';

export class WatchComponent extends Component {

    /**
     * @param args
     *
     * @returns {*}
     */
    render(...args) {
        if (!this.isRendered()) {
            this.component.on(() => this.render());
        }

        return super.render(...args);
    }

}