'use strict';

exports.__esModule = true;
exports.DomWrapper = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Events2 = require('../Data/Events');

var _ValueProxy = require('../Data/ValueProxy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DomWrapper = exports.DomWrapper = function (_Events) {
    (0, _inherits3.default)(DomWrapper, _Events);

    /**
     * @param {Element} element
     */
    function DomWrapper(element) {
        (0, _classCallCheck3.default)(this, DomWrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Events.call(this));

        _this._element = element;
        _this._events = {};
        return _this;
    }

    /**
     * @param eventName
     * @returns {*}
     */


    DomWrapper.prototype.event = function event(eventName) {
        var element = this._element;

        if (!this._events[eventName]) {
            this._events[eventName] = new _ValueProxy.ValueProxy({
                subscribe: function subscribe() {
                    var _this2 = this;

                    if (element) {
                        this._callback = function (event) {
                            _this2.emitValue(event);
                        };

                        element.addEventListener(eventName, this._callback);
                    }
                },
                unsubscribe: function unsubscribe() {
                    if (element && this._callback) {
                        element.removeEventListener(eventName, this._callback);
                    }
                }
            });
        }

        return this._events[eventName];
    };

    return DomWrapper;
}(_Events2.Events);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL0RvbVdyYXBwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUVhLFUsV0FBQSxVOzs7QUFFVDs7O0FBR0Esd0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBLG1FQUNqQixrQkFEaUI7O0FBR2pCLGNBQUssUUFBTCxHQUFnQixPQUFoQjtBQUNBLGNBQUssT0FBTCxHQUFlLEVBQWY7QUFKaUI7QUFLcEI7O0FBRUQ7Ozs7Ozt5QkFJQSxLLGtCQUFNLFMsRUFBVztBQUNiLFlBQUksVUFBVSxLQUFLLFFBQW5COztBQUVBLFlBQUksQ0FBQyxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQUwsRUFBOEI7QUFDMUIsaUJBQUssT0FBTCxDQUFhLFNBQWIsSUFBMEIsMkJBQWU7QUFDckMseUJBRHFDLHVCQUN6QjtBQUFBOztBQUNSLHdCQUFJLE9BQUosRUFBYTtBQUNULDZCQUFLLFNBQUwsR0FBaUIsVUFBQyxLQUFELEVBQVc7QUFDeEIsbUNBQUssU0FBTCxDQUFlLEtBQWY7QUFDSCx5QkFGRDs7QUFJQSxnQ0FBUSxnQkFBUixDQUF5QixTQUF6QixFQUFvQyxLQUFLLFNBQXpDO0FBQ0g7QUFDSixpQkFUb0M7QUFVckMsMkJBVnFDLHlCQVV2QjtBQUNWLHdCQUFJLFdBQVcsS0FBSyxTQUFwQixFQUErQjtBQUMzQixnQ0FBUSxtQkFBUixDQUE0QixTQUE1QixFQUF1QyxLQUFLLFNBQTVDO0FBQ0g7QUFDSjtBQWRvQyxhQUFmLENBQTFCO0FBZ0JIOztBQUVELGVBQU8sS0FBSyxPQUFMLENBQWEsU0FBYixDQUFQO0FBQ0gsSyIsImZpbGUiOiJEb21XcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudHN9IGZyb20gJy4uL0RhdGEvRXZlbnRzJztcbmltcG9ydCB7VmFsdWVQcm94eX0gZnJvbSAnLi4vRGF0YS9WYWx1ZVByb3h5JztcblxuZXhwb3J0IGNsYXNzIERvbVdyYXBwZXIgZXh0ZW5kcyBFdmVudHMge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZXZlbnQoZXZlbnROYW1lKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudDtcblxuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHNbZXZlbnROYW1lXSA9IG5ldyBWYWx1ZVByb3h5KHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFZhbHVlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMuX2NhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ICYmIHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB0aGlzLl9jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHNbZXZlbnROYW1lXTtcbiAgICB9XG5cbn0iXX0=