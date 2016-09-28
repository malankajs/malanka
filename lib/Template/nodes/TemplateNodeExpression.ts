import {TemplateNodeVar} from './TemplateNodeVar';
import {TemplateNodeHelper} from './TemplateNodeHelper';
import {TemplateNodeBlockHelper} from './TemplateNodeBlockHelper';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeExpression {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */
    static factory(node, env:TemplateEnvironment) {
        let convert = {
            path: env.factoryPath(node.path),
            params: node.params || [],
            hash: node.hash || [],
            content: node.content,
            inverse: node.inverse
        };

        if (convert.hash.length || convert.params.length || convert.content || convert.inverse) {
            if (convert.content || convert.inverse) {
                return TemplateNodeBlockHelper.factory(convert, env);
            } else{
                return TemplateNodeHelper.factory(convert, env);
            }
        }

        return TemplateNodeVar.factory(convert, env);
    }

}
