import {Component} from './Component';

export class IfComponent extends Component {

    render(element) {
        if (!this.isRendered()) {
            this.listenTo(this.contentProxy, () => this.render());
        }

        this.content = this.contentProxy.getValue();

        super.render(element)
    }

}