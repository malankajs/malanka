import {Events} from '../Data/Events';
import {Environment} from '../Environment';
import {Planner} from '../Data/Planner';
import {Renderer} from '../Renderer/Renderer';
import {RendererElement} from '../declarations';

export abstract class AbstractComponent extends Events {
    protected components:AbstractComponent[];
    protected options:Object;
    protected env:Environment;
    protected element:RendererElement;

    protected _isRendered:boolean;

    public abstract render(element?:RendererElement):void;

    /**
     * @param {{}} options
     */
    constructor(options = {}) {
        super();
        
        this.components = [];
        this.options = options;
    }
    
    /**
     * @param {Environment} env
     */
    public setEnv(env:Environment) {
        this.env = env;
    }

    /**
     * @returns {Environment}
     */
    public getEnv():Environment {
        return this.env;
    }

    /**
     * @returns {Renderer}
     */
    public getRenderer():Renderer {
        return this.getEnv().renderer;
    }

    /**
     * @returns {Planner}
     */
    public getPlanner():Planner {
        return this.getEnv().planner;
    }

    /**
     * @returns {*}
     */
    public getElement():RendererElement {
        if (this.element === undefined) {
            throw new Error('Component is not rendered');
        }

        return this.element;
    }

    /**
     * @returns {boolean}
     */
    public isRendered():boolean {
        return this._isRendered && this.element !== undefined;
    }

    /**
     * Destroy component
     */
    public destroy() {
        this._isRendered = false;
        this.stopListening();

        if (this.element) {
            this.getRenderer().removeChild(null, this.element);
            this.element = undefined;
        }
    }

}
