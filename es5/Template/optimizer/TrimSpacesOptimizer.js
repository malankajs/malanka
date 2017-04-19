'use strict';

exports.__esModule = true;
exports.TrimSpacesOptimizer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateOptimizerPlugin = require('./TemplateOptimizerPlugin');

var _TemplateNodeString = require('../nodes/TemplateNodeString');

var _TemplateNodeComponent = require('../nodes/TemplateNodeComponent');

var _TemplateNodeComment = require('../nodes/TemplateNodeComment');

var _TemplateNodeHelper = require('../nodes/TemplateNodeHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrimSpacesOptimizer = exports.TrimSpacesOptimizer = function (_TemplateOptimizerPlu) {
    (0, _inherits3.default)(TrimSpacesOptimizer, _TemplateOptimizerPlu);

    function TrimSpacesOptimizer() {
        (0, _classCallCheck3.default)(this, TrimSpacesOptimizer);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateOptimizerPlu.apply(this, arguments));
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */
    TrimSpacesOptimizer.prototype.isEmpty = function isEmpty(node) {
        return node instanceof _TemplateNodeString.TemplateNodeString && node.string.trim() === '';
    };

    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */


    TrimSpacesOptimizer.prototype.isNewLine = function isNewLine(node) {
        return this.isEmpty(node) && node.string.indexOf('\n') > -1;
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {TemplateNode} node
     * @returns {boolean}
     */


    TrimSpacesOptimizer.prototype.isComponent = function isComponent(node) {
        return node instanceof _TemplateNodeComponent.TemplateNodeComponent || node instanceof _TemplateNodeHelper.TemplateNodeHelper;
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */


    TrimSpacesOptimizer.prototype.trimComments = function trimComments(nodes) {
        while (nodes.length && nodes[0] instanceof _TemplateNodeComment.TemplateNodeComment) {
            nodes.shift();
        }

        while (nodes.length && nodes[nodes.length - 1] instanceof _TemplateNodeComment.TemplateNodeComment) {
            nodes.pop();
        }

        return nodes;
    };

    /**
     * @param {TemplateNode[]} nodes
     *
     * @returns {TemplateNode[]}
     */


    TrimSpacesOptimizer.prototype.trimInside = function trimInside(nodes) {
        var result = [];

        for (var index = 0; index < nodes.length; index++) {
            var node = nodes[index],
                prev = result[result.length - 1],
                next = nodes[index + 1];

            if (!(this.isEmpty(node) && this.isComponent(prev) && this.isComponent(next))) {
                result.push(node);
            }
        }

        return result;
    };

    //noinspection JSMethodCanBeStatic


    TrimSpacesOptimizer.prototype.onTemplateNodeComponent = function onTemplateNodeComponent(node) {
        var saveSpaces = node.getAttribute('saveSpaces');

        if (saveSpaces) {
            node.removeAttribute('saveSpaces');
            node.content.saveSpaces = true;
        }
    };

    TrimSpacesOptimizer.prototype.onTemplateNodeContent = function onTemplateNodeContent(node) {
        node.nodes = this.trimComments(node.nodes);

        if (node.nodes.length > 1 && !node.saveSpaces) {
            // trim begin
            if (this.isEmpty(node.nodes[0]) && this.isComponent(node.nodes[1])) {
                node.nodes = node.nodes.slice(1);
            }

            // trim end
            var len = node.nodes.length;

            if (this.isEmpty(node.nodes[len - 1]) && this.isComponent(node.nodes[len - 2])) {
                node.nodes = node.nodes.slice(0, -1);
            }

            // trim inside
            node.nodes = this.trimInside(node.nodes);
        }
    };

    //noinspection JSMethodCanBeStatic


    TrimSpacesOptimizer.prototype.onTemplateNodeString = function onTemplateNodeString(node, parents) {
        var saveSpaces = parents.some(function (node) {
            return node.saveSpaces;
        });

        if (!saveSpaces) {
            node.string = node.string.replace(/[ \t\r\n]+/g, ' ');
        }
    };

    return TrimSpacesOptimizer;
}(_TemplateOptimizerPlugin.TemplateOptimizerPlugin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9vcHRpbWl6ZXIvVHJpbVNwYWNlc09wdGltaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7O0lBRWEsbUIsV0FBQSxtQjs7Ozs7Ozs7QUFFVDtBQUNBOzs7O2tDQUlBLE8sb0JBQVEsSSxFQUFNO0FBQ1YsZUFBTywwREFBc0MsS0FBSyxNQUFMLENBQVksSUFBWixPQUF1QixFQUFwRTtBQUNILEs7O0FBRUQ7Ozs7OztrQ0FJQSxTLHNCQUFVLEksRUFBTTtBQUNaLGVBQU8sS0FBSyxPQUFMLENBQWEsSUFBYixLQUFzQixLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLElBQXBCLElBQTRCLENBQUMsQ0FBMUQ7QUFDSCxLOztBQUVEO0FBQ0E7Ozs7OztrQ0FJQSxXLHdCQUFZLEksRUFBTTtBQUNkLGVBQVEsNERBQUQsSUFDRixzREFETDtBQUVILEs7O0FBRUQ7QUFDQTs7Ozs7OztrQ0FLQSxZLHlCQUFhLEssRUFBTztBQUNoQixlQUFPLE1BQU0sTUFBTixJQUFnQixNQUFNLENBQU4scURBQXZCLEVBQWdFO0FBQzVELGtCQUFNLEtBQU47QUFDSDs7QUFFRCxlQUFPLE1BQU0sTUFBTixJQUFnQixNQUFNLE1BQU0sTUFBTixHQUFlLENBQXJCLHFEQUF2QixFQUErRTtBQUMzRSxrQkFBTSxHQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7OztrQ0FLQSxVLHVCQUFXLEssRUFBTztBQUNkLFlBQUksU0FBUyxFQUFiOztBQUVBLGFBQUssSUFBSSxRQUFRLENBQWpCLEVBQW9CLFFBQVEsTUFBTSxNQUFsQyxFQUEwQyxPQUExQyxFQUFtRDtBQUMvQyxnQkFBSSxPQUFPLE1BQU0sS0FBTixDQUFYO0FBQUEsZ0JBQ0ksT0FBTyxPQUFPLE9BQU8sTUFBUCxHQUFnQixDQUF2QixDQURYO0FBQUEsZ0JBRUksT0FBTyxNQUFNLFFBQVEsQ0FBZCxDQUZYOztBQUlBLGdCQUFJLEVBQUUsS0FBSyxPQUFMLENBQWEsSUFBYixLQUFzQixLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBdEIsSUFBZ0QsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQWxELENBQUosRUFBK0U7QUFDM0UsdUJBQU8sSUFBUCxDQUFZLElBQVo7QUFDSDtBQUNKOztBQUVELGVBQU8sTUFBUDtBQUNILEs7O0FBRUQ7OztrQ0FDQSx1QixvQ0FBd0IsSSxFQUFNO0FBQzFCLFlBQUksYUFBYSxLQUFLLFlBQUwsQ0FBa0IsWUFBbEIsQ0FBakI7O0FBRUEsWUFBSSxVQUFKLEVBQWdCO0FBQ1osaUJBQUssZUFBTCxDQUFxQixZQUFyQjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxVQUFiLEdBQTBCLElBQTFCO0FBQ0g7QUFDSixLOztrQ0FFRCxxQixrQ0FBc0IsSSxFQUFNO0FBQ3hCLGFBQUssS0FBTCxHQUFhLEtBQUssWUFBTCxDQUFrQixLQUFLLEtBQXZCLENBQWI7O0FBRUEsWUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLENBQXBCLElBQXlCLENBQUMsS0FBSyxVQUFuQyxFQUErQztBQUMzQztBQUNBLGdCQUFJLEtBQUssT0FBTCxDQUFhLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBYixLQUErQixLQUFLLFdBQUwsQ0FBaUIsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFqQixDQUFuQyxFQUFvRTtBQUNoRSxxQkFBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixDQUFqQixDQUFiO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBSSxNQUFNLEtBQUssS0FBTCxDQUFXLE1BQXJCOztBQUVBLGdCQUFJLEtBQUssT0FBTCxDQUFhLEtBQUssS0FBTCxDQUFXLE1BQU0sQ0FBakIsQ0FBYixLQUFxQyxLQUFLLFdBQUwsQ0FBaUIsS0FBSyxLQUFMLENBQVcsTUFBTSxDQUFqQixDQUFqQixDQUF6QyxFQUFnRjtBQUM1RSxxQkFBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFDLENBQXJCLENBQWI7QUFDSDs7QUFFRDtBQUNBLGlCQUFLLEtBQUwsR0FBYSxLQUFLLFVBQUwsQ0FBZ0IsS0FBSyxLQUFyQixDQUFiO0FBQ0g7QUFDSixLOztBQUVEOzs7a0NBQ0Esb0IsaUNBQXFCLEksRUFBTSxPLEVBQVM7QUFDaEMsWUFBSSxhQUFhLFFBQVEsSUFBUixDQUFhO0FBQUEsbUJBQVEsS0FBSyxVQUFiO0FBQUEsU0FBYixDQUFqQjs7QUFFQSxZQUFJLENBQUMsVUFBTCxFQUFpQjtBQUNiLGlCQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLGFBQXBCLEVBQW1DLEdBQW5DLENBQWQ7QUFDSDtBQUNKLEsiLCJmaWxlIjoiVHJpbVNwYWNlc09wdGltaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGVtcGxhdGVPcHRpbWl6ZXJQbHVnaW59IGZyb20gJy4vVGVtcGxhdGVPcHRpbWl6ZXJQbHVnaW4nO1xuXG5pbXBvcnQge1RlbXBsYXRlTm9kZVN0cmluZ30gZnJvbSAnLi4vbm9kZXMvVGVtcGxhdGVOb2RlU3RyaW5nJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlQ29tcG9uZW50fSBmcm9tICcuLi9ub2Rlcy9UZW1wbGF0ZU5vZGVDb21wb25lbnQnO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVDb21tZW50fSBmcm9tICcuLi9ub2Rlcy9UZW1wbGF0ZU5vZGVDb21tZW50JztcbmltcG9ydCB7VGVtcGxhdGVOb2RlSGVscGVyfSBmcm9tIFwiLi4vbm9kZXMvVGVtcGxhdGVOb2RlSGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBUcmltU3BhY2VzT3B0aW1pemVyIGV4dGVuZHMgVGVtcGxhdGVPcHRpbWl6ZXJQbHVnaW4ge1xuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNFbXB0eShub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlU3RyaW5nICYmIG5vZGUuc3RyaW5nLnRyaW0oKSA9PT0gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc05ld0xpbmUobm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0VtcHR5KG5vZGUpICYmIG5vZGUuc3RyaW5nLmluZGV4T2YoJ1xcbicpID4gLTE7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDb21wb25lbnQobm9kZSkge1xuICAgICAgICByZXR1cm4gKG5vZGUgaW5zdGFuY2VvZiBUZW1wbGF0ZU5vZGVDb21wb25lbnQpIHx8XG4gICAgICAgICAgICAobm9kZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZUhlbHBlcik7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlW119IG5vZGVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlW119XG4gICAgICovXG4gICAgdHJpbUNvbW1lbnRzKG5vZGVzKSB7XG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggJiYgbm9kZXNbMF0gaW5zdGFuY2VvZiBUZW1wbGF0ZU5vZGVDb21tZW50KSB7XG4gICAgICAgICAgICBub2Rlcy5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCAmJiBub2Rlc1tub2Rlcy5sZW5ndGggLSAxXSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZUNvbW1lbnQpIHtcbiAgICAgICAgICAgIG5vZGVzLnBvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlW119IG5vZGVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlW119XG4gICAgICovXG4gICAgdHJpbUluc2lkZShub2Rlcykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG5vZGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlc1tpbmRleF0sXG4gICAgICAgICAgICAgICAgcHJldiA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICAgICAgbmV4dCA9IG5vZGVzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGlmICghKHRoaXMuaXNFbXB0eShub2RlKSAmJiB0aGlzLmlzQ29tcG9uZW50KHByZXYpICYmIHRoaXMuaXNDb21wb25lbnQobmV4dCkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBvblRlbXBsYXRlTm9kZUNvbXBvbmVudChub2RlKSB7XG4gICAgICAgIHZhciBzYXZlU3BhY2VzID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ3NhdmVTcGFjZXMnKTtcblxuICAgICAgICBpZiAoc2F2ZVNwYWNlcykge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3NhdmVTcGFjZXMnKTtcbiAgICAgICAgICAgIG5vZGUuY29udGVudC5zYXZlU3BhY2VzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGVtcGxhdGVOb2RlQ29udGVudChub2RlKSB7XG4gICAgICAgIG5vZGUubm9kZXMgPSB0aGlzLnRyaW1Db21tZW50cyhub2RlLm5vZGVzKTtcblxuICAgICAgICBpZiAobm9kZS5ub2Rlcy5sZW5ndGggPiAxICYmICFub2RlLnNhdmVTcGFjZXMpIHtcbiAgICAgICAgICAgIC8vIHRyaW0gYmVnaW5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkobm9kZS5ub2Rlc1swXSkgJiYgdGhpcy5pc0NvbXBvbmVudChub2RlLm5vZGVzWzFdKSkge1xuICAgICAgICAgICAgICAgIG5vZGUubm9kZXMgPSBub2RlLm5vZGVzLnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0cmltIGVuZFxuICAgICAgICAgICAgbGV0IGxlbiA9IG5vZGUubm9kZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KG5vZGUubm9kZXNbbGVuIC0gMV0pICYmIHRoaXMuaXNDb21wb25lbnQobm9kZS5ub2Rlc1tsZW4gLSAyXSkpIHtcbiAgICAgICAgICAgICAgICBub2RlLm5vZGVzID0gbm9kZS5ub2Rlcy5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRyaW0gaW5zaWRlXG4gICAgICAgICAgICBub2RlLm5vZGVzID0gdGhpcy50cmltSW5zaWRlKG5vZGUubm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIG9uVGVtcGxhdGVOb2RlU3RyaW5nKG5vZGUsIHBhcmVudHMpIHtcbiAgICAgICAgbGV0IHNhdmVTcGFjZXMgPSBwYXJlbnRzLnNvbWUobm9kZSA9PiBub2RlLnNhdmVTcGFjZXMpO1xuXG4gICAgICAgIGlmICghc2F2ZVNwYWNlcykge1xuICAgICAgICAgICAgbm9kZS5zdHJpbmcgPSBub2RlLnN0cmluZy5yZXBsYWNlKC9bIFxcdFxcclxcbl0rL2csICcgJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=