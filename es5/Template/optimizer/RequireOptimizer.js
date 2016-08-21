'use strict';

exports.__esModule = true;
exports.RequireOptimizer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateOptimizerPlugin = require('./TemplateOptimizerPlugin');

var _TemplateNodeRequire = require('../nodes/TemplateNodeRequire');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequireOptimizer = exports.RequireOptimizer = function (_TemplateOptimizerPlu) {
    (0, _inherits3.default)(RequireOptimizer, _TemplateOptimizerPlu);

    function RequireOptimizer() {
        (0, _classCallCheck3.default)(this, RequireOptimizer);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateOptimizerPlu.apply(this, arguments));
    }

    //noinspection JSMethodCanBeStatic
    RequireOptimizer.prototype.onTemplateNodeHelper = function onTemplateNodeHelper(node) {
        if (node.path.original === 'require') {
            return _TemplateNodeRequire.TemplateNodeRequire.factory(node.params[0].nodes[0], node.env);
        }
    };

    return RequireOptimizer;
}(_TemplateOptimizerPlugin.TemplateOptimizerPlugin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9vcHRpbWl6ZXIvUmVxdWlyZU9wdGltaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0lBRWEsZ0IsV0FBQSxnQjs7Ozs7Ozs7QUFFVDsrQkFDQSxvQixpQ0FBcUIsSSxFQUFNO0FBQ3ZCLFlBQUksS0FBSyxJQUFMLENBQVUsUUFBVixLQUF1QixTQUEzQixFQUFzQztBQUNsQyxtQkFBTyx5Q0FBb0IsT0FBcEIsQ0FBNEIsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLEtBQWYsQ0FBcUIsQ0FBckIsQ0FBNUIsRUFBcUQsS0FBSyxHQUExRCxDQUFQO0FBQ0g7QUFDSixLIiwiZmlsZSI6IlJlcXVpcmVPcHRpbWl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlT3B0aW1pemVyUGx1Z2lufSBmcm9tICcuL1RlbXBsYXRlT3B0aW1pemVyUGx1Z2luJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlUmVxdWlyZX0gZnJvbSAnLi4vbm9kZXMvVGVtcGxhdGVOb2RlUmVxdWlyZSc7XG5cbmV4cG9ydCBjbGFzcyBSZXF1aXJlT3B0aW1pemVyIGV4dGVuZHMgVGVtcGxhdGVPcHRpbWl6ZXJQbHVnaW4ge1xuICAgIFxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICBvblRlbXBsYXRlTm9kZUhlbHBlcihub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnBhdGgub3JpZ2luYWwgPT09ICdyZXF1aXJlJykge1xuICAgICAgICAgICAgcmV0dXJuIFRlbXBsYXRlTm9kZVJlcXVpcmUuZmFjdG9yeShub2RlLnBhcmFtc1swXS5ub2Rlc1swXSwgbm9kZS5lbnYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxufSJdfQ==