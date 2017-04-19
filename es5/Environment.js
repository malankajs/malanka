'use strict';

exports.__esModule = true;
exports.Environment = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Planner = require('./Data/Planner');

var _DomWrapper = require('./Components/DomWrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Environment = exports.Environment = function () {

    /**
     * @param {{renderer: Renderer}} options
     */
    function Environment() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        (0, _classCallCheck3.default)(this, Environment);

        this.isBrowser = typeof window === 'object';
        this.isServer = !this.isBrowser;

        Object.assign(this, options);

        if (!this.planner) {
            this.planner = new _Planner.Planner();
        }

        if (!this.window) {
            this.window = new _DomWrapper.DomWrapper(this.isBrowser ? window : null);
        }

        if (!this.document) {
            this.document = new _DomWrapper.DomWrapper(this.isBrowser ? document : null);
        }

        if (!this.body) {
            this.body = new _DomWrapper.DomWrapper(this.isBrowser ? document.body : null);
        }
    }

    /**
     * @param {AbstractComponent} component
     * @param {Element} [element]
     */


    Environment.prototype.render = function render(component, element) {
        component.setEnv(this);
        component.render(element);

        return component.getElement();
    };

    return Environment;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9FbnZpcm9ubWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUVhLFcsV0FBQSxXOztBQUVUOzs7QUFHQSwyQkFBMEI7QUFBQSxZQUFkLE9BQWMseURBQUosRUFBSTtBQUFBOztBQUN0QixhQUFLLFNBQUwsR0FBaUIsT0FBTyxNQUFQLEtBQWtCLFFBQW5DO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLENBQUMsS0FBSyxTQUF0Qjs7QUFFQSxlQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCOztBQUVBLFlBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDZixpQkFBSyxPQUFMLEdBQWUsc0JBQWY7QUFDSDs7QUFFRCxZQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2QsaUJBQUssTUFBTCxHQUFjLDJCQUFlLEtBQUssU0FBTCxHQUFpQixNQUFqQixHQUEwQixJQUF6QyxDQUFkO0FBQ0g7O0FBRUQsWUFBSSxDQUFDLEtBQUssUUFBVixFQUFvQjtBQUNoQixpQkFBSyxRQUFMLEdBQWdCLDJCQUFlLEtBQUssU0FBTCxHQUFpQixRQUFqQixHQUE0QixJQUEzQyxDQUFoQjtBQUNIOztBQUVELFlBQUksQ0FBQyxLQUFLLElBQVYsRUFBZ0I7QUFDWixpQkFBSyxJQUFMLEdBQVksMkJBQWUsS0FBSyxTQUFMLEdBQWlCLFNBQVMsSUFBMUIsR0FBaUMsSUFBaEQsQ0FBWjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7OzswQkFJQSxNLG1CQUFPLFMsRUFBVyxPLEVBQVM7QUFDdkIsa0JBQVUsTUFBVixDQUFpQixJQUFqQjtBQUNBLGtCQUFVLE1BQVYsQ0FBaUIsT0FBakI7O0FBRUEsZUFBTyxVQUFVLFVBQVYsRUFBUDtBQUNILEsiLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BsYW5uZXJ9IGZyb20gJy4vRGF0YS9QbGFubmVyJztcbmltcG9ydCB7RG9tV3JhcHBlcn0gZnJvbSAnLi9Db21wb25lbnRzL0RvbVdyYXBwZXInO1xuXG5leHBvcnQgY2xhc3MgRW52aXJvbm1lbnQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7cmVuZGVyZXI6IFJlbmRlcmVyfX0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnO1xuICAgICAgICB0aGlzLmlzU2VydmVyID0gIXRoaXMuaXNCcm93c2VyO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBsYW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMucGxhbm5lciA9IG5ldyBQbGFubmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMud2luZG93KSB7XG4gICAgICAgICAgICB0aGlzLndpbmRvdyA9IG5ldyBEb21XcmFwcGVyKHRoaXMuaXNCcm93c2VyID8gd2luZG93IDogbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQgPSBuZXcgRG9tV3JhcHBlcih0aGlzLmlzQnJvd3NlciA/IGRvY3VtZW50IDogbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuYm9keSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5ID0gbmV3IERvbVdyYXBwZXIodGhpcy5pc0Jyb3dzZXIgPyBkb2N1bWVudC5ib2R5IDogbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0Q29tcG9uZW50fSBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IFtlbGVtZW50XVxuICAgICAqL1xuICAgIHJlbmRlcihjb21wb25lbnQsIGVsZW1lbnQpIHtcbiAgICAgICAgY29tcG9uZW50LnNldEVudih0aGlzKTtcbiAgICAgICAgY29tcG9uZW50LnJlbmRlcihlbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gY29tcG9uZW50LmdldEVsZW1lbnQoKTtcbiAgICB9XG5cbn0iXX0=