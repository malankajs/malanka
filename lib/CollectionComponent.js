import {Component} from './Component';
import {Collection} from './Collection';

export class CollectionComponent extends Component {

    constructor(options) {
        super(options);

        this._children = new WeakMap();
    }

    prepareContent() {
        let collection = this.collection;

        let content = collection.map(model => this.prepareChild(model));

        if (!this._isRendered) {
            if (collection instanceof Collection) {
                collection.channel('add').on((model) => this.addChild(model));
                collection.channel('remove').on((model) => this.removeChild(model));
                collection.channel('reset').on(() => this.render());
            }
        }

        return this.content = content;
    }

    prepareChild(model) {
        let template = this.template,
            childComponent = this.childComponent,
            component = this._children.get(model);

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

        this._children.set(model, component);

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