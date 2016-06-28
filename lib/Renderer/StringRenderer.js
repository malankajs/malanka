import {Renderer} from './Renderer';
import {escape} from '../utils';

export class StringNode {

    constructor(tagName = null) {
        this.attributes = {};
        this.tagName = tagName;
        this.children = [];
    }

    /**
     * @returns {[]}
     */
    renderAttributes() {
        let attributes = this.attributes;

        if (attributes) {
            return Object.keys(attributes).map(key => {
                return `${escape(key)}="${escape(attributes[key])}"`
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
            return this.content;
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

    /**
     * @param {string} tagName
     *
     * @returns {StringNode}
     */
    createElement(tagName) {
        return new StringNode(tagName);
    }

    /**
     * @returns {StringNode}
     */
    createTextNode() {
        return new StringNode();
    }

    /**
     * @param {StringNode} node
     * @param {string} name
     * @param {string} value
     */
    setAttribute(node, name, value) {
        node.attributes[name] = value;
    }

    /**
     * @param {StringNode} node
     * @param {string} content
     */
    setContent(node, content) {
        node.content = content;
    }

    /**
     * @param {StringNode} node
     * @param {StringNode} child
     */
    append(node, child) {
        node.children.push(child);
    }

    /**
     * @param {StringNode} node
     */
    clear(node) {
        node.content = undefined;
        node.children = [];
    }

    addEventListener() {
    }

}