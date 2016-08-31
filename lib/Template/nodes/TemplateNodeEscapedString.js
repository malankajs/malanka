import {TemplateNode} from './TemplateNode';

export class TemplateNodeEscapedString extends TemplateNode {

    /**
     * @param {string} node
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
        return JSON.stringify(this.content);
    }

    /**
     * @param {{content: string}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeEscapedString}
     */
    static factory(node, env) {
        return new TemplateNodeEscapedString(node, env);
    }

}
