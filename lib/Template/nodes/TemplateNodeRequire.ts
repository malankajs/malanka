import {TemplateNode} from './TemplateNode';
import {TemplateNodePath} from './TemplateNodePath';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeRequire extends TemplateNode {
    protected path:TemplateNodePath;

    /**
     */
    constructor(node, env:TemplateEnvironment) {
        super(env);
        
        this.path = node.string;
    }

    /**
     * @returns {string}
     */
    public compile():string {
        return `require(${JSON.stringify(this.path)})`;
    }
    
    /**
     */
    static factory(node, env:TemplateEnvironment):TemplateNodeRequire {
        return new this(node, env);
    }
    
}
