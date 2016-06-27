import {AbstractComponent} from './AbstractComponent';
import {result} from './utils';
import {ValueProxy} from './ValueProxy';

export class TextComponent extends AbstractComponent {

    /**
     * @param {{[env]: Environment}} options
     */
    constructor(options = {}) {
        super(options);

        this.content = options.content || this.content;
    }

    /**
     * @param {Element} element
     */
    render(element = null) {
        var renderer = this.getRenderer();

        if (!this.isRendered()) {
            if (element) {
                this.element = element;
            } else {
                this.element = renderer.createTextNode();
                renderer.setContent(this.element, String(this.content));
            }

            if (this.content instanceof ValueProxy) {
                this.listenTo(this.content, () => {
                    renderer.setContent(this.element, String(this.content));
                });
            }
        }

        this._isRendered = true;
    }

}