import {TemplateNodeHelper} from './TemplateNodeHelper';
import {TemplateNodeString} from "./TemplateNodeString";

export class TemplateNodeBlockHelper extends TemplateNodeHelper {

    /**
     * @returns {{hash: string}}
     */
    compileOptions() {
        let options = super.compileOptions(),
            scope = this.hash.getScope();

        if (scope) {
            if (scope instanceof TemplateNodeString) {
                scope = scope.string;
            } else {
                console.log(scope);
                throw new Error('Scope must be string');
            }
        }

        if (this.content) {
            options.content = this.env.scope({scope}, () => {
                return `function(${scope}){return ${this.content.compile()}}`
            });
        }

        if (this.inverse) {
            options.inverse = `function(){return ${this.inverse.compile()}}`;
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
        node.params = (node.params || []).map(param => env.factory(param || []));
        node.hash = env.factoryHashAttributes(node.hash || []);
        node.content = node.content && env.factoryContent(node.content);
        node.inverse = node.inverse && env.factoryContent(node.inverse);

        return new TemplateNodeBlockHelper(node, env);
    }

}