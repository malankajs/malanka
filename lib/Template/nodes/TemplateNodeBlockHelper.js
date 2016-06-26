import {TemplateNodeHelper} from './TemplateNodeHelper';

export class TemplateNodeBlockHelper extends TemplateNodeHelper {

    /**
     * @returns {{hash: string}}
     */
    compileOptions() {
        let options = super.compileOptions();

        if (this.content) {
            let context = this.env.tempVar();

            options.content = this.env.scope({context}, () => {
                return `function(${context}){return ${this.content.compile()};}`
            });
        }

        if (this.inverse) {
            options.inverse = `function(){return ${this.inverse.compile()};}`;
        }

        return options;
    }

    /**
     * @param {{params: [], hash: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeBlockHelper}
     */
    static factory(node, env) {
        node.params = (node.params || []).map(param => env.factoryPath(param || []));
        node.hash = env.factoryHashAttributes(node.hash || []);
        node.content = node.content && env.factoryContent(node.content);
        node.inverse = node.inverse && env.factoryContent(node.inverse);

        return new TemplateNodeBlockHelper(node, env);
    }

}