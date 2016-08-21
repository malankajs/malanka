'use strict';

exports.__esModule = true;
exports.TemplateNodePrimitive = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodePrimitive = exports.TemplateNodePrimitive = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodePrimitive, _TemplateNode);

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePrimitive}
     */
    function TemplateNodePrimitive(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodePrimitive);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        Object.assign(_this, node);
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodePrimitive.prototype.compile = function compile() {
        return String(this.value);
    };

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePrimitive}
     */


    TemplateNodePrimitive.factory = function factory(node, env) {
        return new this(node, env);
    };

    return TemplateNodePrimitive;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVQcmltaXRpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUVhLHFCLFdBQUEscUI7OztBQUVUOzs7Ozs7QUFNQSxtQ0FBWSxJQUFaLEVBQWtCLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsbUVBQ25CLHlCQUFNLEdBQU4sQ0FEbUI7O0FBR25CLGVBQU8sTUFBUCxRQUFvQixJQUFwQjtBQUhtQjtBQUl0Qjs7QUFFRDs7Ozs7b0NBR0EsTyxzQkFBVTtBQUNOLGVBQU8sT0FBTyxLQUFLLEtBQVosQ0FBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7OzBCQU1PLE8sb0JBQVEsSSxFQUFNLEcsRUFBSztBQUN0QixlQUFPLElBQUksSUFBSixDQUFTLElBQVQsRUFBZSxHQUFmLENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZVByaW1pdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGVtcGxhdGVOb2RlfSBmcm9tICcuL1RlbXBsYXRlTm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU5vZGVQcmltaXRpdmUgZXh0ZW5kcyBUZW1wbGF0ZU5vZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlUHJpbWl0aXZlfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGVudikge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgbm9kZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlKCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IG5vZGVcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVByaW1pdGl2ZX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZmFjdG9yeShub2RlLCBlbnYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKG5vZGUsIGVudik7XG4gICAgfVxuXG59Il19