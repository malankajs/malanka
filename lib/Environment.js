import {Planner} from './Data/Planner';
import {DomWrapper} from './Components/DomWrapper';

export class Environment {

    /**
     * @param {{renderer: Renderer}} options
     */
    constructor(options = {}) {
        this.isBrowser = typeof window === 'object';
        this.isServer = !this.isBrowser;

        Object.assign(this, options);

        if (!this.planner) {
            this.planner = new Planner();
        }

        if (!this.window) {
            this.window = new DomWrapper(this.isBrowser ? window : null);
        }

        if (!this.document) {
            this.document = new DomWrapper(this.isBrowser ? document : null);
        }

        if (!this.body) {
            this.body = new DomWrapper(this.isBrowser ? document.body : null);
        }
    }

    /**
     * @param {AbstractComponent} component
     * @param {Element} [element]
     */
    render(component, element) {
        component.setEnv(this);
        component.render(element);

        return component.getElement();
    }

}