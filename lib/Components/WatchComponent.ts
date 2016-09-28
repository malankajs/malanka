import {Component} from './Component';
import {ValueProxy} from '../Data/ValueProxy';

export class WatchComponent extends Component {
    protected value:ValueProxy<any>;

    /**
     */
    public render(element?) {
        if (!this.isRendered()) {
            this.listenTo(this.value, () => this.render());
        }

        return super.render(element);
    }

}
