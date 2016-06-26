import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';

import {TemplateNodeStringProxy} from '../nodes/TemplateNodeStringProxy';

export class FlattenOptimizer extends TemplateOptimizerPlugin {

    onTemplateNodeContent(node) {
        node.nodes = this.flattenNodes(node.nodes);

        return node;
    }

    flattenNodes(nodes) {
        let result = [];

        nodes.forEach(node => {
            if (node instanceof TemplateNodeStringProxy) {
                result = result.concat(this.flattenNodes(node.content.nodes));
            } else {
                result.push(node);
            }
        });

        return result;
    }

}