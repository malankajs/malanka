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
            options.content = this._compileContent(scope, this.content);
        }

        if (this.inverse) {
            options.inverse = this._compileContent(scope, this.inverse);
        }

        return options;
    }

    /**
     * @param {string|null} scope
     * @param {TemplateNode} content
     * 
     * @returns {string}
     * @private
     */
    _compileContent(scope, content) {
        if (scope) {
            return this.env.scope({scope}, () => {
                return `function(${scope}){return ${content.compile()}}`
            });
        } else {
            return `function(){return ${content.compile()}}`;
        }
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