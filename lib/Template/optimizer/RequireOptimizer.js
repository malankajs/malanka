import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';
import {TemplateNodeRequire} from '../nodes/TemplateNodeRequire';

export class RequireOptimizer extends TemplateOptimizerPlugin {
    
    onTemplateNodeHelper(node) {
        if (node.path.original === 'require') {
            return TemplateNodeRequire.factory(node.params[0].nodes[0], node.env);
        }
    }
    
}