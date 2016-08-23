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
            this.planner = Planner.getInstance();
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

        this._promises = [];
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

    /**
     * @param {Promise} promise
     */
    awaitPromise(promise) {
        this._promises.push(promise);
    }

    /**
     * Wait for server rendering, if someone is wait rendering
     * 
     * @returns {Promise}
     */
    async() {
        let promises = this._promises;
        this._promises = [];

        return Promise.all(promises);
    }

}
