import {Planner} from './Data/Planner';
import {DomWrapper} from './Components/DomWrapper';
import {Renderer} from './Renderer/Renderer';
import {AbstractComponent} from './Components/AbstractComponent';

export class Environment {
    public isBrowser: boolean;
    public isServer: boolean;
    public planner: Planner;
    public renderer: Renderer;
    public window: DomWrapper<Window>;
    public document: DomWrapper<Document>;
    public body: DomWrapper<HTMLBodyElement>;

    protected _promises: Promise<any>[];

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
            this.window = new DomWrapper<Window>(this.isBrowser ? window : null);
        }

        if (!this.document) {
            this.document = new DomWrapper<Document>(this.isBrowser ? document : null);
        }

        if (!this.body) {
            this.body = new DomWrapper<HTMLBodyElement>(this.isBrowser ? document.body : null);
        }

        this._promises = [];
    }

    /**
     * @param {AbstractComponent} component
     * @param {Element} [element]
     */
    public render(component:AbstractComponent, element?) {
        component.setEnv(this);
        component.render(element);

        return component.getElement();
    }

    /**
     * @param {Promise} promise
     */
    public awaitPromise(promise) {
        this._promises.push(promise);
    }

    /**
     * Wait for server rendering, if someone is wait rendering
     * 
     * @returns {Promise}
     */
    public async():Promise<any> {
        let promises = this._promises;
        this._promises = [];

        return Promise.all(promises);
    }

}
