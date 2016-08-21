'use strict';

exports.__esModule = true;
exports.TemplateNodeCallExpression = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeCallExpression = exports.TemplateNodeCallExpression = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeCallExpression, _TemplateNode);

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeCallExpression(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeCallExpression);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        Object.assign(_this, node);
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodeCallExpression.prototype.compile = function compile() {
        return this.path.compileMethod(this.params);
    };

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     * 
     * @returns {TemplateNodeCallExpression}
     */


    TemplateNodeCallExpression.factory = function factory(node, env) {
        node.path = env.factoryPath(node.path);
        node.params = node.params.map(function (param) {
            return env.factory(param);
        });

        return new this(node, env);
    };

    return TemplateNodeCallExpression;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVDYWxsRXhwcmVzc2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRWEsMEIsV0FBQSwwQjs7O0FBRVQ7Ozs7QUFJQSx3Q0FBWSxJQUFaLEVBQWtCLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsbUVBQ25CLHlCQUFNLEdBQU4sQ0FEbUI7O0FBR25CLGVBQU8sTUFBUCxRQUFvQixJQUFwQjtBQUhtQjtBQUl0Qjs7QUFFRDs7Ozs7eUNBR0EsTyxzQkFBVTtBQUNOLGVBQU8sS0FBSyxJQUFMLENBQVUsYUFBVixDQUF3QixLQUFLLE1BQTdCLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OzsrQkFNTyxPLG9CQUFRLEksRUFBTSxHLEVBQUs7QUFDdEIsYUFBSyxJQUFMLEdBQVksSUFBSSxXQUFKLENBQWdCLEtBQUssSUFBckIsQ0FBWjtBQUNBLGFBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0I7QUFBQSxtQkFBUyxJQUFJLE9BQUosQ0FBWSxLQUFaLENBQVQ7QUFBQSxTQUFoQixDQUFkOztBQUVBLGVBQU8sSUFBSSxJQUFKLENBQVMsSUFBVCxFQUFlLEdBQWYsQ0FBUDtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVOb2RlQ2FsbEV4cHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGUnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlQ2FsbEV4cHJlc3Npb24gZXh0ZW5kcyBUZW1wbGF0ZU5vZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iobm9kZSwgZW52KSB7XG4gICAgICAgIHN1cGVyKGVudik7XG4gICAgICAgIFxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY29tcGlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5jb21waWxlTWV0aG9kKHRoaXMucGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBub2RlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlQ2FsbEV4cHJlc3Npb259XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkobm9kZSwgZW52KSB7XG4gICAgICAgIG5vZGUucGF0aCA9IGVudi5mYWN0b3J5UGF0aChub2RlLnBhdGgpO1xuICAgICAgICBub2RlLnBhcmFtcyA9IG5vZGUucGFyYW1zLm1hcChwYXJhbSA9PiBlbnYuZmFjdG9yeShwYXJhbSkpO1xuXG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhub2RlLCBlbnYpO1xuICAgIH1cbiAgICBcbn0iXX0=