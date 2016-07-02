import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeComponent} from '../nodes/TemplateNodeComponent';
import {TemplateNodeComment} from '../nodes/TemplateNodeComment';

export class TrimSpacesOptimizer extends TemplateOptimizerPlugin {

    isEmpty(node) {
        return node instanceof TemplateNodeString && node.string.trim() === '';
    }

    isComponent(node) {
        return node instanceof TemplateNodeComponent;
    }

    trimComments(nodes) {
        while (nodes.length && nodes[0] instanceof TemplateNodeComment) {
            nodes.shift();
        }

        while (nodes.length && nodes[nodes.length - 1] instanceof TemplateNodeComment) {
            nodes.pop();
        }

        return nodes;
    }

    onTemplateNodeComponent(node) {
        var saveSpaces = node.getAttribute('saveSpaces');

        if (saveSpaces) {
            node.content.saveSpaces = true;
        }
    }

    onTemplateNodeContent(node) {
        node.nodes = this.trimComments(node.nodes);

        if (node.nodes.length > 1 && !node.saveSpaces) {
            if (this.isEmpty(node.nodes[0]) && this.isComponent(node.nodes[1])) {
                node.nodes = node.nodes.slice(1);
            }

            let len = node.nodes.length;

            if (this.isEmpty(node.nodes[len - 1]) && this.isComponent(node.nodes[len - 2])) {
                node.nodes = node.nodes.slice(0, -1);
            }
        }
    }

    onTemplateNodeString(node, parents) {
        let saveSpaces = parents.some(node => node.saveSpaces);

        if (!saveSpaces) {
            node.string = node.string.replace(/[ \t\r\n]+/g, ' ');
        }
    }

}