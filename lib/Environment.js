export class Environment {

    /**
     * @param {{renderer: Renderer}} options
     */
    constructor(options = {}) {
        this.isBrowser = typeof window === 'object';
        this.isServer = !this.isBrowser;

        Object.assign(this, options);
    }

    /**
     * @param {Component} component
     * @param {Element} element
     */
    render(component, element) {
        component.setEnv(this);
        component.render(element);

        return component.getElement();
    }

}