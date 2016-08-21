'use strict';

exports.__esModule = true;
exports.WatchComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Component2 = require('./Component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WatchComponent = exports.WatchComponent = function (_Component) {
    (0, _inherits3.default)(WatchComponent, _Component);

    function WatchComponent() {
        (0, _classCallCheck3.default)(this, WatchComponent);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    /**
     * @param args
     *
     * @returns {*}
     */
    WatchComponent.prototype.render = function render() {
        var _this2 = this,
            _Component$prototype$;

        if (!this.isRendered()) {
            this.listenTo(this.value, function () {
                return _this2.render();
            });
        }

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return (_Component$prototype$ = _Component.prototype.render).call.apply(_Component$prototype$, [this].concat(args));
    };

    return WatchComponent;
}(_Component2.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL1dhdGNoQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSxjLFdBQUEsYzs7Ozs7Ozs7QUFFVDs7Ozs7NkJBS0EsTSxxQkFBZ0I7QUFBQTtBQUFBOztBQUNaLFlBQUksQ0FBQyxLQUFLLFVBQUwsRUFBTCxFQUF3QjtBQUNwQixpQkFBSyxRQUFMLENBQWMsS0FBSyxLQUFuQixFQUEwQjtBQUFBLHVCQUFNLE9BQUssTUFBTCxFQUFOO0FBQUEsYUFBMUI7QUFDSDs7QUFIVywwQ0FBTixJQUFNO0FBQU4sZ0JBQU07QUFBQTs7QUFLWixlQUFPLDhDQUFNLE1BQU4sa0RBQWdCLElBQWhCLEVBQVA7QUFDSCxLIiwiZmlsZSI6IldhdGNoQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIFdhdGNoQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICByZW5kZXIoLi4uYXJncykge1xuICAgICAgICBpZiAoIXRoaXMuaXNSZW5kZXJlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMudmFsdWUsICgpID0+IHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlbmRlciguLi5hcmdzKTtcbiAgICB9XG5cbn0iXX0=