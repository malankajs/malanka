'use strict';

exports.__esModule = true;
exports.TemplateOptimizer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _TemplateNode = require('./nodes/TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateOptimizer = exports.TemplateOptimizer = function () {

    /**
     * @param {{}[]} plugins
     */
    function TemplateOptimizer() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var _ref$plugins = _ref.plugins;
        var plugins = _ref$plugins === undefined ? [] : _ref$plugins;
        (0, _classCallCheck3.default)(this, TemplateOptimizer);

        this.plugins = plugins;
    }

    /**
     * @param {TemplateNode} node
     * @returns {*}
     */


    TemplateOptimizer.prototype.optimize = function optimize(node) {
        this.invokePlugins('initialize', node, this);

        return this.optimizeNode(node, []);
    };

    /**
     * @param {TemplateNode} node
     * @param {TemplateNode[]} parents
     * @returns {*}
     */


    TemplateOptimizer.prototype.optimizeNode = function optimizeNode(node, parents) {
        var _this = this;

        if (!(node instanceof _TemplateNode.TemplateNode)) {
            return node;
        }

        node = this.invokePlugins('onNode', node, parents, this);
        node = this.invokePlugins('on' + node.constructor.name, node, parents, this);

        var newParents = [].concat(parents, [node]);

        Object.keys(node).forEach(function (key) {
            if (node[key] instanceof _TemplateNode.TemplateNode) {
                node[key] = _this.optimizeNode(node[key], newParents);
            }

            if (Array.isArray(node[key])) {
                node[key] = node[key].map(function (childNode) {
                    return _this.optimizeNode(childNode, newParents);
                });
            }
        });

        return node;
    };

    /**
     * @param method
     * @param node
     * @param args
     * @returns {*}
     */


    TemplateOptimizer.prototype.invokePlugins = function invokePlugins(method, node) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        for (var index = 0; index < this.plugins.length; index++) {
            var plugin = this.plugins[index];

            if (plugin[method]) {
                node = plugin[method].apply(plugin, [node].concat(args)) || node;
            }
        }

        return node;
    };

    return TemplateOptimizer;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9UZW1wbGF0ZS9UZW1wbGF0ZU9wdGltaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztJQUVhLGlCLFdBQUEsaUI7O0FBRVQ7OztBQUdBLGlDQUFpQztBQUFBLHlFQUFKLEVBQUk7O0FBQUEsZ0NBQXBCLE9BQW9CO0FBQUEsWUFBcEIsT0FBb0IsZ0NBQVYsRUFBVTtBQUFBOztBQUM3QixhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0g7O0FBRUQ7Ozs7OztnQ0FJQSxRLHFCQUFTLEksRUFBTTtBQUNYLGFBQUssYUFBTCxDQUFtQixZQUFuQixFQUFpQyxJQUFqQyxFQUF1QyxJQUF2Qzs7QUFFQSxlQUFPLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUF3QixFQUF4QixDQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7OztnQ0FLQSxZLHlCQUFhLEksRUFBTSxPLEVBQVM7QUFBQTs7QUFDeEIsWUFBSSxFQUFFLDBDQUFGLENBQUosRUFBcUM7QUFDakMsbUJBQU8sSUFBUDtBQUNIOztBQUVELGVBQU8sS0FBSyxhQUFMLENBQW1CLFFBQW5CLEVBQTZCLElBQTdCLEVBQW1DLE9BQW5DLEVBQTRDLElBQTVDLENBQVA7QUFDQSxlQUFPLEtBQUssYUFBTCxDQUFtQixPQUFPLEtBQUssV0FBTCxDQUFpQixJQUEzQyxFQUFpRCxJQUFqRCxFQUF1RCxPQUF2RCxFQUFnRSxJQUFoRSxDQUFQOztBQUVBLFlBQUksYUFBYSxHQUFHLE1BQUgsQ0FBVSxPQUFWLEVBQW1CLENBQUMsSUFBRCxDQUFuQixDQUFqQjs7QUFFQSxlQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGVBQU87QUFDN0IsZ0JBQUksS0FBSyxHQUFMLHVDQUFKLEVBQXVDO0FBQ25DLHFCQUFLLEdBQUwsSUFBWSxNQUFLLFlBQUwsQ0FBa0IsS0FBSyxHQUFMLENBQWxCLEVBQTZCLFVBQTdCLENBQVo7QUFDSDs7QUFFRCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxLQUFLLEdBQUwsQ0FBZCxDQUFKLEVBQThCO0FBQzFCLHFCQUFLLEdBQUwsSUFBWSxLQUFLLEdBQUwsRUFBVSxHQUFWLENBQWMscUJBQWE7QUFDbkMsMkJBQU8sTUFBSyxZQUFMLENBQWtCLFNBQWxCLEVBQTZCLFVBQTdCLENBQVA7QUFDSCxpQkFGVyxDQUFaO0FBR0g7QUFDSixTQVZEOztBQVlBLGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7O2dDQU1BLGEsMEJBQWMsTSxFQUFRLEksRUFBZTtBQUFBLDBDQUFOLElBQU07QUFBTixnQkFBTTtBQUFBOztBQUNqQyxhQUFLLElBQUksUUFBUSxDQUFqQixFQUFvQixRQUFRLEtBQUssT0FBTCxDQUFhLE1BQXpDLEVBQWlELE9BQWpELEVBQTBEO0FBQ3RELGdCQUFJLFNBQVMsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFiOztBQUVBLGdCQUFJLE9BQU8sTUFBUCxDQUFKLEVBQW9CO0FBQ2hCLHVCQUFPLE9BQU8sTUFBUCxpQkFBZSxJQUFmLFNBQXdCLElBQXhCLE1BQWlDLElBQXhDO0FBQ0g7QUFDSjs7QUFFRCxlQUFPLElBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlT3B0aW1pemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU5vZGV9IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlJztcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlT3B0aW1pemVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e31bXX0gcGx1Z2luc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHtwbHVnaW5zID0gW119ID0ge30pIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gcGx1Z2lucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIG9wdGltaXplKG5vZGUpIHtcbiAgICAgICAgdGhpcy5pbnZva2VQbHVnaW5zKCdpbml0aWFsaXplJywgbm9kZSwgdGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW1pemVOb2RlKG5vZGUsIFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlW119IHBhcmVudHNcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBvcHRpbWl6ZU5vZGUobm9kZSwgcGFyZW50cykge1xuICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlID0gdGhpcy5pbnZva2VQbHVnaW5zKCdvbk5vZGUnLCBub2RlLCBwYXJlbnRzLCB0aGlzKTtcbiAgICAgICAgbm9kZSA9IHRoaXMuaW52b2tlUGx1Z2lucygnb24nICsgbm9kZS5jb25zdHJ1Y3Rvci5uYW1lLCBub2RlLCBwYXJlbnRzLCB0aGlzKTtcblxuICAgICAgICB2YXIgbmV3UGFyZW50cyA9IFtdLmNvbmNhdChwYXJlbnRzLCBbbm9kZV0pO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlW2tleV0gaW5zdGFuY2VvZiBUZW1wbGF0ZU5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlW2tleV0gPSB0aGlzLm9wdGltaXplTm9kZShub2RlW2tleV0sIG5ld1BhcmVudHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgbm9kZVtrZXldID0gbm9kZVtrZXldLm1hcChjaGlsZE5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpbWl6ZU5vZGUoY2hpbGROb2RlLCBuZXdQYXJlbnRzKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWV0aG9kXG4gICAgICogQHBhcmFtIG5vZGVcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGludm9rZVBsdWdpbnMobWV0aG9kLCBub2RlLCAuLi5hcmdzKSB7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnBsdWdpbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gdGhpcy5wbHVnaW5zW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKHBsdWdpblttZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHBsdWdpblttZXRob2RdKG5vZGUsIC4uLmFyZ3MpIHx8IG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbn0iXX0=