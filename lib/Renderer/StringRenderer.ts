import {Renderer} from './Renderer';
import {ValueProxy} from '../Data/ValueProxy';
import {escape, escapeAttribute} from '../utils';

const SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'];

export class StringNode {
    public attributes:Object;
    public tagName:string;
    public children:StringNode[];
    public content:string;

    protected replaceNode:StringNode;

    constructor(tagName = null) {
        this.attributes = {};
        this.tagName = tagName;
        this.children = [];
        this.content = undefined;
    }

    /**
     * @returns {[]}
     */
    public renderAttributes() {
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
    public renderContent() {
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
    public replaceWith(node) {
        this.replaceNode = node;
    }

    /**
     * @returns {string}
     */
    public toString() {
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

export class CommentNode {
    protected replaceNode:StringNode;

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

    /**
     * @param {string} tagName
     *
     * @returns {StringNode}
     */
    public createElement(tagName) {
        return new StringNode(tagName);
    }
    
    /**
     * @returns {CommentNode}
     */
    public createComment() {
        return new CommentNode();
    }

    /**
     * @returns {StringNode}
     */
    public createTextNode() {
        return new StringNode();
    }

    /**
     * @param {StringNode} node
     * @param {string} name
     * @param {string} value
     */
    public setAttribute(node, name, value) {
        if (value instanceof ValueProxy) {
            value = value.getValue();
        }

        if (value != null) {
            node.attributes[name] = String(value);
        }
    }

    /**
     * @param {StringNode} node
     * @param {string} content
     */
    public setContent(node, content) {
        node.content = content;
    }

    /**
     * @param {StringNode} node
     * @param {StringNode} child
     */
    public append(node, child) {
        node.children.push(child);
    }

    /**
     * @param {StringNode} node
     * @param {StringNode} child
     * @param {number} index
     */
    public appendAt(node, child, index) {
        node.children.splice(index, 0, child);
    }

    /**
     * @param {StringNode} node
     */
    public clear(node) {
        node.content = undefined;
        node.children = [];
    }

    public addEventListener() {
    }

    public removeChild() {
    }

    /**
     * @param {StringNode|CommentNode} oldNode
     * @param {StringNode|CommentNode} newNode
     */
    public replaceWith(oldNode, newNode) {
        oldNode.replaceWith(newNode);
    }

}
