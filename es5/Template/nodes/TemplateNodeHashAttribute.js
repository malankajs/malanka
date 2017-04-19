'use strict';

exports.__esModule = true;
exports.TemplateNodeHashAttribute = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNodeAbstractAttribute = require('./TemplateNodeAbstractAttribute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeHashAttribute = exports.TemplateNodeHashAttribute = function (_TemplateNodeAbstract) {
    (0, _inherits3.default)(TemplateNodeHashAttribute, _TemplateNodeAbstract);

    function TemplateNodeHashAttribute() {
        (0, _classCallCheck3.default)(this, TemplateNodeHashAttribute);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateNodeAbstract.apply(this, arguments));
    }

    /**
     * @returns {{}}
     */
    TemplateNodeHashAttribute.prototype.compileHash = function compileHash() {
        var name = this.name;
        var value = this.value;


        if (name !== 'as' && name !== 'scope') {
            var _ref;

            return _ref = {}, _ref[name] = value.compile(), _ref;
        } else {
            return {};
        }
    };

    return TemplateNodeHashAttribute;
}(_TemplateNodeAbstractAttribute.TemplateNodeAbstractAttribute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSx5QixXQUFBLHlCOzs7Ozs7OztBQUVUOzs7d0NBR0EsVywwQkFBYztBQUFBLFlBQ0wsSUFESyxHQUNVLElBRFYsQ0FDTCxJQURLO0FBQUEsWUFDQyxLQURELEdBQ1UsSUFEVixDQUNDLEtBREQ7OztBQUdWLFlBQUksU0FBUyxJQUFULElBQWlCLFNBQVMsT0FBOUIsRUFBdUM7QUFBQTs7QUFDbkMsbUNBQ0ssSUFETCxJQUNZLE1BQU0sT0FBTixFQURaO0FBR0gsU0FKRCxNQUlPO0FBQ0gsbUJBQU8sRUFBUDtBQUNIO0FBQ0osSyIsImZpbGUiOiJUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU5vZGVBYnN0cmFjdEF0dHJpYnV0ZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGVBYnN0cmFjdEF0dHJpYnV0ZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlIGV4dGVuZHMgVGVtcGxhdGVOb2RlQWJzdHJhY3RBdHRyaWJ1dGUge1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGNvbXBpbGVIYXNoKCkge1xuICAgICAgICBsZXQge25hbWUsIHZhbHVlfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG5hbWUgIT09ICdhcycgJiYgbmFtZSAhPT0gJ3Njb3BlJykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbbmFtZV06IHZhbHVlLmNvbXBpbGUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==