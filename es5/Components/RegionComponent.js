'use strict';

exports.__esModule = true;
exports.RegionComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Component2 = require('./Component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegionComponent = exports.RegionComponent = function (_Component) {
    (0, _inherits3.default)(RegionComponent, _Component);

    function RegionComponent() {
        (0, _classCallCheck3.default)(this, RegionComponent);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    /**
     * @param args
     *
     * @returns {*}
     */
    RegionComponent.prototype.render = function render() {
        var _this2 = this,
            _Component$prototype$;

        if (!this.isRendered()) {
            this.component.on(function () {
                return _this2.render();
            });
        }

        this.content = this.component.getValue();

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (_Component$prototype$ = _Component.prototype.render).call.apply(_Component$prototype$, [this].concat(args));
    };

    return RegionComponent;
}(_Component2.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL1JlZ2lvbkNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRWEsZSxXQUFBLGU7Ozs7Ozs7O0FBRVQ7Ozs7OzhCQUtBLE0scUJBQWdCO0FBQUE7QUFBQTs7QUFDWixZQUFJLENBQUMsS0FBSyxVQUFMLEVBQUwsRUFBd0I7QUFDcEIsaUJBQUssU0FBTCxDQUFlLEVBQWYsQ0FBa0I7QUFBQSx1QkFBTSxPQUFLLE1BQUwsRUFBTjtBQUFBLGFBQWxCO0FBQ0g7O0FBRUQsYUFBSyxPQUFMLEdBQWUsS0FBSyxTQUFMLENBQWUsUUFBZixFQUFmOztBQUxZLDBDQUFOLElBQU07QUFBTixnQkFBTTtBQUFBOztBQU9aLGVBQU8sOENBQU0sTUFBTixrREFBZ0IsSUFBaEIsRUFBUDtBQUNILEsiLCJmaWxlIjoiUmVnaW9uQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIFJlZ2lvbkNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgcmVuZGVyKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQub24oKCkgPT4gdGhpcy5yZW5kZXIoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmNvbXBvbmVudC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5yZW5kZXIoLi4uYXJncyk7XG4gICAgfVxuXG59Il19