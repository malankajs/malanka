import {Renderer} from './Renderer';
import {ValueProxy} from '../Data/ValueProxy';

export class DomRenderer extends Renderer {

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} tagName
     *
     * @returns {Element}
     */
    createElement(tagName) {
        return document.createElement(tagName);
    }

    /**
     * @returns {Comment}
     */
    createComment() {
        return document.createComment('');
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @params {string} content
     *
     * @returns {Element}
     */
    createTextNode(content) {
        return document.createTextNode(String(content));
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {string} name
     * @param {string} value
     */
    setAttribute(node, name, value) {
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

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {string} content
     */
    setContent(node, content) {
        node.textContent = String(content);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {Element} child
     */
    append(node, child) {
        node.appendChild(child);
    }

    /**
     * @param {Element} node
     * @param {Element} child
     * @param {number} index
     */
    appendAt(node, child, index) {
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
    removeChild(node, child) {
        if (child.parentNode) {
            child.parentNode.removeChild(child);
        }
    }

    /**
     * @param {Element} node
     */
    clear(node) {
        this.setContent(node, '');
    }

    /**
     * @param {Element} oldNode
     * @param {Element} newNode
     */
    replaceWith(oldNode, newNode) {
        if (!oldNode || !newNode || oldNode === newNode) {
            return;
        }

        let parent = oldNode.parentNode;
        
        if (parent) {
            parent.insertBefore(newNode, oldNode);
            parent.removeChild(oldNode);
        }
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} element
     * @param {string} name
     * @param {function} value
     * @param {{}} [options]
     */
    addEventListener(element, name, value, options) {
        element.addEventListener(name, value, options);
    }

}
