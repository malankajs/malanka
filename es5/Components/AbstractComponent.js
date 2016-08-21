'use strict';

exports.__esModule = true;
exports.AbstractComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Events2 = require('../Data/Events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbstractComponent = exports.AbstractComponent = function (_Events) {
    (0, _inherits3.default)(AbstractComponent, _Events);

    /**
     * @param {{}} options
     */
    function AbstractComponent(options) {
        (0, _classCallCheck3.default)(this, AbstractComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Events.call(this));

        _this.components = [];
        _this.options = options;

        //
        // if (module.hot) {
        //     this.constructor.instances = this.constructor.instances || [];
        //     this.constructor.instances.push(this);
        // }
        return _this;
    }

    /**
     * @param {Environment} env
     */


    AbstractComponent.prototype.setEnv = function setEnv(env) {
        this.env = env;
    };

    /**
     * @returns {Environment}
     */


    AbstractComponent.prototype.getEnv = function getEnv() {
        return this.env;
    };

    /**
     * @returns {Renderer}
     */


    AbstractComponent.prototype.getRenderer = function getRenderer() {
        return this.getEnv().renderer;
    };

    /**
     * @returns {Planner}
     */


    AbstractComponent.prototype.getPlanner = function getPlanner() {
        return this.getEnv().planner;
    };

    /**
     * @returns {*}
     */


    AbstractComponent.prototype.getElement = function getElement() {
        if (this.element === undefined) {
            throw new Error('Component is not rendered');
        }

        return this.element;
    };

    /**
     * @returns {boolean}
     */


    AbstractComponent.prototype.isRendered = function isRendered() {
        return this._isRendered && this.element !== undefined;
    };

    /**
     * Destroy component
     */


    AbstractComponent.prototype.destroy = function destroy() {
        this._isRendered = false;
        this.stopListening();

        if (this.element) {
            this.getRenderer().removeChild(null, this.element);
            this.element = undefined;
        }
    };

    return AbstractComponent;
}(_Events2.Events);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL0Fic3RyYWN0Q29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSxpQixXQUFBLGlCOzs7QUFFVDs7O0FBR0EsK0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBLG1FQUNqQixrQkFEaUI7O0FBR2pCLGNBQUssVUFBTCxHQUFrQixFQUFsQjtBQUNBLGNBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZpQjtBQVdwQjs7QUFFRDs7Ozs7Z0NBR0EsTSxtQkFBTyxHLEVBQUs7QUFDUixhQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0gsSzs7QUFFRDs7Ozs7Z0NBR0EsTSxxQkFBUztBQUNMLGVBQU8sS0FBSyxHQUFaO0FBQ0gsSzs7QUFFRDs7Ozs7Z0NBR0EsVywwQkFBYztBQUNWLGVBQU8sS0FBSyxNQUFMLEdBQWMsUUFBckI7QUFDSCxLOztBQUVEOzs7OztnQ0FHQSxVLHlCQUFhO0FBQ1QsZUFBTyxLQUFLLE1BQUwsR0FBYyxPQUFyQjtBQUNILEs7O0FBRUQ7Ozs7O2dDQUdBLFUseUJBQWE7QUFDVCxZQUFJLEtBQUssT0FBTCxLQUFpQixTQUFyQixFQUFnQztBQUM1QixrQkFBTSxJQUFJLEtBQUosQ0FBVSwyQkFBVixDQUFOO0FBQ0g7O0FBRUQsZUFBTyxLQUFLLE9BQVo7QUFDSCxLOztBQUVEOzs7OztnQ0FHQSxVLHlCQUFhO0FBQ1QsZUFBTyxLQUFLLFdBQUwsSUFBb0IsS0FBSyxPQUFMLEtBQWlCLFNBQTVDO0FBQ0gsSzs7QUFFRDs7Ozs7Z0NBR0EsTyxzQkFBVTtBQUNOLGFBQUssV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUssYUFBTDs7QUFFQSxZQUFJLEtBQUssT0FBVCxFQUFrQjtBQUNkLGlCQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FBK0IsSUFBL0IsRUFBcUMsS0FBSyxPQUExQztBQUNBLGlCQUFLLE9BQUwsR0FBZSxTQUFmO0FBQ0g7QUFDSixLIiwiZmlsZSI6IkFic3RyYWN0Q29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudHN9IGZyb20gJy4uL0RhdGEvRXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIEFic3RyYWN0Q29tcG9uZW50IGV4dGVuZHMgRXZlbnRzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICAvL1xuICAgICAgICAvLyBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICAvLyAgICAgdGhpcy5jb25zdHJ1Y3Rvci5pbnN0YW5jZXMgPSB0aGlzLmNvbnN0cnVjdG9yLmluc3RhbmNlcyB8fCBbXTtcbiAgICAgICAgLy8gICAgIHRoaXMuY29uc3RydWN0b3IuaW5zdGFuY2VzLnB1c2godGhpcyk7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbnZpcm9ubWVudH0gZW52XG4gICAgICovXG4gICAgc2V0RW52KGVudikge1xuICAgICAgICB0aGlzLmVudiA9IGVudjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7RW52aXJvbm1lbnR9XG4gICAgICovXG4gICAgZ2V0RW52KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1JlbmRlcmVyfVxuICAgICAqL1xuICAgIGdldFJlbmRlcmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbnYoKS5yZW5kZXJlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UGxhbm5lcn1cbiAgICAgKi9cbiAgICBnZXRQbGFubmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFbnYoKS5wbGFubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldEVsZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzUmVuZGVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JlbmRlcmVkICYmIHRoaXMuZWxlbWVudCAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgY29tcG9uZW50XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5faXNSZW5kZXJlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkucmVtb3ZlQ2hpbGQobnVsbCwgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==