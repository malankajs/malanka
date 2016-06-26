import {Events} from './Events';

export class AbstractComponent extends Events {

    /**
     * @param {{}} options
     */
    constructor(options) {
        super();
        
        this.components = [];
        this.options = options;

        Object.keys(options).forEach(key => {
            this[key] = options[key];
        });
    }
    
    /**
     * @param {Environment} env
     */
    setEnv(env) {
        this.env = env;
    }

    /**
     * @returns {Environment}
     */
    getEnv() {
        return this.env;
    }

    /**
     * @returns {Renderer}
     */
    getRenderer() {
        return this.getEnv().renderer;
    }

    /**
     * @returns {*}
     */
    getElement() {
        if (this.element === undefined) {
            throw new Error('Component is not rendered');
        }

        return this.element;
    }

    /**
     * @returns {boolean}
     */
    isRendered() {
        return this._isRendered && this.element !== undefined;
    }

    /**
     * Destroy component
     */
    destroy() {
        this._isRendered = false;
        this.stopListening();
    }

}