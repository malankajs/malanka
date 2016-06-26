import {TemplateNode} from './TemplateNode';

export class TemplateNodeString extends TemplateNode {

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     */
    constructor(string, env) {
        super(env);

        this.string = string;
    }

    /**
     * @returns {string}
     */
    compile() {
        return JSON.stringify(this.string);
    }

    /**
     * @param {string|{content: string}} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeString}
     */
    static factory(string, env) {
        if (typeof string === 'object') {
            string = string.content;
        }

        return new TemplateNodeString(string, env);
    }

}