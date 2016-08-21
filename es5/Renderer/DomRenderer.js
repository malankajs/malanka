'use strict';

exports.__esModule = true;
exports.DomRenderer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Renderer2 = require('./Renderer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DomRenderer = exports.DomRenderer = function (_Renderer) {
    (0, _inherits3.default)(DomRenderer, _Renderer);

    function DomRenderer() {
        (0, _classCallCheck3.default)(this, DomRenderer);
        return (0, _possibleConstructorReturn3.default)(this, _Renderer.apply(this, arguments));
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} tagName
     *
     * @returns {Element}
     */
    DomRenderer.prototype.createElement = function createElement(tagName) {
        return document.createElement(tagName);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @params {string} content
     *
     * @returns {Element}
     */


    DomRenderer.prototype.createTextNode = function createTextNode(content) {
        return document.createTextNode(String(content));
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {string} name
     * @param {string} value
     */


    DomRenderer.prototype.setAttribute = function setAttribute(node, name, value) {
        if (name === 'value') {
            node.value = String(value);
        }

        node.setAttribute(name, String(value));
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {string} content
     */


    DomRenderer.prototype.setContent = function setContent(node, content) {
        node.textContent = String(content);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {Element} child
     */


    DomRenderer.prototype.append = function append(node, child) {
        node.appendChild(child);
    };

    /**
     * @param {Element} node
     * @param {Element} child
     * @param {number} index
     */


    DomRenderer.prototype.appendAt = function appendAt(node, child, index) {
        var before = node.childNodes[index];

        if (before) {
            node.insertBefore(child, before);
        } else {
            this.append(node, child);
        }
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} node
     * @param {Element} child
     */


    DomRenderer.prototype.removeChild = function removeChild(node, child) {
        if (child.parentNode) {
            child.parentNode.removeChild(child);
        }
    };

    /**
     * @param {Element} node
     */


    DomRenderer.prototype.clear = function clear(node) {
        this.setContent(node, '');
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Element} element
     * @param {string} name
     * @param {function} value
     * @param {{}} [options]
     */


    DomRenderer.prototype.addEventListener = function addEventListener(element, name, value, options) {
        element.addEventListener(name, value, options);
    };

    return DomRenderer;
}(_Renderer2.Renderer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SZW5kZXJlci9Eb21SZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRWEsVyxXQUFBLFc7Ozs7Ozs7O0FBRVQ7QUFDQTs7Ozs7MEJBS0EsYSwwQkFBYyxPLEVBQVM7QUFDbkIsZUFBTyxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNILEs7O0FBRUQ7QUFDQTs7Ozs7OzswQkFLQSxjLDJCQUFlLE8sRUFBUztBQUNwQixlQUFPLFNBQVMsY0FBVCxDQUF3QixPQUFPLE9BQVAsQ0FBeEIsQ0FBUDtBQUNILEs7O0FBRUQ7QUFDQTs7Ozs7OzswQkFLQSxZLHlCQUFhLEksRUFBTSxJLEVBQU0sSyxFQUFPO0FBQzVCLFlBQUksU0FBUyxPQUFiLEVBQXNCO0FBQ2xCLGlCQUFLLEtBQUwsR0FBYSxPQUFPLEtBQVAsQ0FBYjtBQUNIOztBQUVELGFBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixPQUFPLEtBQVAsQ0FBeEI7QUFDSCxLOztBQUVEO0FBQ0E7Ozs7OzswQkFJQSxVLHVCQUFXLEksRUFBTSxPLEVBQVM7QUFDdEIsYUFBSyxXQUFMLEdBQW1CLE9BQU8sT0FBUCxDQUFuQjtBQUNILEs7O0FBRUQ7QUFDQTs7Ozs7OzBCQUlBLE0sbUJBQU8sSSxFQUFNLEssRUFBTztBQUNoQixhQUFLLFdBQUwsQ0FBaUIsS0FBakI7QUFDSCxLOztBQUVEOzs7Ozs7OzBCQUtBLFEscUJBQVMsSSxFQUFNLEssRUFBTyxLLEVBQU87QUFDekIsWUFBSSxTQUFTLEtBQUssVUFBTCxDQUFnQixLQUFoQixDQUFiOztBQUVBLFlBQUksTUFBSixFQUFZO0FBQ1IsaUJBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixNQUF6QjtBQUNILFNBRkQsTUFFTztBQUNILGlCQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCO0FBQ0g7QUFDSixLOztBQUVEO0FBQ0E7Ozs7OzswQkFJQSxXLHdCQUFZLEksRUFBTSxLLEVBQU87QUFDckIsWUFBSSxNQUFNLFVBQVYsRUFBc0I7QUFDbEIsa0JBQU0sVUFBTixDQUFpQixXQUFqQixDQUE2QixLQUE3QjtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7MEJBR0EsSyxrQkFBTSxJLEVBQU07QUFDUixhQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBdEI7QUFDSCxLOztBQUVEO0FBQ0E7Ozs7Ozs7OzBCQU1BLGdCLDZCQUFpQixPLEVBQVMsSSxFQUFNLEssRUFBTyxPLEVBQVM7QUFDNUMsZ0JBQVEsZ0JBQVIsQ0FBeUIsSUFBekIsRUFBK0IsS0FBL0IsRUFBc0MsT0FBdEM7QUFDSCxLIiwiZmlsZSI6IkRvbVJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi9SZW5kZXJlcic7XG5cbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMge0VsZW1lbnR9XG4gICAgICovXG4gICAgY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW1zIHtzdHJpbmd9IGNvbnRlbnRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtFbGVtZW50fVxuICAgICAqL1xuICAgIGNyZWF0ZVRleHROb2RlKGNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjb250ZW50KSk7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgc2V0QXR0cmlidXRlKG5vZGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgICAqL1xuICAgIHNldENvbnRlbnQobm9kZSwgY29udGVudCkge1xuICAgICAgICBub2RlLnRleHRDb250ZW50ID0gU3RyaW5nKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGNoaWxkXG4gICAgICovXG4gICAgYXBwZW5kKG5vZGUsIGNoaWxkKSB7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gY2hpbGRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBhcHBlbmRBdChub2RlLCBjaGlsZCwgaW5kZXgpIHtcbiAgICAgICAgbGV0IGJlZm9yZSA9IG5vZGUuY2hpbGROb2Rlc1tpbmRleF07XG5cbiAgICAgICAgaWYgKGJlZm9yZSkge1xuICAgICAgICAgICAgbm9kZS5pbnNlcnRCZWZvcmUoY2hpbGQsIGJlZm9yZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZChub2RlLCBjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBjaGlsZFxuICAgICAqL1xuICAgIHJlbW92ZUNoaWxkKG5vZGUsIGNoaWxkKSB7XG4gICAgICAgIGlmIChjaGlsZC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZVxuICAgICAqL1xuICAgIGNsZWFyKG5vZGUpIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50KG5vZGUsICcnKTtcbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7e319IFtvcHRpb25zXVxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIHZhbHVlLCBvcHRpb25zKTtcbiAgICB9XG5cbn0iXX0=