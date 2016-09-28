import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodePrimitive extends TemplateNode {
    public value:string|number|null|undefined;

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePrimitive}
     */
    constructor(node, env:TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    public compile():string {
        return String(this.value);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePrimitive}
     */
    static factory(node, env:TemplateEnvironment) {
        return new this(node, env);
    }

}
