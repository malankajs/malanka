'use strict';

exports.__esModule = true;
exports.ComponentsScanner = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComponentsScanner = exports.ComponentsScanner = function () {

    /**
     * @param {string[]} components
     * @param {string[]} helpers
     * @param {{}} optimize
     */
    function ComponentsScanner(_ref) {
        var components = _ref.components;
        var helpers = _ref.helpers;

        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var optimize = _ref2.optimize;
        (0, _classCallCheck3.default)(this, ComponentsScanner);

        this._components = components;
        this._helpers = helpers;

        this.optimize = optimize;
    }

    /**
     * Scan paths to resolve Components
     */


    ComponentsScanner.prototype.scan = function scan() {
        var _this = this;

        this.components = {
            Component: require.resolve('../Components/Component'),
            TextComponent: require.resolve('../Components/TextComponent'),
            RegionComponent: require.resolve('../Components/RegionComponent'),
            CollectionComponent: require.resolve('../Components/CollectionComponent'),
            ValueProxy: require.resolve('../Data/ValueProxy')
        };

        this.helpers = {
            'if': require.resolve('../runtime/ifHelper'),
            'each': require.resolve('../runtime/eachHelper'),
            'log': require.resolve('../runtime/logHelper'),
            'watch': require.resolve('../runtime/watchHelper')
        };

        this._helpers.map(function (path) {
            return _this.scanHelpers(path);
        });
        this._components.map(function (path) {
            return _this.scanComponents(path);
        });
    };

    /**
     * @param {string} pattern
     */


    ComponentsScanner.prototype.scanHelpers = function scanHelpers(pattern) {
        var _this2 = this;

        _glob2.default.sync(pattern).forEach(function (filepath) {
            var helperName = _path2.default.basename(filepath, '.js');
            _this2.helpers[helperName] = filepath;
        });
    };

    /**
     * @param {string} pattern
     */


    ComponentsScanner.prototype.scanComponents = function scanComponents(pattern) {
        var _this3 = this;

        _glob2.default.sync(pattern).forEach(function (filepath) {
            var componentName = _path2.default.basename(filepath, '.js');

            if (componentName.match(/^[A-Z]/)) {
                _this3.components[componentName] = filepath;
            }
        });
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {{plugin: function}} compiler
     */


    ComponentsScanner.prototype.apply = function apply(compiler) {
        var _this4 = this;

        compiler.options.scanner = this;

        compiler.plugin('compilation', function (a, callback) {
            return _this4.scan();
        });
    };

    return ComponentsScanner;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9CdWlsZC9Db21wb25lbnRzU2Nhbm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFYSxpQixXQUFBLGlCOztBQUVUOzs7OztBQUtBLHFDQUFvRDtBQUFBLFlBQXZDLFVBQXVDLFFBQXZDLFVBQXVDO0FBQUEsWUFBM0IsT0FBMkIsUUFBM0IsT0FBMkI7O0FBQUEsMEVBQUosRUFBSTs7QUFBQSxZQUFoQixRQUFnQixTQUFoQixRQUFnQjtBQUFBOztBQUNoRCxhQUFLLFdBQUwsR0FBbUIsVUFBbkI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsT0FBaEI7O0FBRUEsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0g7O0FBRUQ7Ozs7O2dDQUdBLEksbUJBQU87QUFBQTs7QUFDSCxhQUFLLFVBQUwsR0FBa0I7QUFDZCx1QkFBVyxRQUFRLE9BQVIsQ0FBZ0IseUJBQWhCLENBREc7QUFFZCwyQkFBZSxRQUFRLE9BQVIsQ0FBZ0IsNkJBQWhCLENBRkQ7QUFHZCw2QkFBaUIsUUFBUSxPQUFSLENBQWdCLCtCQUFoQixDQUhIO0FBSWQsaUNBQXFCLFFBQVEsT0FBUixDQUFnQixtQ0FBaEIsQ0FKUDtBQUtkLHdCQUFZLFFBQVEsT0FBUixDQUFnQixvQkFBaEI7QUFMRSxTQUFsQjs7QUFRQSxhQUFLLE9BQUwsR0FBZTtBQUNYLGtCQUFNLFFBQVEsT0FBUixDQUFnQixxQkFBaEIsQ0FESztBQUVYLG9CQUFRLFFBQVEsT0FBUixDQUFnQix1QkFBaEIsQ0FGRztBQUdYLG1CQUFPLFFBQVEsT0FBUixDQUFnQixzQkFBaEIsQ0FISTtBQUlYLHFCQUFTLFFBQVEsT0FBUixDQUFnQix3QkFBaEI7QUFKRSxTQUFmOztBQU9BLGFBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7QUFBQSxtQkFBUSxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBUjtBQUFBLFNBQWxCO0FBQ0EsYUFBSyxXQUFMLENBQWlCLEdBQWpCLENBQXFCO0FBQUEsbUJBQVEsTUFBSyxjQUFMLENBQW9CLElBQXBCLENBQVI7QUFBQSxTQUFyQjtBQUNILEs7O0FBRUQ7Ozs7O2dDQUdBLFcsd0JBQVksTyxFQUFTO0FBQUE7O0FBQ2pCLHVCQUFLLElBQUwsQ0FBVSxPQUFWLEVBQW1CLE9BQW5CLENBQTJCLG9CQUFZO0FBQ25DLGdCQUFJLGFBQWEsZUFBSyxRQUFMLENBQWMsUUFBZCxFQUF3QixLQUF4QixDQUFqQjtBQUNBLG1CQUFLLE9BQUwsQ0FBYSxVQUFiLElBQTJCLFFBQTNCO0FBQ0gsU0FIRDtBQUlILEs7O0FBRUQ7Ozs7O2dDQUdBLGMsMkJBQWUsTyxFQUFTO0FBQUE7O0FBQ3BCLHVCQUFLLElBQUwsQ0FBVSxPQUFWLEVBQW1CLE9BQW5CLENBQTJCLG9CQUFZO0FBQ25DLGdCQUFJLGdCQUFnQixlQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXdCLEtBQXhCLENBQXBCOztBQUVBLGdCQUFJLGNBQWMsS0FBZCxDQUFvQixRQUFwQixDQUFKLEVBQW1DO0FBQy9CLHVCQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsSUFBaUMsUUFBakM7QUFDSDtBQUNKLFNBTkQ7QUFPSCxLOztBQUVEO0FBQ0E7Ozs7O2dDQUdBLEssa0JBQU0sUSxFQUFVO0FBQUE7O0FBQ1osaUJBQVMsT0FBVCxDQUFpQixPQUFqQixHQUEyQixJQUEzQjs7QUFFQSxpQkFBUyxNQUFULENBQWdCLGFBQWhCLEVBQStCLFVBQUMsQ0FBRCxFQUFJLFFBQUo7QUFBQSxtQkFBaUIsT0FBSyxJQUFMLEVBQWpCO0FBQUEsU0FBL0I7QUFDSCxLIiwiZmlsZSI6IkNvbXBvbmVudHNTY2FubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGNsYXNzIENvbXBvbmVudHNTY2FubmVyIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGNvbXBvbmVudHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBoZWxwZXJzXG4gICAgICogQHBhcmFtIHt7fX0gb3B0aW1pemVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7Y29tcG9uZW50cywgaGVscGVyc30sIHtvcHRpbWl6ZX0gPSB7fSkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgdGhpcy5faGVscGVycyA9IGhlbHBlcnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9wdGltaXplID0gb3B0aW1pemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2NhbiBwYXRocyB0byByZXNvbHZlIENvbXBvbmVudHNcbiAgICAgKi9cbiAgICBzY2FuKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICBDb21wb25lbnQ6IHJlcXVpcmUucmVzb2x2ZSgnLi4vQ29tcG9uZW50cy9Db21wb25lbnQnKSxcbiAgICAgICAgICAgIFRleHRDb21wb25lbnQ6IHJlcXVpcmUucmVzb2x2ZSgnLi4vQ29tcG9uZW50cy9UZXh0Q29tcG9uZW50JyksXG4gICAgICAgICAgICBSZWdpb25Db21wb25lbnQ6IHJlcXVpcmUucmVzb2x2ZSgnLi4vQ29tcG9uZW50cy9SZWdpb25Db21wb25lbnQnKSxcbiAgICAgICAgICAgIENvbGxlY3Rpb25Db21wb25lbnQ6IHJlcXVpcmUucmVzb2x2ZSgnLi4vQ29tcG9uZW50cy9Db2xsZWN0aW9uQ29tcG9uZW50JyksXG4gICAgICAgICAgICBWYWx1ZVByb3h5OiByZXF1aXJlLnJlc29sdmUoJy4uL0RhdGEvVmFsdWVQcm94eScpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5oZWxwZXJzID0ge1xuICAgICAgICAgICAgJ2lmJzogcmVxdWlyZS5yZXNvbHZlKCcuLi9ydW50aW1lL2lmSGVscGVyJyksXG4gICAgICAgICAgICAnZWFjaCc6IHJlcXVpcmUucmVzb2x2ZSgnLi4vcnVudGltZS9lYWNoSGVscGVyJyksXG4gICAgICAgICAgICAnbG9nJzogcmVxdWlyZS5yZXNvbHZlKCcuLi9ydW50aW1lL2xvZ0hlbHBlcicpLFxuICAgICAgICAgICAgJ3dhdGNoJzogcmVxdWlyZS5yZXNvbHZlKCcuLi9ydW50aW1lL3dhdGNoSGVscGVyJylcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2hlbHBlcnMubWFwKHBhdGggPT4gdGhpcy5zY2FuSGVscGVycyhwYXRoKSk7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMubWFwKHBhdGggPT4gdGhpcy5zY2FuQ29tcG9uZW50cyhwYXRoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbiAgICAgKi9cbiAgICBzY2FuSGVscGVycyhwYXR0ZXJuKSB7XG4gICAgICAgIGdsb2Iuc3luYyhwYXR0ZXJuKS5mb3JFYWNoKGZpbGVwYXRoID0+IHtcbiAgICAgICAgICAgIGxldCBoZWxwZXJOYW1lID0gcGF0aC5iYXNlbmFtZShmaWxlcGF0aCwgJy5qcycpO1xuICAgICAgICAgICAgdGhpcy5oZWxwZXJzW2hlbHBlck5hbWVdID0gZmlsZXBhdGg7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0dGVyblxuICAgICAqL1xuICAgIHNjYW5Db21wb25lbnRzKHBhdHRlcm4pIHtcbiAgICAgICAgZ2xvYi5zeW5jKHBhdHRlcm4pLmZvckVhY2goZmlsZXBhdGggPT4ge1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVwYXRoLCAnLmpzJyk7XG5cbiAgICAgICAgICAgIGlmIChjb21wb25lbnROYW1lLm1hdGNoKC9eW0EtWl0vKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tjb21wb25lbnROYW1lXSA9IGZpbGVwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3twbHVnaW46IGZ1bmN0aW9ufX0gY29tcGlsZXJcbiAgICAgKi9cbiAgICBhcHBseShjb21waWxlcikge1xuICAgICAgICBjb21waWxlci5vcHRpb25zLnNjYW5uZXIgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgY29tcGlsZXIucGx1Z2luKCdjb21waWxhdGlvbicsIChhLCBjYWxsYmFjaykgPT4gdGhpcy5zY2FuKCkpO1xuICAgIH1cbn0iXX0=