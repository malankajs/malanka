import {Component} from './Component';
import {Collection} from '../Data/Collection';
import {ValueProxy} from "../Data/ValueProxy";

export class CollectionComponent extends Component {

    constructor(options) {
        super(options);

        this._children = new WeakMap();
        this._originalCollection = this.collection;
    }

    /**
     * @param {Element|null} [element]
     *
     * @returns {*}
     */
    render(element = null) {
        // first render, we need check type
        if (!this.isRendered()) {
            let collection = this.collection;

            if (collection instanceof ValueProxy) {
                let _element;

                this.listenTo(collection, (value) => {
                    if (value instanceof Collection && collection !== value) {
                        this.stopListening(collection);
                        this._listenCollection(collection);
                    }

                    this.render(_element);
                    _element = null;
                });

                var value = collection.getValue();

                if (value instanceof Collection) {
                    this.collection = value;
                    this._listenCollection(value);
                } else {
                    this.prepareContent = this._prepareValueProxyContent;

                    // we wait something awesome, schedule restore
                    if (element && !value.length && collection.getNestedPromises().length) {
                        this.element = _element = element;
                        this._isRendered = true;

                        return;
                    }
                }
            } else if (collection instanceof Collection) {
                this._listenCollection(collection);

                this.prepareContent = this._prepareArrayContent;
            } else if (Array.isArray(collection)) {
                this.prepareContent = this._prepareArrayContent;
            } else {
                return console.error('Cannot render collection. Unsupported type', collection);
            }
        }

        return super.render(element);
    }

    /**
     * @param {Collection} collection
     * @private
     */
    _listenCollection(collection) {
        collection.channel('add').on((model) => this.addChild(model));
        collection.channel('remove').on((model) => this.removeChild(model));
        collection.channel('reset').on(() => this.render());

        this.prepareContent = this._prepareArrayContent;
    }

    /**
     * @returns {Component[]}
     *
     * @private
     */
    _prepareArrayContent() {
        return this.content = this.collection.map(model => this.prepareChild(model));
    }

    /**
     * @returns {Component[]}
     *
     * @private
     */
    _prepareValueProxyContent() {
        return this.content = this.collection.getValue().map(model => this.prepareChild(model));
    }

    /**
     * @param {*} model
     *
     * @returns {Component}
     */
    prepareChild(model) {
        let template = this.template,
            ChildComponent = this.ChildComponent,
            component = typeof model === 'object' ? this._children.get(model) : null;

        if (component) {
            return component;
        }

        if (ChildComponent) {
            component = new ChildComponent({
                model
            });
        } else {
            component = template(model);

            if (!(component instanceof Component)) {
                component = new Component({
                    content: component
                });
            }
        }

        if (typeof model === 'object') {
            this._children.set(model, component);
        }

        return component;
    }

    /**
     * @param {*} model
     */
    addChild(model) {
        if (this.isRendered()) {
            let component = this.prepareChild(model);
            this.components.push(component);

            if (!component.isRendered()) {
                this.getEnv().render(component);
            }

            this.getRenderer().append(this.element, component.getElement());
        }
    }

    /**
     * @param {*} model
     */
    removeChild(model) {
        if (this.isRendered()) {
            let component = this._children.get(model),
                index = this.components.indexOf(component);

            if (component && index > -1) {
                this.components.splice(index, 1);

                if (component.isRendered()) {
                    this.getRenderer().removeChild(this.element, component.getElement());
                    component.destroy();
                }
            }
        }
    }

    destroy() {
        super.destroy();

        this.collection = this._originalCollection;
    }

}