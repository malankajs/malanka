import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeArray extends TemplateNode {
    protected values: TemplateNode[];

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env: TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    public compile(): string {
        let values = this.values.map(value => value.compile());

        return `[${values.join(',')}]`;
    }

    /**
     * @param {{values: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeArray}
     */
    static factory(node, env: TemplateEnvironment): TemplateNodeArray {
        node.values = node.values.map(value => env.factory(value));

        return new TemplateNodeArray(node, env);
    }

}
