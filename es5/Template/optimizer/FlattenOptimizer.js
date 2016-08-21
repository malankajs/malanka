'use strict';

exports.__esModule = true;
exports.FlattenOptimizer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateOptimizerPlugin = require('./TemplateOptimizerPlugin');

var _TemplateNodeStringProxy = require('../nodes/TemplateNodeStringProxy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlattenOptimizer = exports.FlattenOptimizer = function (_TemplateOptimizerPlu) {
    (0, _inherits3.default)(FlattenOptimizer, _TemplateOptimizerPlu);

    function FlattenOptimizer() {
        (0, _classCallCheck3.default)(this, FlattenOptimizer);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateOptimizerPlu.apply(this, arguments));
    }

    FlattenOptimizer.prototype.onTemplateNodeContent = function onTemplateNodeContent(node) {
        node.nodes = this.flattenNodes(node.nodes);

        return node;
    };

    FlattenOptimizer.prototype.flattenNodes = function flattenNodes(nodes) {
        var _this2 = this;

        var result = [];

        nodes.forEach(function (node) {
            if (node instanceof _TemplateNodeStringProxy.TemplateNodeStringProxy) {
                result = result.concat(_this2.flattenNodes(node.content.nodes));
            } else {
                result.push(node);
            }
        });

        return result;
    };

    return FlattenOptimizer;
}(_TemplateOptimizerPlugin.TemplateOptimizerPlugin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9vcHRpbWl6ZXIvRmxhdHRlbk9wdGltaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOzs7O0lBRWEsZ0IsV0FBQSxnQjs7Ozs7Ozs7K0JBRVQscUIsa0NBQXNCLEksRUFBTTtBQUN4QixhQUFLLEtBQUwsR0FBYSxLQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUF2QixDQUFiOztBQUVBLGVBQU8sSUFBUDtBQUNILEs7OytCQUVELFkseUJBQWEsSyxFQUFPO0FBQUE7O0FBQ2hCLFlBQUksU0FBUyxFQUFiOztBQUVBLGNBQU0sT0FBTixDQUFjLGdCQUFRO0FBQ2xCLGdCQUFJLGdFQUFKLEVBQTZDO0FBQ3pDLHlCQUFTLE9BQU8sTUFBUCxDQUFjLE9BQUssWUFBTCxDQUFrQixLQUFLLE9BQUwsQ0FBYSxLQUEvQixDQUFkLENBQVQ7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxJQUFQLENBQVksSUFBWjtBQUNIO0FBQ0osU0FORDs7QUFRQSxlQUFPLE1BQVA7QUFDSCxLIiwiZmlsZSI6IkZsYXR0ZW5PcHRpbWl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlT3B0aW1pemVyUGx1Z2lufSBmcm9tICcuL1RlbXBsYXRlT3B0aW1pemVyUGx1Z2luJztcblxuaW1wb3J0IHtUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eX0gZnJvbSAnLi4vbm9kZXMvVGVtcGxhdGVOb2RlU3RyaW5nUHJveHknO1xuXG5leHBvcnQgY2xhc3MgRmxhdHRlbk9wdGltaXplciBleHRlbmRzIFRlbXBsYXRlT3B0aW1pemVyUGx1Z2luIHtcblxuICAgIG9uVGVtcGxhdGVOb2RlQ29udGVudChub2RlKSB7XG4gICAgICAgIG5vZGUubm9kZXMgPSB0aGlzLmZsYXR0ZW5Ob2Rlcyhub2RlLm5vZGVzKTtcblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBmbGF0dGVuTm9kZXMobm9kZXMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZVN0cmluZ1Byb3h5KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh0aGlzLmZsYXR0ZW5Ob2Rlcyhub2RlLmNvbnRlbnQubm9kZXMpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59Il19