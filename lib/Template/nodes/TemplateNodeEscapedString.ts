import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeEscapedString extends TemplateNode {
    protected content: string;

    /**
     * @param {string} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env:TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    public compile():string {
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
