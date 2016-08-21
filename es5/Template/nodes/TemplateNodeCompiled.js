"use strict";

exports.__esModule = true;
exports.TemplateNodeCompiled = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeCompiled = exports.TemplateNodeCompiled = function () {

    /**
     * @param {string} content
     * @param {{}} options
     */
    function TemplateNodeCompiled(content, options) {
        (0, _classCallCheck3.default)(this, TemplateNodeCompiled);

        this.content = content;
        Object.assign(this, options);
    }

    /**
     * @returns {string}
     */


    TemplateNodeCompiled.prototype.toString = function toString() {
        return this.content;
    };

    return TemplateNodeCompiled;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVDb21waWxlZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFhLG9CLFdBQUEsb0I7O0FBRVQ7Ozs7QUFJQSxrQ0FBWSxPQUFaLEVBQXFCLE9BQXJCLEVBQThCO0FBQUE7O0FBQzFCLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxlQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCO0FBQ0g7O0FBRUQ7Ozs7O21DQUdBLFEsdUJBQVc7QUFDUCxlQUFPLEtBQUssT0FBWjtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVOb2RlQ29tcGlsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlQ29tcGlsZWQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge3t9fSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udGVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgICB9XG5cbn0iXX0=