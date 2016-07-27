import {Renderer} from './Renderer';
import {escape, escapeAttribute} from '../utils';

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
     * @returns {string}
     */
    toString() {
        let tagName = this.tagName;

        if (tagName) {
            let attributesArray = this.renderAttributes();

            let html = `<${tagName}${attributesArray.length ? ' ' + attributesArray.join(' ') : ''}>`;
            html += this.renderContent();
            return html + `</${tagName}>`;
        } else {
            return String(this.renderContent()) || ' ';
        }
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
        node.attributes[name] = value;
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

}