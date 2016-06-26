import {Component} from '../../Component';

export class IfComponent extends Component {

    render() {
        this.content = this.contentProxy.getValue();

        if (!this.isRendered()) {
            this.listenTo(this.contentProxy, () => this.render());
        }

        super.render()
    }


}