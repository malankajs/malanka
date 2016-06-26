import {Renderer} from './Renderer';

export class DomRenderer extends Renderer {

    /**
     * @param {string} tagName
     *
     * @returns {Element}
     */
    createElement(tagName) {
        return document.createElement(tagName);
    }

    /**
     * @params {string} content
     *
     * @returns {Element}
     */
    createTextNode(content) {
        return document.createTextNode(String(content));
    }

    /**
     * @param {Element} node
     * @param {string} name
     * @param {string} value
     */
    setAttribute(node, name, value) {
        if (name === 'value') {
            node.value = String(value);
        }

        node.setAttribute(name, String(value));
    }

    /**
     * @param {Element} node
     * @param {string} content
     */
    setContent(node, content) {
        node.textContent = String(content);
    }

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
     */
    removeChild(node, child) {
        node.removeChild(child);
    }

    /**
     * @param {Element} node
     */
    clear(node) {
        this.setContent(node, '');
    }

    /**
     * @param {Element} element
     * @param {string} name
     * @param {function} value
     */
    addEventListener(element, name, value, options) {
        element.addEventListener(name, value, options);
    }

}