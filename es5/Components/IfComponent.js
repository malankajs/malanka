'use strict';

exports.__esModule = true;
exports.IfComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Component2 = require('./Component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IfComponent = exports.IfComponent = function (_Component) {
    (0, _inherits3.default)(IfComponent, _Component);

    function IfComponent() {
        (0, _classCallCheck3.default)(this, IfComponent);
        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
    }

    IfComponent.prototype.render = function render(element) {
        var _this2 = this;

        if (!this.isRendered()) {
            this.listenTo(this.contentProxy, function () {
                return _this2.render();
            });
        }

        this.content = this.contentProxy.getValue();

        _Component.prototype.render.call(this, element);
    };

    return IfComponent;
}(_Component2.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL0lmQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSxXLFdBQUEsVzs7Ozs7Ozs7MEJBRVQsTSxtQkFBTyxPLEVBQVM7QUFBQTs7QUFDWixZQUFJLENBQUMsS0FBSyxVQUFMLEVBQUwsRUFBd0I7QUFDcEIsaUJBQUssUUFBTCxDQUFjLEtBQUssWUFBbkIsRUFBaUM7QUFBQSx1QkFBTSxPQUFLLE1BQUwsRUFBTjtBQUFBLGFBQWpDO0FBQ0g7O0FBRUQsYUFBSyxPQUFMLEdBQWUsS0FBSyxZQUFMLENBQWtCLFFBQWxCLEVBQWY7O0FBRUEsNkJBQU0sTUFBTixZQUFhLE9BQWI7QUFDSCxLIiwiZmlsZSI6IklmQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJy4vQ29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIElmQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHJlbmRlcihlbGVtZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1JlbmRlcmVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb250ZW50UHJveHksICgpID0+IHRoaXMucmVuZGVyKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5jb250ZW50UHJveHkuZ2V0VmFsdWUoKTtcblxuICAgICAgICBzdXBlci5yZW5kZXIoZWxlbWVudClcbiAgICB9XG5cbn0iXX0=