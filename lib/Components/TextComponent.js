import {AbstractComponent} from './AbstractComponent';
import {ValueProxy} from '../Data/ValueProxy';
import {PlannerWrite} from '../Decorators/PlannerWrite';

export class TextComponent extends AbstractComponent {

    /**
     * @param {{[env]: Environment}} options
     */
    constructor(options = {}) {
        super(options);

        Object.assign(this, options);
    }

    /**
     * @param {Element} element
     */
    render(element = null) {
        if (!this.isRendered()) {
            if (this.content instanceof ValueProxy) {
                this.listenTo(this.content, (value) => this.setContent(value));
            }

            if (element) {
                this.element = element;
            } else {
                this.element = this.getRenderer().createTextNode();
                this._setContent(this.content);
            }
        }

        this._isRendered = true;
    }

    /**
     * Set content of node
     *
     * @param {string} content
     */
    @PlannerWrite()
    setContent(content) {
        if (this.isRendered()) {
            this._setContent(content);
        }
    }

    /**
     * Set content of node
     *
     * @param {string} content
     */
    _setContent(content) {
        this.getRenderer().setContent(this.element, String(content));
    }

}