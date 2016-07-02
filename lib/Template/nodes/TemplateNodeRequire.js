import {TemplateNode} from './TemplateNode';

export class TemplateNodeRequire extends TemplateNode {

    /**
     * @param {TemplateNodeString} node
     * @param {TemplateNodeExpression} env
     */
    constructor(node, env) {
        super(env);
        
        this.path = node.string;
    }

    /**
     * @returns {string}
     */
    compile() {
        return `require(${JSON.stringify(this.path)})`;
    }
    
    /**
     * @param {TemplateNodeString} node
     * @param {TemplateNodeExpression} env
     * 
     * @returns {TemplateNodeRequire}
     */
    static factory(node, env) {
        return new this(node, env);
    }
    
}