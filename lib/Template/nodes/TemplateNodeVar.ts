import {TemplateNodePath} from './TemplateNodePath';
import {TemplateNodeVarAST, CompiledString} from '../../declarations';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {TemplateNode} from './TemplateNode';

export class TemplateNodeVar extends TemplateNode {
    public path: TemplateNodePath;

    /**
     */
    constructor(node:TemplateNodeVarAST, env:TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     */
    public compile():CompiledString {
        return this.path.compile();
    }

    /**
     * @returns {string}
     */
    public compileMethod():string {
        return this.path.compileMethod();
    }

    /**
     * @returns {boolean}
     */
    public isWatch():boolean {
        return this.path.isWatch();
    }

    /**
     */
    static factory(node:TemplateNodeVarAST, env:TemplateEnvironment):TemplateNodeVar {
        return new TemplateNodeVar(node, env);
    }

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */
    static factoryFromString(string:string, env:TemplateEnvironment):TemplateNodeVar {
        return new TemplateNodeVar({path: TemplateNodePath.factory(string, env)}, env)
    }

}
