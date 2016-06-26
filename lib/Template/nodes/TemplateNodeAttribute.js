import {TemplateNode} from './TemplateNode';
import {TemplateNodeVar} from './TemplateNodeVar';

export class TemplateNodeAttribute extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
        
        if (this.name.slice(0, 2) == 'on') {
            this.event = true;
            this.name = this.name.slice(2);
        }
    }

    /**
     * @returns {{}}
     */
    compileHash() {
        return this.env.scope({isString: true}, () => {
            return {
                [this.name]: this.value.compile()
            };
        });
    }

    /**
     * @returns {{}}
     */
    compileEvent() {
        if (this.value instanceof TemplateNodeVar) {
            return {
                [this.name]: this.value.compileMethod()
            };
        } else {
            throw new Error('Event value must be expression');
        }
    }

    /**
     * @returns {boolean}
     */
    isKnownAttribute() {
        return this.env.isKnownAttribute(this.name);
    }

    /**
     * @returns {boolean}
     */
    isEvent() {
        return Boolean(this.event);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeAttribute}
     */
    static factory(node, env) {
        let prepareValue = (value) => {
            if (Array.isArray(value)) {
                if (value.length === 1) {
                    value = value[0];
                } else {
                    return env.factoryStringProxy(value);
                }
            }

            if (typeof value === 'string') {
                return env.factoryString(value);
            } else {
                return env.factory(value);
            }
        };

        node.value = prepareValue(node.value);

        return new TemplateNodeAttribute(node, env);
    }

}