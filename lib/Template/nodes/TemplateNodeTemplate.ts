import {TemplateNode} from './TemplateNode';
import {TemplateNodeContent} from './TemplateNodeContent';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {CompiledString} from '../../declarations';

export class TemplateNodeTemplate extends TemplateNode {
    public name: string;
    public content: TemplateNodeContent;

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env:TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    public compile():CompiledString {
        this.env.registerTemplate(this.name, () => {
            return this.env.compileScope(this.name, this.content.compile());
        });

        return null;
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeTemplate}
     */
    static factory(node, env:TemplateEnvironment) {
        node.content = env.factoryContent(node.content);

        return new TemplateNodeTemplate(node, env);
    }

}
