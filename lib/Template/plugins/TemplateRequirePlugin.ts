import {TemplatePlugin} from './TemplatePlugin';
import {TemplateNodeRequire} from '../nodes/TemplateNodeRequire';
import {TemplateNodeHelper} from '../nodes/TemplateNodeHelper';

export class TemplateRequirePlugin extends TemplatePlugin {

    /**
     * @param {TemplateNodeHelper} node
     *
     * @returns {TemplateNodeRequire|TemplateNodeHelper}
     */
    onTemplateNodeHelper(node) {
        if (node.path.original === 'require') {
            return TemplateNodeRequire.factory(node.params[0].nodes[0], node.env);
        }
    }
    
}
