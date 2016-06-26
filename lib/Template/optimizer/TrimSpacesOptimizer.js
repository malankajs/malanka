import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeComponent} from '../nodes/TemplateNodeComponent';

export class TrimSpacesOptimizer extends TemplateOptimizerPlugin {

    isEmpty(node) {
        return node instanceof TemplateNodeString && node.string.trim() === '';
    }

    isComponent(node) {
        return node instanceof TemplateNodeComponent;
    }

    onTemplateNodeContent(node) {
        if (node.nodes.length > 1) {
            if (this.isEmpty(node.nodes[0]) && this.isComponent(node.nodes[1])) {
                node.nodes = node.nodes.slice(1);
            }

            let len = node.nodes.length;

            if (this.isEmpty(node.nodes[len - 1]) && this.isComponent(node.nodes[len - 2])) {
                node.nodes = node.nodes.slice(0, -1);
            }
        }
    }

    onTemplateNodeString(node) {
        node.string = node.string.replace(/[ \t\r\n]+/g, ' ');
    }

}