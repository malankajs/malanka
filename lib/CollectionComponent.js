import {Component} from './Component';
import {Collection} from './Collection';
import {ValueProxy} from "./ValueProxy";

export class CollectionComponent extends Component {

    constructor(options) {
        super(options);

        this._children = new WeakMap();
    }

    prepareContent() {
        let collection = this.collection,
            content;

        if (collection instanceof Collection) {
            content = collection.map(model => this.prepareChild(model));

            if (!this._isRendered) {
                collection.channel('add').on((model) => this.addChild(model));
                collection.channel('remove').on((model) => this.removeChild(model));
                collection.channel('reset').on(() => this.render());
            }
        } else if (collection instanceof ValueProxy) {
            content = collection.getValue().map(model => this.prepareChild(model));

            if (!this._isRendered) {
                collection.on(() => this.render());
            }
        } else {
            console.log(collection);
            throw new Error('Cannot render');
        }


        return this.content = content;
    }

    prepareChild(model) {
        let template = this.template,
            childComponent = this.childComponent,
            component = typeof model === 'object' ? this._children.get(model) : null;

        if (component) {
            return component;
        }

        if (childComponent) {
            component = new childComponent({
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

}