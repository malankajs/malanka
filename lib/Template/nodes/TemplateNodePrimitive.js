import {TemplateNode} from './TemplateNode';

export class TemplateNodePrimitive extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePrimitive}
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    compile() {
        return String(this.value);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePrimitive}
     */
    static factory(node, env) {
        return new this(node, env);
    }

}