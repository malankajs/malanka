import {TemplateNode} from './TemplateNode';

export class TemplateNodeTemplate extends TemplateNode {

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
        return this.env.registerTemplate(this.name, () => {
            var content = this.content.compile();

            return `function(${this.name}){return ${content}}`;
        });
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeTemplate}
     */
    static factory(node, env) {
        node.content = env.factoryContent(node.content);

        return new TemplateNodeTemplate(node, env);
    }

}
