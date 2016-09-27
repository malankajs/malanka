import {TemplateNode} from './TemplateNode';
import {TemplateNodeHelper} from './TemplateNodeHelper';
import {TemplateNodeString} from './TemplateNodeString';
import {TemplateNodeContent} from './TemplateNodeContent';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {TemplateNodeBlockHelperOptions} from '../../declarations';

export class TemplateNodeBlockHelper extends TemplateNodeHelper {
    protected content: TemplateNodeContent;
    protected inverse: TemplateNodeContent;

    /**
     * @returns {{hash: string}}
     */
    compileOptions():TemplateNodeBlockHelperOptions {
        let options = super.compileOptions() as TemplateNodeBlockHelperOptions,
            scopeValue = this.hash.getScope(),
            scope:string;

        if (scopeValue) {
            if (scopeValue instanceof TemplateNodeString) {
                scope = scopeValue.string;
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
     * @returns {[]}
     */
    compileTemplateContext() {
        let context = super.compileTemplateContext(),
            blockContext = ({} as TemplateNodeBlockHelperOptions);

        if (this.content) {
            blockContext.content = this.content.compile();
        }

        if (this.inverse) {
            blockContext.inverse = this.inverse.compile();
        }

        context.push(this.env.compileHash(blockContext));

        return context;
    }

    /**
     * @param {string|null} scope
     * @param {TemplateNode} content
     * 
     * @returns {string}
     * @private
     */
    protected _compileContent(scope:string, content:TemplateNode):string {
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
    static factory(node, env:TemplateEnvironment) {
        node.params = (node.params || []).map(param => env.factory(param || []));
        node.hash = env.factoryHashAttributes(node.hash || []);
        node.content = node.content && env.factoryContent(node.content);
        node.inverse = node.inverse && env.factoryContent(node.inverse);

        return new TemplateNodeBlockHelper(node, env);
    }

}
