'use strict';

exports.__esModule = true;
exports.TemplateCompiler = exports.DEFAULTS = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _TemplateParser = require('./TemplateParser');

var _TemplateOptimizer = require('./TemplateOptimizer');

var _TemplateEnvironment = require('./TemplateEnvironment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = exports.DEFAULTS = {
    knownAttributes: ['class', 'id', 'value', 'name', 'style'],
    helpers: {},
    components: {}
};

var TemplateCompiler = exports.TemplateCompiler = function () {
    function TemplateCompiler() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS : arguments[0];

        var _ref$components = _ref.components;
        var components = _ref$components === undefined ? DEFAULTS.components : _ref$components;
        var _ref$helpers = _ref.helpers;
        var helpers = _ref$helpers === undefined ? DEFAULTS.helpers : _ref$helpers;
        var _ref$knownAttributes = _ref.knownAttributes;
        var knownAttributes = _ref$knownAttributes === undefined ? DEFAULTS.knownAttributes : _ref$knownAttributes;
        var optimize = _ref.optimize;
        (0, _classCallCheck3.default)(this, TemplateCompiler);

        this.imports = {};
        this.counter = 0;

        this.helpers = helpers;
        this.optimize = optimize;
        this.components = components;
        this.knownAttributes = knownAttributes;
    }

    /**
     * @param {string} template
     * @returns {string}
     */


    TemplateCompiler.prototype.compileString = function compileString(template) {
        var AST = (0, _TemplateParser.parse)(template),
            env = new _TemplateEnvironment.TemplateEnvironment({
            components: this.components,
            helpers: this.helpers,
            knownAttributes: this.knownAttributes
        }),
            content = env.factoryContent(AST),
            optimizer = new _TemplateOptimizer.TemplateOptimizer(this.optimize);

        return env.compile(optimizer.optimize(content));
    };

    return TemplateCompiler;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9UZW1wbGF0ZS9UZW1wbGF0ZUNvbXBpbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRU8sSUFBTSw4QkFBVztBQUNwQixxQkFBaUIsQ0FBQyxPQUFELEVBQVUsSUFBVixFQUFnQixPQUFoQixFQUF5QixNQUF6QixFQUFpQyxPQUFqQyxDQURHO0FBRXBCLGFBQVMsRUFGVztBQUdwQixnQkFBWTtBQUhRLENBQWpCOztJQU1NLGdCLFdBQUEsZ0I7QUFFVCxnQ0FBNkk7QUFBQSx5RUFBVixRQUFVOztBQUFBLG1DQUFoSSxVQUFnSTtBQUFBLFlBQWhJLFVBQWdJLG1DQUFuSCxTQUFTLFVBQTBHO0FBQUEsZ0NBQTlGLE9BQThGO0FBQUEsWUFBOUYsT0FBOEYsZ0NBQXBGLFNBQVMsT0FBMkU7QUFBQSx3Q0FBbEUsZUFBa0U7QUFBQSxZQUFsRSxlQUFrRSx3Q0FBaEQsU0FBUyxlQUF1QztBQUFBLFlBQXRCLFFBQXNCLFFBQXRCLFFBQXNCO0FBQUE7O0FBQ3pJLGFBQUssT0FBTCxHQUFlLEVBQWY7QUFDQSxhQUFLLE9BQUwsR0FBZSxDQUFmOztBQUVBLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxhQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDSDs7QUFFRDs7Ozs7OytCQUlBLGEsMEJBQWMsUSxFQUFVO0FBQ3BCLFlBQUksTUFBTSwyQkFBTSxRQUFOLENBQVY7QUFBQSxZQUNJLE1BQU0sNkNBQXdCO0FBQzFCLHdCQUFZLEtBQUssVUFEUztBQUUxQixxQkFBUyxLQUFLLE9BRlk7QUFHMUIsNkJBQWlCLEtBQUs7QUFISSxTQUF4QixDQURWO0FBQUEsWUFNSSxVQUFVLElBQUksY0FBSixDQUFtQixHQUFuQixDQU5kO0FBQUEsWUFPSSxZQUFZLHlDQUFzQixLQUFLLFFBQTNCLENBUGhCOztBQVNBLGVBQU8sSUFBSSxPQUFKLENBQVksVUFBVSxRQUFWLENBQW1CLE9BQW5CLENBQVosQ0FBUDtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVDb21waWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cGFyc2V9IGZyb20gJy4vVGVtcGxhdGVQYXJzZXInO1xuaW1wb3J0IHtUZW1wbGF0ZU9wdGltaXplcn0gZnJvbSAnLi9UZW1wbGF0ZU9wdGltaXplcic7XG5pbXBvcnQge1RlbXBsYXRlRW52aXJvbm1lbnR9IGZyb20gJy4vVGVtcGxhdGVFbnZpcm9ubWVudCc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgICBrbm93bkF0dHJpYnV0ZXM6IFsnY2xhc3MnLCAnaWQnLCAndmFsdWUnLCAnbmFtZScsICdzdHlsZSddLFxuICAgIGhlbHBlcnM6IHt9LFxuICAgIGNvbXBvbmVudHM6IHt9XG59O1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVDb21waWxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih7Y29tcG9uZW50cyA9IERFRkFVTFRTLmNvbXBvbmVudHMsIGhlbHBlcnMgPSBERUZBVUxUUy5oZWxwZXJzLCBrbm93bkF0dHJpYnV0ZXMgPSBERUZBVUxUUy5rbm93bkF0dHJpYnV0ZXMsIG9wdGltaXplfSA9IERFRkFVTFRTKSB7XG4gICAgICAgIHRoaXMuaW1wb3J0cyA9IHt9O1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuXG4gICAgICAgIHRoaXMuaGVscGVycyA9IGhlbHBlcnM7XG4gICAgICAgIHRoaXMub3B0aW1pemUgPSBvcHRpbWl6ZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgdGhpcy5rbm93bkF0dHJpYnV0ZXMgPSBrbm93bkF0dHJpYnV0ZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlU3RyaW5nKHRlbXBsYXRlKSB7XG4gICAgICAgIHZhciBBU1QgPSBwYXJzZSh0ZW1wbGF0ZSksXG4gICAgICAgICAgICBlbnYgPSBuZXcgVGVtcGxhdGVFbnZpcm9ubWVudCh7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50czogdGhpcy5jb21wb25lbnRzLFxuICAgICAgICAgICAgICAgIGhlbHBlcnM6IHRoaXMuaGVscGVycyxcbiAgICAgICAgICAgICAgICBrbm93bkF0dHJpYnV0ZXM6IHRoaXMua25vd25BdHRyaWJ1dGVzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNvbnRlbnQgPSBlbnYuZmFjdG9yeUNvbnRlbnQoQVNUKSxcbiAgICAgICAgICAgIG9wdGltaXplciA9IG5ldyBUZW1wbGF0ZU9wdGltaXplcih0aGlzLm9wdGltaXplKTtcblxuICAgICAgICByZXR1cm4gZW52LmNvbXBpbGUob3B0aW1pemVyLm9wdGltaXplKGNvbnRlbnQpKTtcbiAgICB9XG5cbn0iXX0=