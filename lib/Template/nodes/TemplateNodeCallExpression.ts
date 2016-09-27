import {TemplateNode} from './TemplateNode';
import {TemplateNodePath} from './TemplateNodePath';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeCallExpression extends TemplateNode {
    protected path: TemplateNodePath;
    protected params: TemplateNode[];

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
        return this.path.compileMethod(this.params);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeCallExpression}
     */
    static factory(node, env: TemplateEnvironment): TemplateNodeCallExpression {
        node.path = env.factoryPath(node.path);
        node.params = node.params.map(param => env.factory(param));

        return new this(node, env);
    }

}
