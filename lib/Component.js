import {result} from './utils';
import {ValueProxy} from './ValueProxy';
import {Prototype} from './Prototype';
import {Model} from './Model';

import {TextComponent} from './TextComponent';
import {AbstractComponent} from './AbstractComponent';

@Prototype({
    styles: {}
})
export class Component extends AbstractComponent {

    /**
     * @param {{[env]: Environment}} options
     */
    constructor(options = {}) {
        super(options);

        let events = this.events;

        Object.assign(this, options);

        if (events || options.events) {
            this.events = Object.assign({}, events, options.events);
        }

        this.content = options.content || this.content;
        this.className = result(this, 'class') || result(this, 'className');
        this.attributes = result(this, 'attributes') || {};
        this.tagName = result(this, 'tagName') || 'div';
        this.template = this.options.template || this.template;

        this._listenAttributes = {};

        if (this.initialize) {
            this.initialize(options);
        }
    }

    /**
     * Render component
     *
     * @params {Element} element restore
     */
    render(element = null) {
        let className = this.className,
            attributes = this.attributes,
            tagName = this.tagName;

        // console.log(this.constructor.name, element);

        if (!this.isRendered()) {
            if (element) {
                this.element = element;
            } else {
                this.element = this.getRenderer().createElement(tagName);
            }
        }

        if (className !== undefined) {
            attributes['class'] = className;
        }

        this.setAttributes(attributes, element);
        this.renderContent(element);

        this.listenEvents();

        this._isRendered = true;
    }

    /**
     * @returns {Component[]}
     */
    renderContent(element = null) {
        let content = this.prepareContent(),
            renderer = this.getRenderer();

        let components = [],
            currentComponents = this.components.slice(),
            newComponents = content,
            elements = element ? [].slice.call(element.childNodes) : [];

        if (element) {
            // Browser generate tbody for table
            // if we have only it - ignore
            if (element.tagName && element.tagName.toLowerCase() === 'table' && elements.length === 1) {
                elements = [].slice.call(elements[0].childNodes);
            }

            if (newComponents.length !== elements.length) {
                console.warn('Restore components count %d, but we have %d nodes', newComponents.length, elements.length);
            }
        }

        for (let index = 0; index < newComponents.length; index++) {
            let component = this.prepareComponent(newComponents[index]),
                currentIndex = currentComponents.indexOf(component);

            if (component) {
                if (currentIndex !== -1) {
                    currentComponents.splice(currentIndex, 1);
                }

                if (!component.isRendered()) {
                    this.getEnv().render(component, element && elements.shift());
                }

                components.push(component)
            }
        }

        for (let index = 0; index < currentComponents.length; index++) {
            currentComponents[index].destroy();
        }

        this.components = components;

        if (!element) {
            // renderer.clear(this.element);

            for (let index = 0; index < components.length; index++) {
                renderer.append(this.element, components[index].getElement());
            }
        }

        return components;
    }

    /**
     * @returns {*[]}
     */
    prepareContent() {
        let content = this.content,
            template = this.template;

        if (typeof content === 'function') {
            content = content(this);
        }

        if (template) {
            content = template(this);
        }

        if (content == null) {
            content = [];
        }

        if (!Array.isArray(content)) {
            content = [content];
        }

        return content;
    }

    /**
     * @param {Component|ValueProxy|string|number|boolean|array} component
     *
     * @returns {AbstractComponent}
     */
    prepareComponent(component) {
        if (component instanceof ValueProxy || typeof component !== 'object') {
            component = new TextComponent({
                content: component
            });
        }

        return component;
    }

    /**
     * @param {{}} attributes
     * @param {Element} element
     */
    setAttributes(attributes, element = null) {
        let renderer = this.getRenderer();

        Object.keys(attributes).forEach(key => {
            let attribute = attributes[key];

            if (attribute != null) {
                // Restoration
                if (!element) {
                    renderer.setAttribute(this.element, key, String(attribute));
                }

                if (attribute instanceof ValueProxy) {
                    if (this._listenAttributes[key]) {
                        this._listenAttributes[key]();
                    }

                    var callback = (value) => {
                        renderer.setAttribute(this.element, key, String(value));
                    };

                    this.listenTo(attribute, callback);

                    this._listenAttributes = () => {
                        attribute.off(callback);
                    };
                }
            }
        });
    }

    /**
     * Listen DOM events
     */
    listenEvents() {
        if (this.events) {
            let renderer = this.getRenderer();

            Object.keys(this.events).forEach(event => {
                renderer.addEventListener(this.element, event, this.events[event].bind(this));
            });
        }
    }

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    proxy(key) {
        return this[key];
    }

    /**
     * @param {string} name
     * @param {*} args
     */
    emitEvent(name, ...args) {
        if (this.events && this.events[name]) {
            this.events[name](...args);
        }
    }

    /**
     * Destroy component
     */
    destroy() {
        super.destroy();
        this.components.forEach(component => component.destroy());
    }

    /**
     * @returns {Model}
     */
    get state() {
        if (!this._state) {
            this._state = new Model(this.stateDefaults);
        }

        return this._state;
    }

    /**
     * @param {Model} state
     */
    set state(state) {
        this._state = state;
    }

}
