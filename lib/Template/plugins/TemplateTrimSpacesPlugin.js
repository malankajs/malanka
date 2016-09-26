import {TemplatePlugin} from './TemplatePlugin';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeComponent} from '../nodes/TemplateNodeComponent';
import {TemplateNodeComment} from '../nodes/TemplateNodeComment';
import {TemplateNodeHelper} from '../nodes/TemplateNodeHelper';
import {TemplateNodeEscapedString} from '../nodes/TemplateNodeEscapedString';
import {TemplateNodeTemplate} from '../nodes/TemplateNodeTemplate';

export class TemplateTrimSpacesPlugin extends TemplatePlugin {

    //noinspection JSMethodCanBeStatic
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
            (node instanceof TemplateNodeHelper) ||
            (node instanceof TemplateNodeEscapedString);
    }

    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */
    isInlineTemplate(node) {
        return node instanceof TemplateNodeTemplate;
    }

    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */
    isString(node) {
        return node instanceof TemplateNodeString;
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */
    trimComments(nodes) {
        return nodes.filter(node => !(node instanceof TemplateNodeComment));
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

            let accept = component => this.isComponent(component) || this.isInlineTemplate(component);

            if (!(this.isEmpty(node) && accept(prev) && accept(next))) {
                result.push(node);
            }
        }

        return result;
    }

    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */
    dropEmpty(nodes) {
        return nodes.filter(node => !this.isString(node) || node.string.length > 0);
    }

    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */
    mergeStrings(nodes) {
        let result = [],
            buffer;

        nodes.forEach(node => {
            let isString = node instanceof TemplateNodeString,
                isEscaped = node instanceof TemplateNodeEscapedString;

            if (isString || isEscaped) {
                if (buffer) {
                    if (isEscaped) {
                        buffer += node.content;
                    } else if (isString) {
                        buffer += node.string;
                    }
                } else {
                    if (isEscaped) {
                        buffer = node.content;
                    } else if (isString) {
                        buffer = node.string;
                    }
                }
            } else {
                if (buffer) {
                    result.push(TemplateNodeEscapedString.factory({content: buffer}, node.env));
                    buffer = null;
                }

                result.push(node);
            }
        });

        if (buffer) {
            result.push(TemplateNodeEscapedString.factory({content: buffer}, nodes[0].env));
        }

        return result;
    }

    //noinspection JSMethodCanBeStatic
    onTemplateNodeComponent(node) {
        var saveSpaces = node.getAttribute('saveSpaces');

        if (saveSpaces) {
            node.removeAttribute('saveSpaces');
            node.content.saveSpaces = true;
        }
    }

    /**
     * @param {TemplateNodeContent} node
     */
    onTemplateNodeContent(node) {
        node.nodes = this.trimComments(node.nodes);

        let templates = node.nodes.filter(node => this.isInlineTemplate(node));
        node.nodes = node.nodes.filter(node => !this.isInlineTemplate(node));

        if (node.nodes.length > 1 && !node.saveSpaces) {
            let accept = component => this.isComponent(component) || this.isEmpty(component);

            // trim begin
            if (this.isEmpty(node.nodes[0]) && accept(node.nodes[1])) {
                node.nodes = node.nodes.slice(1);
            }

            // trim end
            let len = node.nodes.length;

            if (this.isEmpty(node.nodes[len - 1]) && accept(node.nodes[len - 2])) {
                node.nodes = node.nodes.slice(0, -1);
            }

            // trim inside
            node.nodes = this.trimInside(node.nodes);
        }

        if (node.nodes.length > 0 && !node.saveSpaces) {
            // for strings at begin trim begin spaces
            if (this.isString(node.nodes[0])) {
                node.nodes[0].string = node.nodes[0].string.replace(/^[ \t\r\n]+/, '');
            }

            let last = node.nodes.length - 1;
            // for strings at end trim end spaces
            if (this.isString(node.nodes[last])) {
                node.nodes[last].string = node.nodes[last].string.replace(/[ \t\r\n]+$/, '');
            }

            node.nodes = this.dropEmpty(node.nodes);
        }

        node.nodes = this.mergeStrings(node.nodes);
        node.nodes = templates.concat(node.nodes);
    }

    /**
     * @param {TemplateNodeString} node
     * @param {TemplateNode[]} parents
     */
    onTemplateNodeString(node, parents) {
        let saveSpaces = parents.some(node => node.saveSpaces);

        if (!saveSpaces) {
            node.string = node.string.replace(/[ \t\r\n]+/g, ' ');
        }
    }

}
