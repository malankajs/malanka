import {TemplateNode} from './TemplateNode';
import {TemplateNodeVar} from './TemplateNodeVar';
import {TemplateNodeCallExpression} from './TemplateNodeCallExpression';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeAbstractAttribute extends TemplateNode {
    public name: string;
    public event: boolean;
    public value: TemplateNode;

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env:TemplateEnvironment) {
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
    public compileHash():Object {
        return this.env.scope({isString: true}, () => {
            return {
                [this.name]: this.value.compile()
            };
        });
    }

    /**
     * @returns {{}}
     */
    public compileEvent():Object {
        let value = this.value;

        if (value instanceof TemplateNodeVar) {
            return {
                [this.name]: value.compileMethod()
            };
        } else if (value instanceof TemplateNodeCallExpression) {
            return {
                [this.name]: value.compile()
            };
        } else {
            throw new Error('Event value must be expression');
        }
    }

    /**
     * @returns {boolean}
     */
    public isEvent():boolean {
        return Boolean(this.event);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeAbstractAttribute}
     */
    static factory(node, env:TemplateEnvironment) {
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

        return new this(node, env);
    }

}
