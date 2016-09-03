import {TemplateNode} from './TemplateNode';

export class TemplateNodeArray extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    compile() {
        let values = this.values.map(value => value.compile());

        return `[${values.join(',')}]`;
    }

    /**
     * @param {{values: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeArray}
     */
    static factory(node, env) {
        node.values = node.values.map(value => env.factory(value));

        return new TemplateNodeArray(node, env);
    }

}
