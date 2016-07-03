export class Environment {

    /**
     * @param {{renderer: Renderer}} options
     */
    constructor(options = {}) {
        this.options = options;
        this.renderer = options.renderer;
        
        this.isBrowser = typeof window === 'object';
        this.isServer = !this.isBrowser;
    }

    /**
     * @param {Component} component
     */
    render(component, element) {
        component.setEnv(this);
        component.render(element);

        return component.getElement();
    }

}