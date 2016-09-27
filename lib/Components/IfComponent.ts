import {Component} from './Component';
import {ValueProxy} from '../Data/ValueProxy';
import {TemplateContent} from './AbstractComponent';

export class IfComponent extends Component {
    protected contentProxy:ValueProxy<TemplateContent>;

    public render(element?) {
        if (!this.isRendered()) {
            this.listenTo(this.contentProxy, () => this.render());
        }

        this.content = this.contentProxy.getValue();

        super.render(element)
    }

}
