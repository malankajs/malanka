import {TemplateNode} from './TemplateNode';

export class TemplateNodeComment extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {null}
     */
    compile() {
        return null;
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeComment}
     */
    static factory(node, env) {
        return new TemplateNodeComment(node, env);
    }

}
