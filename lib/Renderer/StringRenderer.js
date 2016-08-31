import {Renderer} from './Renderer';
import {ValueProxy} from '../Data/ValueProxy';
import {escape, escapeAttribute} from '../utils';

const SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source']

export class StringNode {

    constructor(tagName = null) {
        this.attributes = {};
        this.tagName = tagName;
        this.children = [];
        this.content = undefined;
    }

    /**
     * @returns {[]}
     */
    renderAttributes() {
        let attributes = this.attributes;

        if (attributes) {
            return Object.keys(attributes).map(key => {
                return `${escapeAttribute(key)}="${escapeAttribute(attributes[key])}"`
            });
        } else {
            return [];
        }
    }

    /**
     * @returns {string}
     */
    renderContent() {
        if (this.content !== undefined) {
            return escape(this.content);
        }

        if (this.children.length) {
            return this.children.join('');
        }

        return '';
    }

    /**
     * @param node
     */
    replaceWith(node) {
        this.replaceNode = node;
    }

    /**
     * @returns {string}
     */
    toString() {
        if (this.replaceNode) {
            return this.replaceNode.toString();
        }

        let tagName = this.tagName;

        if (tagName) {
            let attributesArray = this.renderAttributes();

            let html = `<${tagName}${attributesArray.length ? ' ' + attributesArray.join(' ') : ''}>`;

            if (!this.content && SELF_CLOSING_TAGS.indexOf(tagName) > -1) {
                return html;
            }

            html += this.renderContent();
            return html + `</${tagName}>`;
        } else {
            return String(this.renderContent()) || ' ';
        }
    }

}

class CommentNode {

    /**
     * @param node
     */
    replaceWith(node) {
        this.replaceNode = node;
    }

    /**
     * @returns {string}
     */
    toString() {
        if (this.replaceNode) {
            return this.replaceNode.toString();
        }

        return '<!---->';
    }

}

export class StringRenderer extends Renderer {

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} tagName
     *
     * @returns {StringNode}
     */
    createElement(tagName) {
        return new StringNode(tagName);
    }
    
    //noinspection JSMethodCanBeStatic
    /**
     * @returns {CommentNode}
     */
    createComment() {
        return new CommentNode();
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @returns {StringNode}
     */
    createTextNode() {
        return new StringNode();
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {string} name
     * @param {string} value
     */
    setAttribute(node, name, value) {
        if (value instanceof ValueProxy) {
            value = value.getValue();
        }

        if (value != null) {
            node.attributes[name] = String(value);
        }
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {string} content
     */
    setContent(node, content) {
        node.content = content;
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {StringNode} child
     */
    append(node, child) {
        node.children.push(child);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {StringNode} child
     * @param {number} index
     */
    appendAt(node, child, index) {
        node.children.splice(index, 0, child);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     */
    clear(node) {
        node.content = undefined;
        node.children = [];
    }

    addEventListener() {
    }

    removeChild() {
    }

    /**
     * @param {StringNode|CommentNode} oldNode
     * @param {StringNode|CommentNode} newNode
     */
    replaceWith(oldNode, newNode) {
        oldNode.replaceWith(newNode);
    }

}
