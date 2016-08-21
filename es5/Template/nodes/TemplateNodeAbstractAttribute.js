'use strict';

exports.__esModule = true;
exports.TemplateNodeAbstractAttribute = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

var _TemplateNodeVar = require('./TemplateNodeVar');

var _TemplateNodeCallExpression = require('./TemplateNodeCallExpression');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeAbstractAttribute = exports.TemplateNodeAbstractAttribute = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeAbstractAttribute, _TemplateNode);

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeAbstractAttribute(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeAbstractAttribute);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        Object.assign(_this, node);

        if (_this.name.slice(0, 2) == 'on') {
            _this.event = true;
            _this.name = _this.name.slice(2);
        }
        return _this;
    }

    /**
     * @returns {{}}
     */


    TemplateNodeAbstractAttribute.prototype.compileHash = function compileHash() {
        var _this2 = this;

        return this.env.scope({ isString: true }, function () {
            var _ref;

            return _ref = {}, _ref[_this2.name] = _this2.value.compile(), _ref;
        });
    };

    /**
     * @returns {{}}
     */


    TemplateNodeAbstractAttribute.prototype.compileEvent = function compileEvent() {
        if (this.value instanceof _TemplateNodeVar.TemplateNodeVar) {
            var _ref2;

            return _ref2 = {}, _ref2[this.name] = this.value.compileMethod(), _ref2;
        } else if (this.value instanceof _TemplateNodeCallExpression.TemplateNodeCallExpression) {
            var _ref3;

            return _ref3 = {}, _ref3[this.name] = this.value.compile(), _ref3;
        } else {
            throw new Error('Event value must be expression');
        }
    };

    /**
     * @returns {boolean}
     */


    TemplateNodeAbstractAttribute.prototype.isKnownAttribute = function isKnownAttribute() {
        return this.env.isKnownAttribute(this.name);
    };

    /**
     * @returns {boolean}
     */


    TemplateNodeAbstractAttribute.prototype.isEvent = function isEvent() {
        return Boolean(this.event);
    };

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeAbstractAttribute}
     */


    TemplateNodeAbstractAttribute.factory = function factory(node, env) {
        var prepareValue = function prepareValue(value) {
            if (Array.isArray(value)) {
                if (value.length === 1) {
                    value = value[0];
                } else {
                    return env.factoryStringProxy(value);
                }
            }

            if (typeof value === 'string') {
                return env.factoryString(value);
            } else {
                return env.factory(value);
            }
        };

        node.value = prepareValue(node.value);

        return new this(node, env);
    };

    return TemplateNodeAbstractAttribute;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVBYnN0cmFjdEF0dHJpYnV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0lBRWEsNkIsV0FBQSw2Qjs7O0FBRVQ7Ozs7QUFJQSwyQ0FBWSxJQUFaLEVBQWtCLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsbUVBQ25CLHlCQUFNLEdBQU4sQ0FEbUI7O0FBR25CLGVBQU8sTUFBUCxRQUFvQixJQUFwQjs7QUFFQSxZQUFJLE1BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsS0FBeUIsSUFBN0IsRUFBbUM7QUFDL0Isa0JBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxrQkFBSyxJQUFMLEdBQVksTUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixDQUFaO0FBQ0g7QUFSa0I7QUFTdEI7O0FBRUQ7Ozs7OzRDQUdBLFcsMEJBQWM7QUFBQTs7QUFDVixlQUFPLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxFQUFDLFVBQVUsSUFBWCxFQUFmLEVBQWlDLFlBQU07QUFBQTs7QUFDMUMsbUNBQ0ssT0FBSyxJQURWLElBQ2lCLE9BQUssS0FBTCxDQUFXLE9BQVgsRUFEakI7QUFHSCxTQUpNLENBQVA7QUFLSCxLOztBQUVEOzs7Ozs0Q0FHQSxZLDJCQUFlO0FBQ1gsWUFBSSxLQUFLLEtBQUwsNENBQUosRUFBMkM7QUFBQTs7QUFDdkMscUNBQ0ssS0FBSyxJQURWLElBQ2lCLEtBQUssS0FBTCxDQUFXLGFBQVgsRUFEakI7QUFHSCxTQUpELE1BSU8sSUFBSSxLQUFLLEtBQUwsa0VBQUosRUFBc0Q7QUFBQTs7QUFDekQscUNBQ0ssS0FBSyxJQURWLElBQ2lCLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFEakI7QUFHSCxTQUpNLE1BSUE7QUFDSCxrQkFBTSxJQUFJLEtBQUosQ0FBVSxnQ0FBVixDQUFOO0FBQ0g7QUFDSixLOztBQUVEOzs7Ozs0Q0FHQSxnQiwrQkFBbUI7QUFDZixlQUFPLEtBQUssR0FBTCxDQUFTLGdCQUFULENBQTBCLEtBQUssSUFBL0IsQ0FBUDtBQUNILEs7O0FBRUQ7Ozs7OzRDQUdBLE8sc0JBQVU7QUFDTixlQUFPLFFBQVEsS0FBSyxLQUFiLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OztrQ0FNTyxPLG9CQUFRLEksRUFBTSxHLEVBQUs7QUFDdEIsWUFBSSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUMxQixnQkFBSSxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBQUosRUFBMEI7QUFDdEIsb0JBQUksTUFBTSxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLDRCQUFRLE1BQU0sQ0FBTixDQUFSO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPLElBQUksa0JBQUosQ0FBdUIsS0FBdkIsQ0FBUDtBQUNIO0FBQ0o7O0FBRUQsZ0JBQUksT0FBTyxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzNCLHVCQUFPLElBQUksYUFBSixDQUFrQixLQUFsQixDQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sSUFBSSxPQUFKLENBQVksS0FBWixDQUFQO0FBQ0g7QUFDSixTQWREOztBQWdCQSxhQUFLLEtBQUwsR0FBYSxhQUFhLEtBQUssS0FBbEIsQ0FBYjs7QUFFQSxlQUFPLElBQUksSUFBSixDQUFTLElBQVQsRUFBZSxHQUFmLENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZUFic3RyYWN0QXR0cmlidXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU5vZGV9IGZyb20gJy4vVGVtcGxhdGVOb2RlJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlVmFyfSBmcm9tICcuL1RlbXBsYXRlTm9kZVZhcic7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUNhbGxFeHByZXNzaW9ufSBmcm9tIFwiLi9UZW1wbGF0ZU5vZGVDYWxsRXhwcmVzc2lvblwiO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlQWJzdHJhY3RBdHRyaWJ1dGUgZXh0ZW5kcyBUZW1wbGF0ZU5vZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iobm9kZSwgZW52KSB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBub2RlKTtcblxuICAgICAgICBpZiAodGhpcy5uYW1lLnNsaWNlKDAsIDIpID09ICdvbicpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5uYW1lLnNsaWNlKDIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGNvbXBpbGVIYXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnYuc2NvcGUoe2lzU3RyaW5nOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBbdGhpcy5uYW1lXTogdGhpcy52YWx1ZS5jb21waWxlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHt7fX1cbiAgICAgKi9cbiAgICBjb21waWxlRXZlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlVmFyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFt0aGlzLm5hbWVdOiB0aGlzLnZhbHVlLmNvbXBpbGVNZXRob2QoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlQ2FsbEV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW3RoaXMubmFtZV06IHRoaXMudmFsdWUuY29tcGlsZSgpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB2YWx1ZSBtdXN0IGJlIGV4cHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzS25vd25BdHRyaWJ1dGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudi5pc0tub3duQXR0cmlidXRlKHRoaXMubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNFdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5ldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlQWJzdHJhY3RBdHRyaWJ1dGV9XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkobm9kZSwgZW52KSB7XG4gICAgICAgIGxldCBwcmVwYXJlVmFsdWUgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVswXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW52LmZhY3RvcnlTdHJpbmdQcm94eSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnYuZmFjdG9yeVN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnYuZmFjdG9yeSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbm9kZS52YWx1ZSA9IHByZXBhcmVWYWx1ZShub2RlLnZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IHRoaXMobm9kZSwgZW52KTtcbiAgICB9XG5cbn0iXX0=