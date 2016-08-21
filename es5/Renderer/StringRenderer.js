'use strict';

exports.__esModule = true;
exports.StringRenderer = exports.StringNode = undefined;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Renderer2 = require('./Renderer');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringNode = exports.StringNode = function () {
    function StringNode() {
        var tagName = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        (0, _classCallCheck3.default)(this, StringNode);

        this.attributes = {};
        this.tagName = tagName;
        this.children = [];
        this.content = undefined;
    }

    /**
     * @returns {[]}
     */


    StringNode.prototype.renderAttributes = function renderAttributes() {
        var attributes = this.attributes;

        if (attributes) {
            return Object.keys(attributes).map(function (key) {
                return (0, _utils.escapeAttribute)(key) + '="' + (0, _utils.escapeAttribute)(attributes[key]) + '"';
            });
        } else {
            return [];
        }
    };

    /**
     * @returns {string}
     */


    StringNode.prototype.renderContent = function renderContent() {
        if (this.content !== undefined) {
            return (0, _utils.escape)(this.content);
        }

        if (this.children.length) {
            return this.children.join('');
        }

        return '';
    };

    /**
     * @returns {string}
     */


    StringNode.prototype.toString = function toString() {
        var tagName = this.tagName;

        if (tagName) {
            var attributesArray = this.renderAttributes();

            var html = '<' + tagName + (attributesArray.length ? ' ' + attributesArray.join(' ') : '') + '>';
            html += this.renderContent();
            return html + ('</' + tagName + '>');
        } else {
            return String(this.renderContent()) || ' ';
        }
    };

    return StringNode;
}();

var StringRenderer = exports.StringRenderer = function (_Renderer) {
    (0, _inherits3.default)(StringRenderer, _Renderer);

    function StringRenderer() {
        (0, _classCallCheck3.default)(this, StringRenderer);
        return (0, _possibleConstructorReturn3.default)(this, _Renderer.apply(this, arguments));
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} tagName
     *
     * @returns {StringNode}
     */
    StringRenderer.prototype.createElement = function createElement(tagName) {
        return new StringNode(tagName);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @returns {StringNode}
     */


    StringRenderer.prototype.createTextNode = function createTextNode() {
        return new StringNode();
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {string} name
     * @param {string} value
     */


    StringRenderer.prototype.setAttribute = function setAttribute(node, name, value) {
        node.attributes[name] = value;
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {string} content
     */


    StringRenderer.prototype.setContent = function setContent(node, content) {
        node.content = content;
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {StringNode} child
     */


    StringRenderer.prototype.append = function append(node, child) {
        node.children.push(child);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     * @param {StringNode} child
     * @param {number} index
     */


    StringRenderer.prototype.appendAt = function appendAt(node, child, index) {
        node.children.splice(index, 0, child);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {StringNode} node
     */


    StringRenderer.prototype.clear = function clear(node) {
        node.content = undefined;
        node.children = [];
    };

    StringRenderer.prototype.addEventListener = function addEventListener() {};

    StringRenderer.prototype.removeChild = function removeChild() {};

    return StringRenderer;
}(_Renderer2.Renderer);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SZW5kZXJlci9TdHJpbmdSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0lBRWEsVSxXQUFBLFU7QUFFVCwwQkFBNEI7QUFBQSxZQUFoQixPQUFnQix5REFBTixJQUFNO0FBQUE7O0FBQ3hCLGFBQUssVUFBTCxHQUFrQixFQUFsQjtBQUNBLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLE9BQUwsR0FBZSxTQUFmO0FBQ0g7O0FBRUQ7Ozs7O3lCQUdBLGdCLCtCQUFtQjtBQUNmLFlBQUksYUFBYSxLQUFLLFVBQXRCOztBQUVBLFlBQUksVUFBSixFQUFnQjtBQUNaLG1CQUFPLE9BQU8sSUFBUCxDQUFZLFVBQVosRUFBd0IsR0FBeEIsQ0FBNEIsZUFBTztBQUN0Qyx1QkFBVSw0QkFBZ0IsR0FBaEIsQ0FBVixVQUFtQyw0QkFBZ0IsV0FBVyxHQUFYLENBQWhCLENBQW5DO0FBQ0gsYUFGTSxDQUFQO0FBR0gsU0FKRCxNQUlPO0FBQ0gsbUJBQU8sRUFBUDtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7eUJBR0EsYSw0QkFBZ0I7QUFDWixZQUFJLEtBQUssT0FBTCxLQUFpQixTQUFyQixFQUFnQztBQUM1QixtQkFBTyxtQkFBTyxLQUFLLE9BQVosQ0FBUDtBQUNIOztBQUVELFlBQUksS0FBSyxRQUFMLENBQWMsTUFBbEIsRUFBMEI7QUFDdEIsbUJBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixFQUFuQixDQUFQO0FBQ0g7O0FBRUQsZUFBTyxFQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7eUJBR0EsUSx1QkFBVztBQUNQLFlBQUksVUFBVSxLQUFLLE9BQW5COztBQUVBLFlBQUksT0FBSixFQUFhO0FBQ1QsZ0JBQUksa0JBQWtCLEtBQUssZ0JBQUwsRUFBdEI7O0FBRUEsZ0JBQUksYUFBVyxPQUFYLElBQXFCLGdCQUFnQixNQUFoQixHQUF5QixNQUFNLGdCQUFnQixJQUFoQixDQUFxQixHQUFyQixDQUEvQixHQUEyRCxFQUFoRixPQUFKO0FBQ0Esb0JBQVEsS0FBSyxhQUFMLEVBQVI7QUFDQSxtQkFBTyxlQUFZLE9BQVosT0FBUDtBQUNILFNBTkQsTUFNTztBQUNILG1CQUFPLE9BQU8sS0FBSyxhQUFMLEVBQVAsS0FBZ0MsR0FBdkM7QUFDSDtBQUNKLEs7Ozs7O0lBSVEsYyxXQUFBLGM7Ozs7Ozs7O0FBRVQ7QUFDQTs7Ozs7NkJBS0EsYSwwQkFBYyxPLEVBQVM7QUFDbkIsZUFBTyxJQUFJLFVBQUosQ0FBZSxPQUFmLENBQVA7QUFDSCxLOztBQUVEO0FBQ0E7Ozs7OzZCQUdBLGMsNkJBQWlCO0FBQ2IsZUFBTyxJQUFJLFVBQUosRUFBUDtBQUNILEs7O0FBRUQ7QUFDQTs7Ozs7Ozs2QkFLQSxZLHlCQUFhLEksRUFBTSxJLEVBQU0sSyxFQUFPO0FBQzVCLGFBQUssVUFBTCxDQUFnQixJQUFoQixJQUF3QixLQUF4QjtBQUNILEs7O0FBRUQ7QUFDQTs7Ozs7OzZCQUlBLFUsdUJBQVcsSSxFQUFNLE8sRUFBUztBQUN0QixhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0gsSzs7QUFFRDtBQUNBOzs7Ozs7NkJBSUEsTSxtQkFBTyxJLEVBQU0sSyxFQUFPO0FBQ2hCLGFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkI7QUFDSCxLOztBQUVEO0FBQ0E7Ozs7Ozs7NkJBS0EsUSxxQkFBUyxJLEVBQU0sSyxFQUFPLEssRUFBTztBQUN6QixhQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLEVBQTRCLENBQTVCLEVBQStCLEtBQS9CO0FBQ0gsSzs7QUFFRDtBQUNBOzs7Ozs2QkFHQSxLLGtCQUFNLEksRUFBTTtBQUNSLGFBQUssT0FBTCxHQUFlLFNBQWY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDSCxLOzs2QkFFRCxnQiwrQkFBbUIsQ0FDbEIsQzs7NkJBRUQsVywwQkFBYyxDQUNiLEMiLCJmaWxlIjoiU3RyaW5nUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7ZXNjYXBlLCBlc2NhcGVBdHRyaWJ1dGV9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIFN0cmluZ05vZGUge1xuXG4gICAgY29uc3RydWN0b3IodGFnTmFtZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgIHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtbXX1cbiAgICAgKi9cbiAgICByZW5kZXJBdHRyaWJ1dGVzKCkge1xuICAgICAgICBsZXQgYXR0cmlidXRlcyA9IHRoaXMuYXR0cmlidXRlcztcblxuICAgICAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtlc2NhcGVBdHRyaWJ1dGUoa2V5KX09XCIke2VzY2FwZUF0dHJpYnV0ZShhdHRyaWJ1dGVzW2tleV0pfVwiYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVzY2FwZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5qb2luKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgdGFnTmFtZSA9IHRoaXMudGFnTmFtZTtcblxuICAgICAgICBpZiAodGFnTmFtZSkge1xuICAgICAgICAgICAgbGV0IGF0dHJpYnV0ZXNBcnJheSA9IHRoaXMucmVuZGVyQXR0cmlidXRlcygpO1xuXG4gICAgICAgICAgICBsZXQgaHRtbCA9IGA8JHt0YWdOYW1lfSR7YXR0cmlidXRlc0FycmF5Lmxlbmd0aCA/ICcgJyArIGF0dHJpYnV0ZXNBcnJheS5qb2luKCcgJykgOiAnJ30+YDtcbiAgICAgICAgICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gICAgICAgICAgICByZXR1cm4gaHRtbCArIGA8LyR7dGFnTmFtZX0+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodGhpcy5yZW5kZXJDb250ZW50KCkpIHx8ICcgJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmdOb2RlfVxuICAgICAqL1xuICAgIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSkge1xuICAgICAgICByZXR1cm4gbmV3IFN0cmluZ05vZGUodGFnTmFtZSk7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmdOb2RlfVxuICAgICAqL1xuICAgIGNyZWF0ZVRleHROb2RlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFN0cmluZ05vZGUoKTtcbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmdOb2RlfSBub2RlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRBdHRyaWJ1dGUobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgbm9kZS5hdHRyaWJ1dGVzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nTm9kZX0gbm9kZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAgICovXG4gICAgc2V0Q29udGVudChub2RlLCBjb250ZW50KSB7XG4gICAgICAgIG5vZGUuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nTm9kZX0gbm9kZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nTm9kZX0gY2hpbGRcbiAgICAgKi9cbiAgICBhcHBlbmQobm9kZSwgY2hpbGQpIHtcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmdOb2RlfSBub2RlXG4gICAgICogQHBhcmFtIHtTdHJpbmdOb2RlfSBjaGlsZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIGFwcGVuZEF0KG5vZGUsIGNoaWxkLCBpbmRleCkge1xuICAgICAgICBub2RlLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0cmluZ05vZGV9IG5vZGVcbiAgICAgKi9cbiAgICBjbGVhcihub2RlKSB7XG4gICAgICAgIG5vZGUuY29udGVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xuICAgIH1cblxuICAgIGFkZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQoKSB7XG4gICAgfVxuXG59Il19