import {result} from './utils';
import {ValueProxy} from './ValueProxy';
import {Prototype} from './Prototype';

import {TextComponent} from './TextComponent';

@Prototype({
    styles: {}
})
export class Component extends TextComponent {

    /**
     * @param {{[env]: Environment}} options
     */
    constructor(options = {}) {
        super(options);

        this.children = [];

        this.events = result(this, 'events');
        this.className = result(this, 'className');
        this.attributes = result(this, 'attributes') || {};
        this.tagName = result(this, 'tagName') || 'div';
        this.template = this.options.template || this.template;

        this._listenAttributes = {};
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

        this.setAttributes(attributes);
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
            renderer.clear(this.element);

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

        if (template) {
            content = template(this);
        }

        if (content == null) {
            content = [];
        }

        if (!Array.isArray(content)) {
            content = [content];
        }

        this.content = content;

        return content;
    }

    /**
     * @param {Component|ValueProxy|string|number|boolean|array} component
     * @returns {Component}
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
     */
    setAttributes(attributes) {
        let renderer = this.getRenderer();

        Object.keys(attributes).forEach(key => {
            let attribute = attributes[key];

            if (attribute != null) {
                renderer.setAttribute(this.element, key, String(attribute));

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
     * @param {{}} attributes
     */
    listenAttributes(attributes) {
        Object.keys(attributes).forEach(key => {
            if (attributes[key] instanceof ValueProxy) {
                this.listenTo(attributes[key], (value) => {
                    this.getRenderer().setAttribute(this, key, value);
                });
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
                renderer.addEventListener(this.element, event, this.events[event]);
            });
        }
    }

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */
    proxy(key) {
        return this.options[key];
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


}
