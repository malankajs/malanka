'use strict';

exports.__esModule = true;
exports.TemplateNodeComment = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeComment = exports.TemplateNodeComment = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeComment, _TemplateNode);

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeComment(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeComment);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        Object.assign(_this, node);
        return _this;
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeComment}
     */


    TemplateNodeComment.factory = function factory(node, env) {
        return new TemplateNodeComment(node, env);
    };

    return TemplateNodeComment;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVDb21tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSxtQixXQUFBLG1COzs7QUFFVDs7OztBQUlBLGlDQUFZLElBQVosRUFBa0IsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSxtRUFDbkIseUJBQU0sR0FBTixDQURtQjs7QUFHbkIsZUFBTyxNQUFQLFFBQW9CLElBQXBCO0FBSG1CO0FBSXRCOztBQUVEOzs7Ozs7Ozt3QkFNTyxPLG9CQUFRLEksRUFBTSxHLEVBQUs7QUFDdEIsZUFBTyxJQUFJLG1CQUFKLENBQXdCLElBQXhCLEVBQThCLEdBQTlCLENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZUNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGUnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlQ29tbWVudCBleHRlbmRzIFRlbXBsYXRlTm9kZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBub2RlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBlbnYpIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IG5vZGVcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZUNvbW1lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkobm9kZSwgZW52KSB7XG4gICAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVOb2RlQ29tbWVudChub2RlLCBlbnYpO1xuICAgIH1cblxufSJdfQ==