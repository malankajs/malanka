import {TemplateNode} from './TemplateNode';
import {TemplateNodePath} from './TemplateNodePath';

export class TemplateNodeVar extends TemplateNode {

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
        return this.path.compile();
    }

    /**
     * @returns {string}
     */
    compileMethod() {
        return this.path.compileMethod();
    }

    /**
     * @returns {boolean}
     */
    isWatch() {
        return this.path.isWatch();
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */
    static factory(node, env) {
        return new TemplateNodeVar(node, env);
    }

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */
    static factoryFromString(string, env) {
        return new TemplateNodeVar({path: TemplateNodePath.factory(string, env)}, env)
    }

}