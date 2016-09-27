import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeComment extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env:TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {null}
     */
    public compile():string {
        return null;
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeComment}
     */
    static factory(node, env:TemplateEnvironment) {
        return new TemplateNodeComment(node, env);
    }

}
