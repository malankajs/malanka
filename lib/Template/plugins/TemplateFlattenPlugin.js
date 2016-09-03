import {TemplatePlugin} from './TemplatePlugin';

import {TemplateNodeStringProxy} from '../nodes/TemplateNodeStringProxy';

export class TemplateFlattenPlugin extends TemplatePlugin {

    /**
     * @param {TemplateNodeContent} node
     *
     * @returns {TemplateNodeContent}
     */
    onTemplateNodeContent(node) {
        node.nodes = this.flattenNodes(node.nodes);

        return node;
    }

    /**
     * @param {TemplateNode[]} nodes
     * @returns {TemplateNode[]}
     */
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
