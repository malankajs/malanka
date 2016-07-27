import {Component} from './Component';

export class WatchComponent extends Component {

    /**
     * @param args
     *
     * @returns {*}
     */
    render(...args) {
        if (!this.isRendered()) {
            this.listenTo(this.value, () => this.render());
        }

        return super.render(...args);
    }

}