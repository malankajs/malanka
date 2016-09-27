import {Renderer} from './Renderer';
import {ValueProxy} from '../Data/ValueProxy';

export class DomRenderer extends Renderer {

    /**
     * @param {string} tagName
     *
     * @returns {Element}
     */
    public createElement(tagName) {
        return document.createElement(tagName);
    }

    /**
     * @returns {Comment}
     */
    public createComment() {
        return document.createComment('');
    }

    /**
     * @params {string} content
     *
     * @returns {Element}
     */
    public createTextNode(content) {
        return document.createTextNode(String(content));
    }

    /**
     * @param {Element} node
     * @param {string} name
     * @param {string} value
     */
    public setAttribute(node, name, value) {
        if (name === 'value') {
            node.value = String(value);
        }

        if (value instanceof ValueProxy) {
            value = value.getValue();
        }

        if (value == null) {
            node.removeAttribute(name);
        } else {
            node.setAttribute(name, String(value));
        }
    }

    /**
     * @param {Element} node
     * @param {string} content
     */
    public setContent(node, content) {
        node.textContent = String(content);
    }

    /**
     * @param {Element} node
     * @param {Element} child
     */
    public append(node, child) {
        node.appendChild(child);
    }

    /**
     * @param {Element} node
     * @param {Element} child
     * @param {number} index
     */
    public appendAt(node, child, index) {
        let before = node.childNodes[index];

        if (before) {
            node.insertBefore(child, before);
        } else {
            this.append(node, child);
        }
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {Element} child
     */
    public removeChild(node, child) {
        if (child.parentNode) {
            child.parentNode.removeChild(child);
        }
    }

    /**
     * @param {Element} node
     */
    public clear(node) {
        this.setContent(node, '');
    }

    /**
     * @param {Element} oldNode
     * @param {Element} newNode
     */
    public replaceWith(oldNode, newNode) {
        if (!oldNode || !newNode || oldNode === newNode) {
            return;
        }

        let parent = oldNode.parentNode;
        
        if (parent) {
            parent.insertBefore(newNode, oldNode);
            parent.removeChild(oldNode);
        }
    }

    /**
     * @param {Element} element
     * @param {string} name
     * @param {function} value
     * @param {{}} [options]
     */
    public addEventListener(element, name, value, options) {
        element.addEventListener(name, value, options);
    }

}
