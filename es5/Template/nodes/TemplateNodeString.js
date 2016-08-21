'use strict';

exports.__esModule = true;
exports.TemplateNodeString = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeString = exports.TemplateNodeString = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeString, _TemplateNode);

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeString(string, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeString);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        _this.string = string;
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodeString.prototype.compile = function compile() {
        return JSON.stringify(this.string);
    };

    /**
     * @param {string|{content: string}} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeString}
     */


    TemplateNodeString.factory = function factory(string, env) {
        if (typeof string === 'object') {
            string = string.content;
        }

        return new TemplateNodeString(string, env);
    };

    return TemplateNodeString;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVTdHJpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUVhLGtCLFdBQUEsa0I7OztBQUVUOzs7O0FBSUEsZ0NBQVksTUFBWixFQUFvQixHQUFwQixFQUF5QjtBQUFBOztBQUFBLG1FQUNyQix5QkFBTSxHQUFOLENBRHFCOztBQUdyQixjQUFLLE1BQUwsR0FBYyxNQUFkO0FBSHFCO0FBSXhCOztBQUVEOzs7OztpQ0FHQSxPLHNCQUFVO0FBQ04sZUFBTyxLQUFLLFNBQUwsQ0FBZSxLQUFLLE1BQXBCLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7Ozt1QkFNTyxPLG9CQUFRLE0sRUFBUSxHLEVBQUs7QUFDeEIsWUFBSSxPQUFPLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDNUIscUJBQVMsT0FBTyxPQUFoQjtBQUNIOztBQUVELGVBQU8sSUFBSSxrQkFBSixDQUF1QixNQUF2QixFQUErQixHQUEvQixDQUFQO0FBQ0gsSyIsImZpbGUiOiJUZW1wbGF0ZU5vZGVTdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGUnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlU3RyaW5nIGV4dGVuZHMgVGVtcGxhdGVOb2RlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZywgZW52KSB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5zdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHtjb250ZW50OiBzdHJpbmd9fSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZmFjdG9yeShzdHJpbmcsIGVudikge1xuICAgICAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5jb250ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVTdHJpbmcoc3RyaW5nLCBlbnYpO1xuICAgIH1cblxufSJdfQ==