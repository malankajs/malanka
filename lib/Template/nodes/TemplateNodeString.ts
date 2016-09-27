import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {TemplateNodeStringAST} from '../../declarations';

export class TemplateNodeString extends TemplateNode {
    public string:string;

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     */
    constructor(string:string, env:TemplateEnvironment) {
        super(env);

        this.string = string;
    }

    /**
     * @returns {string}
     */
    public compile():string {
        return JSON.stringify(this.string);
    }

    /**
     */
    static factory(string:(string|TemplateNodeStringAST), env:TemplateEnvironment):TemplateNodeString {
        if (typeof string === 'object') {
            string = (string as TemplateNodeStringAST).content;
        }

        return new TemplateNodeString(string as string, env);
    }

}
