import {Model} from '../Data/Model';
import {Component} from './Component';
import {Collection} from '../Data/Collection';
import {ValueProxy} from '../Data/ValueProxy';
import {Defaults} from '../Decorators/Defaults';
import {AbstractComponent} from './AbstractComponent';
import {CollectionComponentCollection, TemplateFunction} from '../declarations';

@Defaults({
    modelName: 'model'
})
export class CollectionComponent extends Component {
    public collection: CollectionComponentCollection;
    public modelName: string;

    protected template: TemplateFunction;
    protected childTemplate: TemplateFunction;
    protected emptyTemplate: TemplateFunction;
    protected ChildComponent: {new(options):AbstractComponent};

    protected childComponents:AbstractComponent[];
    protected _isEmpty: boolean;
    protected _children: WeakMap<Object, AbstractComponent>;
    protected _originalCollection: CollectionComponentCollection;

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
    public render(element = null) {
        // first render, we need check type
        if (!this.isRendered()) {
            let collection = this.collection;

            if (collection instanceof ValueProxy) {
                let _element;

                this.listenTo(collection, (value) => {
                    if (value instanceof Collection && collection !== value) {
                        this.stopListening(collection as ValueProxy<Object[]>);
                        this._listenCollection(value);
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
    protected _listenCollection(collection) {
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
    protected _prepareArrayContent() {
        return this._defaultPrepare((this.collection as Object[]).map(model => this.prepareChild(model)));
    }

    /**
     * @returns {Component[]}
     *
     * @private
     */
    protected _prepareValueProxyContent() {
        return this._defaultPrepare((this.collection as ValueProxy<Object[]>).getValue().map(model => this.prepareChild(model)));
    }

    /**
     * @params {Component[]} content
     *
     * @returns {Component[]}
     *
     * @private
     */
    protected _defaultPrepare(content) {
        if (this.emptyTemplate && !content.length) {
            content = this.emptyTemplate(this) || [];

            if (!Array.isArray(content)) {
                content = [content];
            }

            this._isEmpty = true;
        } else {
            if (this.template) {
                this.childComponents = content;

                content = super.prepareContent();
            }

            this._isEmpty = false;
        }

        return content;
    }

    /**
     * @param {*} model
     *
     * @returns {Component}
     */
    protected prepareChild(model):AbstractComponent {
        let template = this.childTemplate,
            ChildComponent = this.ChildComponent,
            component = typeof model === 'object' ? this._children.get(model) : null;

        if (component) {
            return component;
        }

        let options = Object.assign({}, this.componentOptions());

        if (ChildComponent) {
            component = new ChildComponent(Object.assign(options, {
                [this.modelName]: model
            }));
        } else {
            let templateContent = template(model);

            if (templateContent instanceof Component) {
                component = templateContent as Component;
            } else {
                component = new Component(Object.assign(options, {
                    content: templateContent
                }));
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
    protected addChild(model) {
        if (this.isRendered()) {
            if (this._isEmpty) {
                return this.render();
            }

            let collection = (this.collection as Collection<Model>),
                component = this.prepareChild(model),
                index = collection.indexOf(model);

            this.components.push(component);

            if (!component.isRendered()) {
                this.getEnv().render(component);
            }

            if (index > -1 || index !== collection.length) {
                this.getRenderer().appendAt(this.element, component.getElement(), index);
            } else {
                this.getRenderer().append(this.element, component.getElement());
            }
        }
    }

    /**
     * @param {*} model
     */
    protected removeChild(model) {
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

            if (!(this.collection as Collection<Model>).length) {
                this.render();
            }
        }
    }

    /**
     * @param {Element} element
     * @returns {Component}
     */
    protected getComponentForElement(element) {
        return this.components.find(component => {
            return component.getElement() === element;
        });
    }

    /**
     * @returns {{}}
     */
    protected componentOptions() {
        return {};
    }

    public destroy() {
        super.destroy();

        this.collection = this._originalCollection;
    }

}
