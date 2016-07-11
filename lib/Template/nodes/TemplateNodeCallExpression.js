import {TemplateNode} from './TemplateNode';

export class TemplateNodeCallExpression extends TemplateNode {

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
        return this.path.compileMethod(this.params);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     * 
     * @returns {TemplateNodeCallExpression}
     */
    static factory(node, env) {
        node.path = env.factoryPath(node.path);
        node.params = node.params.map(param => env.factory(param));

        return new this(node, env);
    }
    
}