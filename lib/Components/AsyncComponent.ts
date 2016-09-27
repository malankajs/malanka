import {AbstractComponent} from './AbstractComponent';
import {RendererElement} from '../Renderer/Renderer';

export class AsyncComponent extends AbstractComponent {
    protected options:{promise:Promise<AbstractComponent>};
    protected component:AbstractComponent;

    /**
     * @param {Element} [element]
     */
    public render(element:Node) {
        if (!this.isRendered()) {
            let componentPromise = this.options.promise,
                renderer = this.getRenderer(),
                env = this.getEnv();

            this.element = element || renderer.createComment();

            if (componentPromise) {
                let promise = componentPromise.then((component) => {
                    if (!this.isRendered()) {
                        return;
                    }

                    this.component = component;

                    // if component is comment, avoid restore
                    if (element && element.nodeType === Node.COMMENT_NODE) {
                        element = null;
                    }

                    let newElement = env.render(component, element);

                    if (this.element !== newElement) {
                        renderer.replaceWith(this.element, newElement);
                    }
                });

                env.awaitPromise(promise);
            }

            this._isRendered = true;
        }
    }

    /**
     */
    public getElement():RendererElement {
        if (this.component) {
            return this.component.getElement();
        }

        return this.element;
    }

    /**
     * Destroy async view and component
     */
    public destroy() {
        super.destroy();

        if (this.component) {
            this.component.destroy();
        }
    }

}
