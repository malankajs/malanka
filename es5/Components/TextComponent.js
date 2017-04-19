'use strict';

exports.__esModule = true;
exports.TextComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _desc, _value, _class;

var _AbstractComponent2 = require('./AbstractComponent');

var _ValueProxy = require('../Data/ValueProxy');

var _PlannerWrite = require('../Decorators/PlannerWrite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var TextComponent = exports.TextComponent = (_dec = (0, _PlannerWrite.PlannerWrite)(), (_class = function (_AbstractComponent) {
    (0, _inherits3.default)(TextComponent, _AbstractComponent);

    /**
     * @param {{[env]: Environment}} options
     */
    function TextComponent() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        (0, _classCallCheck3.default)(this, TextComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, _AbstractComponent.call(this, options));

        Object.assign(_this, options);
        return _this;
    }

    /**
     * @param {Element} element
     */


    TextComponent.prototype.render = function render() {
        var _this2 = this;

        var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        if (!this.isRendered()) {
            if (this.content instanceof _ValueProxy.ValueProxy) {
                this.listenTo(this.content, function (value) {
                    return _this2.setContent(value);
                });
            }

            if (element) {
                this.element = element;
            } else {
                this.element = this.getRenderer().createTextNode();
                this._setContent(this.content);
            }
        }

        this._isRendered = true;
    };

    /**
     * Set content of node
     *
     * @param {string} content
     */


    TextComponent.prototype.setContent = function setContent(content) {
        if (this.isRendered()) {
            this._setContent(content);
        }
    };

    /**
     * Set content of node
     *
     * @param {string} content
     */


    TextComponent.prototype._setContent = function _setContent(content) {
        this.getRenderer().setContent(this.element, String(content));
    };

    return TextComponent;
}(_AbstractComponent2.AbstractComponent), (_applyDecoratedDescriptor(_class.prototype, 'setContent', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'setContent'), _class.prototype)), _class));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL1RleHRDb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYSxhLFdBQUEsYSxXQW9DUixpQzs7O0FBbENEOzs7QUFHQSw2QkFBMEI7QUFBQSxZQUFkLE9BQWMseURBQUosRUFBSTtBQUFBOztBQUFBLG1FQUN0Qiw4QkFBTSxPQUFOLENBRHNCOztBQUd0QixlQUFPLE1BQVAsUUFBb0IsT0FBcEI7QUFIc0I7QUFJekI7O0FBRUQ7Ozs7OzRCQUdBLE0scUJBQXVCO0FBQUE7O0FBQUEsWUFBaEIsT0FBZ0IseURBQU4sSUFBTTs7QUFDbkIsWUFBSSxDQUFDLEtBQUssVUFBTCxFQUFMLEVBQXdCO0FBQ3BCLGdCQUFJLEtBQUssT0FBTCxrQ0FBSixFQUF3QztBQUNwQyxxQkFBSyxRQUFMLENBQWMsS0FBSyxPQUFuQixFQUE0QixVQUFDLEtBQUQ7QUFBQSwyQkFBVyxPQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBWDtBQUFBLGlCQUE1QjtBQUNIOztBQUVELGdCQUFJLE9BQUosRUFBYTtBQUNULHFCQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssT0FBTCxHQUFlLEtBQUssV0FBTCxHQUFtQixjQUFuQixFQUFmO0FBQ0EscUJBQUssV0FBTCxDQUFpQixLQUFLLE9BQXRCO0FBQ0g7QUFDSjs7QUFFRCxhQUFLLFdBQUwsR0FBbUIsSUFBbkI7QUFDSCxLOztBQUVEOzs7Ozs7OzRCQU1BLFUsdUJBQVcsTyxFQUFTO0FBQ2hCLFlBQUksS0FBSyxVQUFMLEVBQUosRUFBdUI7QUFDbkIsaUJBQUssV0FBTCxDQUFpQixPQUFqQjtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7Ozs0QkFLQSxXLHdCQUFZLE8sRUFBUztBQUNqQixhQUFLLFdBQUwsR0FBbUIsVUFBbkIsQ0FBOEIsS0FBSyxPQUFuQyxFQUE0QyxPQUFPLE9BQVAsQ0FBNUM7QUFDSCxLIiwiZmlsZSI6IlRleHRDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuL0Fic3RyYWN0Q29tcG9uZW50JztcbmltcG9ydCB7VmFsdWVQcm94eX0gZnJvbSAnLi4vRGF0YS9WYWx1ZVByb3h5JztcbmltcG9ydCB7UGxhbm5lcldyaXRlfSBmcm9tICcuLi9EZWNvcmF0b3JzL1BsYW5uZXJXcml0ZSc7XG5cbmV4cG9ydCBjbGFzcyBUZXh0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7W2Vudl06IEVudmlyb25tZW50fX0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqL1xuICAgIHJlbmRlcihlbGVtZW50ID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNSZW5kZXJlZCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50IGluc3RhbmNlb2YgVmFsdWVQcm94eSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250ZW50LCAodmFsdWUpID0+IHRoaXMuc2V0Q29udGVudCh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZ2V0UmVuZGVyZXIoKS5jcmVhdGVUZXh0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldENvbnRlbnQodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzUmVuZGVyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBjb250ZW50IG9mIG5vZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAgICovXG4gICAgQFBsYW5uZXJXcml0ZSgpXG4gICAgc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0Q29udGVudChjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBjb250ZW50IG9mIG5vZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gICAgICovXG4gICAgX3NldENvbnRlbnQoY29udGVudCkge1xuICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuc2V0Q29udGVudCh0aGlzLmVsZW1lbnQsIFN0cmluZyhjb250ZW50KSk7XG4gICAgfVxuXG59Il19