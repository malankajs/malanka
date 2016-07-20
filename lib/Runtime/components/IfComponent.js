import {Component} from '../../Components/Component';

export class IfComponent extends Component {

    render() {
        if (!this.isRendered()) {
            this.listenTo(this.contentProxy, () => this.render());
        }

        this.content = this.contentProxy.getValue();

        super.render()
    }

}