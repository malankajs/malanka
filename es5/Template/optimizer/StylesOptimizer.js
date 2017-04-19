'use strict';

exports.__esModule = true;
exports.StylesOptimizer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateOptimizerPlugin = require('./TemplateOptimizerPlugin');

var _TemplateNodeString = require('../nodes/TemplateNodeString');

var _TemplateNodeVar = require('../nodes/TemplateNodeVar');

var _TemplateNodeContent = require('../nodes/TemplateNodeContent');

var _TemplateNodeStringProxy = require('../nodes/TemplateNodeStringProxy');

var _TemplateNodeBlockHelper = require('../nodes/TemplateNodeBlockHelper');

var _TemplateNodeAttribute = require('../nodes/TemplateNodeAttribute');

var _TemplateNodeHelper = require('../nodes/TemplateNodeHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StylesOptimizer = exports.StylesOptimizer = function (_TemplateOptimizerPlu) {
    (0, _inherits3.default)(StylesOptimizer, _TemplateOptimizerPlu);

    function StylesOptimizer() {
        (0, _classCallCheck3.default)(this, StylesOptimizer);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateOptimizerPlu.apply(this, arguments));
    }

    /**
     * @param {TemplateNodeAttribute} node
     *
     * @returns {TemplateNodeAttribute}
     */
    StylesOptimizer.prototype.onTemplateNodeAttribute = function onTemplateNodeAttribute(node) {
        if (node.name === 'class') {
            node.value = this.convert(node.value);
        }

        return node;
    };

    /**
     * @param {TemplateNodeHashAttribute} node
     *
     * @returns {TemplateNodeHashAttribute}
     */


    StylesOptimizer.prototype.onTemplateNodeHashAttribute = function onTemplateNodeHashAttribute(node) {
        if (node.name === 'class') {
            node.value = this.convert(node.value);
        }

        return node;
    };

    /**
     * @param {TemplateNode} node
     *
     * @returns {TemplateNode}
     */


    StylesOptimizer.prototype.convert = function convert(node) {
        if (node instanceof _TemplateNodeString.TemplateNodeString) {
            return this.convertStringNode(node);
        }

        if (node instanceof _TemplateNodeStringProxy.TemplateNodeStringProxy) {
            return this.convertProxyNode(node);
        }

        if (node instanceof _TemplateNodeContent.TemplateNodeContent) {
            return this.convertContentNode(node);
        }

        if (node instanceof _TemplateNodeBlockHelper.TemplateNodeBlockHelper) {
            return this.convertBlockHelperNode(node);
        }

        return node;
    };

    /**
     * @param {TemplateNodeString} node
     *
     * @returns {TemplateNodeString}
     */


    StylesOptimizer.prototype.convertStringNode = function convertStringNode(node) {
        if (node.string.trim() === '') {
            return node;
        }

        return this.convertToVars(node.string, node.env);
    };

    /**
     * @param {TemplateNodeStringProxy} proxy
     *
     * @returns {TemplateNodeStringProxy}
     */


    StylesOptimizer.prototype.convertProxyNode = function convertProxyNode(proxy) {
        var content = [];

        this.convert(proxy.content).nodes.forEach(function (node) {
            if (node instanceof _TemplateNodeStringProxy.TemplateNodeStringProxy) {
                content = content.concat(node.content.nodes);
            } else {
                content.push(node);
            }
        });

        proxy.content.nodes = content;

        return proxy;
    };

    /**
     * @param {TemplateNodeStringProxy} node
     *
     * @returns {TemplateNodeStringProxy}
     */


    StylesOptimizer.prototype.convertContentNode = function convertContentNode(node) {
        var _this2 = this;

        node.nodes = node.nodes.map(function (node) {
            return _this2.convert(node);
        });

        return node;
    };

    /**
     * @param {TemplateNodeBlockHelper} node
     *
     * @returns {TemplateNodeBlockHelper}
     */


    StylesOptimizer.prototype.convertBlockHelperNode = function convertBlockHelperNode(node) {
        if (node.content) {
            node.content = this.convert(node.content);
        }

        if (node.inverse) {
            node.inverse = this.convert(node.inverse);
        }

        return node;
    };

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     * 
     * @returns {TemplateNodeStringProxy}
     */


    StylesOptimizer.prototype.convertToVars = function convertToVars(string, env) {
        var _this3 = this;

        var classes = string.match(/(\s+|\S+)/g);

        if (classes.length === 1) {
            return this.convertToVar(string, env);
        } else {
            var _ret = function () {
                var parts = [];

                classes.forEach(function (cls) {
                    if (cls.trim().length) {
                        parts.push(_this3.convertToVar(cls, env));
                    } else {
                        parts.push(env.factoryString(' '));
                    }
                });

                return {
                    v: new _TemplateNodeStringProxy.TemplateNodeStringProxy(new _TemplateNodeContent.TemplateNodeContent(parts, env), env)
                };
            }();

            if (typeof _ret === "object") return _ret.v;
        }
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar|TemplateNodeString}
     */


    StylesOptimizer.prototype.convertToVar = function convertToVar(string, env) {
        if (string.trim() === '') {
            return env.factoryString(string);
        }

        return _TemplateNodeVar.TemplateNodeVar.factoryFromString('styles.' + string, env);
    };

    return StylesOptimizer;
}(_TemplateOptimizerPlugin.TemplateOptimizerPlugin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9vcHRpbWl6ZXIvU3R5bGVzT3B0aW1pemVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7SUFFYSxlLFdBQUEsZTs7Ozs7Ozs7QUFFVDs7Ozs7OEJBS0EsdUIsb0NBQXdCLEksRUFBTTtBQUMxQixZQUFJLEtBQUssSUFBTCxLQUFjLE9BQWxCLEVBQTJCO0FBQ3ZCLGlCQUFLLEtBQUwsR0FBYSxLQUFLLE9BQUwsQ0FBYSxLQUFLLEtBQWxCLENBQWI7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OzhCQUtBLDJCLHdDQUE0QixJLEVBQU07QUFDOUIsWUFBSSxLQUFLLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN2QixpQkFBSyxLQUFMLEdBQWEsS0FBSyxPQUFMLENBQWEsS0FBSyxLQUFsQixDQUFiO0FBQ0g7O0FBRUQsZUFBTyxJQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs4QkFLQSxPLG9CQUFRLEksRUFBTTtBQUNWLFlBQUksc0RBQUosRUFBd0M7QUFDcEMsbUJBQU8sS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUFQO0FBQ0g7O0FBRUQsWUFBSSxnRUFBSixFQUE2QztBQUN6QyxtQkFBTyxLQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQVA7QUFDSDs7QUFHRCxZQUFJLHdEQUFKLEVBQXlDO0FBQ3JDLG1CQUFPLEtBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBUDtBQUNIOztBQUVELFlBQUksZ0VBQUosRUFBNkM7QUFDekMsbUJBQU8sS0FBSyxzQkFBTCxDQUE0QixJQUE1QixDQUFQO0FBQ0g7O0FBRUQsZUFBTyxJQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs4QkFLQSxpQiw4QkFBa0IsSSxFQUFNO0FBQ3BCLFlBQUksS0FBSyxNQUFMLENBQVksSUFBWixPQUF1QixFQUEzQixFQUErQjtBQUMzQixtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsZUFBTyxLQUFLLGFBQUwsQ0FBbUIsS0FBSyxNQUF4QixFQUFnQyxLQUFLLEdBQXJDLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OzhCQUtBLGdCLDZCQUFpQixLLEVBQU87QUFDcEIsWUFBSSxVQUFVLEVBQWQ7O0FBRUEsYUFBSyxPQUFMLENBQWEsTUFBTSxPQUFuQixFQUE0QixLQUE1QixDQUFrQyxPQUFsQyxDQUEwQyxnQkFBUTtBQUM5QyxnQkFBSSxnRUFBSixFQUE2QztBQUN6QywwQkFBVSxRQUFRLE1BQVIsQ0FBZSxLQUFLLE9BQUwsQ0FBYSxLQUE1QixDQUFWO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsd0JBQVEsSUFBUixDQUFhLElBQWI7QUFDSDtBQUNKLFNBTkQ7O0FBUUEsY0FBTSxPQUFOLENBQWMsS0FBZCxHQUFzQixPQUF0Qjs7QUFFQSxlQUFPLEtBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OzhCQUtBLGtCLCtCQUFtQixJLEVBQU07QUFBQTs7QUFDckIsYUFBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlO0FBQUEsbUJBQVEsT0FBSyxPQUFMLENBQWEsSUFBYixDQUFSO0FBQUEsU0FBZixDQUFiOztBQUVBLGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7OEJBS0Esc0IsbUNBQXVCLEksRUFBTTtBQUN6QixZQUFJLEtBQUssT0FBVCxFQUFrQjtBQUNkLGlCQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxLQUFLLE9BQWxCLENBQWY7QUFDSDs7QUFFRCxZQUFJLEtBQUssT0FBVCxFQUFrQjtBQUNkLGlCQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxLQUFLLE9BQWxCLENBQWY7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxLOztBQUVEOzs7Ozs7Ozs4QkFNQSxhLDBCQUFjLE0sRUFBUSxHLEVBQUs7QUFBQTs7QUFDdkIsWUFBSSxVQUFVLE9BQU8sS0FBUCxDQUFhLFlBQWIsQ0FBZDs7QUFFQSxZQUFJLFFBQVEsTUFBUixLQUFtQixDQUF2QixFQUEwQjtBQUN0QixtQkFBTyxLQUFLLFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsR0FBMUIsQ0FBUDtBQUNILFNBRkQsTUFFTztBQUFBO0FBQ0gsb0JBQUksUUFBUSxFQUFaOztBQUVBLHdCQUFRLE9BQVIsQ0FBZ0IsZUFBTztBQUNuQix3QkFBSSxJQUFJLElBQUosR0FBVyxNQUFmLEVBQXVCO0FBQ25CLDhCQUFNLElBQU4sQ0FBVyxPQUFLLFlBQUwsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBWDtBQUNILHFCQUZELE1BRU87QUFDSCw4QkFBTSxJQUFOLENBQVcsSUFBSSxhQUFKLENBQWtCLEdBQWxCLENBQVg7QUFDSDtBQUNKLGlCQU5EOztBQVFBO0FBQUEsdUJBQU8scURBQTRCLDZDQUF3QixLQUF4QixFQUErQixHQUEvQixDQUE1QixFQUFpRSxHQUFqRTtBQUFQO0FBWEc7O0FBQUE7QUFZTjtBQUNKLEs7O0FBRUQ7QUFDQTs7Ozs7Ozs7OEJBTUEsWSx5QkFBYSxNLEVBQVEsRyxFQUFLO0FBQ3RCLFlBQUksT0FBTyxJQUFQLE9BQWtCLEVBQXRCLEVBQTBCO0FBQ3RCLG1CQUFPLElBQUksYUFBSixDQUFrQixNQUFsQixDQUFQO0FBQ0g7O0FBRUQsZUFBTyxpQ0FBZ0IsaUJBQWhCLENBQWtDLFlBQVksTUFBOUMsRUFBc0QsR0FBdEQsQ0FBUDtBQUNILEsiLCJmaWxlIjoiU3R5bGVzT3B0aW1pemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU9wdGltaXplclBsdWdpbn0gZnJvbSAnLi9UZW1wbGF0ZU9wdGltaXplclBsdWdpbic7XG5cbmltcG9ydCB7VGVtcGxhdGVOb2RlU3RyaW5nfSBmcm9tICcuLi9ub2Rlcy9UZW1wbGF0ZU5vZGVTdHJpbmcnO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVWYXJ9IGZyb20gJy4uL25vZGVzL1RlbXBsYXRlTm9kZVZhcic7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUNvbnRlbnR9IGZyb20gJy4uL25vZGVzL1RlbXBsYXRlTm9kZUNvbnRlbnQnO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eX0gZnJvbSAnLi4vbm9kZXMvVGVtcGxhdGVOb2RlU3RyaW5nUHJveHknO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVCbG9ja0hlbHBlcn0gZnJvbSAnLi4vbm9kZXMvVGVtcGxhdGVOb2RlQmxvY2tIZWxwZXInO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVBdHRyaWJ1dGV9IGZyb20gJy4uL25vZGVzL1RlbXBsYXRlTm9kZUF0dHJpYnV0ZSc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUhlbHBlcn0gZnJvbSAnLi4vbm9kZXMvVGVtcGxhdGVOb2RlSGVscGVyJztcblxuZXhwb3J0IGNsYXNzIFN0eWxlc09wdGltaXplciBleHRlbmRzIFRlbXBsYXRlT3B0aW1pemVyUGx1Z2luIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlQXR0cmlidXRlfSBub2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlQXR0cmlidXRlfVxuICAgICAqL1xuICAgIG9uVGVtcGxhdGVOb2RlQXR0cmlidXRlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IHRoaXMuY29udmVydChub2RlLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlSGFzaEF0dHJpYnV0ZX0gbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZUhhc2hBdHRyaWJ1dGV9XG4gICAgICovXG4gICAgb25UZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubmFtZSA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IHRoaXMuY29udmVydChub2RlLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlfSBub2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlfVxuICAgICAqL1xuICAgIGNvbnZlcnQobm9kZSkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZVN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFN0cmluZ05vZGUobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZVN0cmluZ1Byb3h5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0UHJveHlOb2RlKG5vZGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZUNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRDb250ZW50Tm9kZShub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlQmxvY2tIZWxwZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRCbG9ja0hlbHBlck5vZGUobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZVN0cmluZ30gbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ31cbiAgICAgKi9cbiAgICBjb252ZXJ0U3RyaW5nTm9kZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnN0cmluZy50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb1ZhcnMobm9kZS5zdHJpbmcsIG5vZGUuZW52KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZVN0cmluZ1Byb3h5fSBwcm94eVxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ1Byb3h5fVxuICAgICAqL1xuICAgIGNvbnZlcnRQcm94eU5vZGUocHJveHkpIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBbXTtcblxuICAgICAgICB0aGlzLmNvbnZlcnQocHJveHkuY29udGVudCkubm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlU3RyaW5nUHJveHkpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5jb25jYXQobm9kZS5jb250ZW50Lm5vZGVzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGVudC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwcm94eS5jb250ZW50Lm5vZGVzID0gY29udGVudDtcblxuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eX0gbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ1Byb3h5fVxuICAgICAqL1xuICAgIGNvbnZlcnRDb250ZW50Tm9kZShub2RlKSB7XG4gICAgICAgIG5vZGUubm9kZXMgPSBub2RlLm5vZGVzLm1hcChub2RlID0+IHRoaXMuY29udmVydChub2RlKSk7XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZU5vZGVCbG9ja0hlbHBlcn0gbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZUJsb2NrSGVscGVyfVxuICAgICAqL1xuICAgIGNvbnZlcnRCbG9ja0hlbHBlck5vZGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5jb250ZW50KSB7XG4gICAgICAgICAgICBub2RlLmNvbnRlbnQgPSB0aGlzLmNvbnZlcnQobm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmludmVyc2UpIHtcbiAgICAgICAgICAgIG5vZGUuaW52ZXJzZSA9IHRoaXMuY29udmVydChub2RlLmludmVyc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICogXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ1Byb3h5fVxuICAgICAqL1xuICAgIGNvbnZlcnRUb1ZhcnMoc3RyaW5nLCBlbnYpIHtcbiAgICAgICAgbGV0IGNsYXNzZXMgPSBzdHJpbmcubWF0Y2goLyhcXHMrfFxcUyspL2cpO1xuXG4gICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvVmFyKHN0cmluZywgZW52KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IFtdO1xuXG4gICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goY2xzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2xzLnRyaW0oKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh0aGlzLmNvbnZlcnRUb1ZhcihjbHMsIGVudikpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goZW52LmZhY3RvcnlTdHJpbmcoJyAnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVOb2RlU3RyaW5nUHJveHkobmV3IFRlbXBsYXRlTm9kZUNvbnRlbnQocGFydHMsIGVudiksIGVudik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlVmFyfFRlbXBsYXRlTm9kZVN0cmluZ31cbiAgICAgKi9cbiAgICBjb252ZXJ0VG9WYXIoc3RyaW5nLCBlbnYpIHtcbiAgICAgICAgaWYgKHN0cmluZy50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW52LmZhY3RvcnlTdHJpbmcoc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBUZW1wbGF0ZU5vZGVWYXIuZmFjdG9yeUZyb21TdHJpbmcoJ3N0eWxlcy4nICsgc3RyaW5nLCBlbnYpO1xuICAgIH1cblxufSJdfQ==