import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeComponent} from '../nodes/TemplateNodeComponent';
import {TemplateNodeComment} from '../nodes/TemplateNodeComment';
import {TemplateNodeHelper} from "../nodes/TemplateNodeHelper";

export class TrimSpacesOptimizer extends TemplateOptimizerPlugin {

    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */
    isEmpty(node) {
        return node instanceof TemplateNodeString && node.string.trim() === '';
    }

    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */
    isNewLine(node) {
        return this.isEmpty(node) && node.string.indexOf('\n') > -1;
    }

    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */
    isComponent(node) {
        return (node instanceof TemplateNodeComponent) ||
            (node instanceof TemplateNodeHelper);
    }

    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */
    trimComments(nodes) {
        while (nodes.length && nodes[0] instanceof TemplateNodeComment) {
            nodes.shift();
        }

        while (nodes.length && nodes[nodes.length - 1] instanceof TemplateNodeComment) {
            nodes.pop();
        }

        return nodes;
    }

    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */
    trimInside(nodes) {
        let result = [];

        for (let index = 0; index < nodes.length; index++) {
            let node = nodes[index],
                prev = result[result.length - 1],
                next = nodes[index + 1];

            if (!(this.isNewLine(node) && this.isComponent(prev) && this.isComponent(next))) {
                result.push(node);
            }
        }

        return result;
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
            // trim begin
            if (this.isEmpty(node.nodes[0]) && this.isComponent(node.nodes[1])) {
                node.nodes = node.nodes.slice(1);
            }

            // trim end
            let len = node.nodes.length;

            if (this.isEmpty(node.nodes[len - 1]) && this.isComponent(node.nodes[len - 2])) {
                node.nodes = node.nodes.slice(0, -1);
            }

            // trim inside
            node.nodes = this.trimInside(node.nodes);
        }
    }

    onTemplateNodeString(node, parents) {
        let saveSpaces = parents.some(node => node.saveSpaces);

        if (!saveSpaces) {
            node.string = node.string.replace(/[ \t\r\n]+/g, ' ');
        }
    }

}