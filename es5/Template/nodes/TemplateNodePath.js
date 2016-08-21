'use strict';

exports.__esModule = true;
exports.TemplateNodePath = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodePath = exports.TemplateNodePath = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodePath, _TemplateNode);

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     */
    function TemplateNodePath(string, env) {
        (0, _classCallCheck3.default)(this, TemplateNodePath);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        _this.original = string;

        if (string[0] === '@') {
            _this.watch = true;
            _this.string = string.slice(1);
        } else {
            _this.watch = false;
            _this.string = string;
        }

        _this.level = 0;
        _this.parts = _this.string.split('.');

        while (_this.parts[0] === 'this' && _this.parts.length) {
            _this.parts.shift();
            _this.level++;
        }

        _this.string = _this.parts.join('.');
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodePath.prototype.compile = function compile() {
        if (this.isWatch()) {
            return this.compileProxy();
        } else {
            return this.compileVariable();
        }
    };

    /**
     * @returns {string}
     */


    TemplateNodePath.prototype.compileVariable = function compileVariable() {
        return this.getParts().join('.');
    };

    /**
     * @returns {string}
     */


    TemplateNodePath.prototype.compileProxy = function compileProxy() {
        var _getParts = this.getParts();

        var context = _getParts[0];

        var parts = _getParts.slice(1);

        var path = parts.map(function (part) {
            return 'proxy(' + JSON.stringify(part) + ')';
        });

        path.unshift(context);

        return this.env.watcher(path.join('.'));
    };

    /**
     * @returns {string}
     */


    TemplateNodePath.prototype.compileMethod = function compileMethod() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        if (this.isWatch()) {
            var temp = this.env.tempVar();

            return '(function(' + temp + '){return ' + temp + '.emit.bind(' + temp + ')})(' + this.compileProxy() + ')';
        }

        var parts = this.getParts(),
            method = parts.pop(),
            context = parts.join('.');

        var bind = [context];

        params.forEach(function (param) {
            return bind.push(param.compile());
        });

        return context + '.' + method + '.bind(' + bind.join(',') + ')';
    };

    /**
     * @returns {string[]}
     */


    TemplateNodePath.prototype.getParts = function getParts() {
        var context = 'context',
            parts = this.parts.slice();

        if (this.level) {
            var contexts = this.env.filterScopes('context').map(function (scope) {
                return scope.context;
            });

            if (contexts.length < this.level) {
                throw new Error('Cannot resolve path "' + this.original + '"');
            }

            context = contexts[contexts.length - this.level];
        } else {
            var scopes = this.env.filterScopes('scope').map(function (scope) {
                return scope.scope;
            }),
                index = scopes.indexOf(parts[0]);

            if (index > -1) {
                context = parts.shift();
            }
        }

        return [context].concat(parts);
    };

    /**
     * @returns {boolean}
     */


    TemplateNodePath.prototype.isWatch = function isWatch() {
        return this.watch;
    };

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePath}
     */


    TemplateNodePath.factory = function factory(string, env) {
        return new TemplateNodePath(string, env);
    };

    return TemplateNodePath;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVQYXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSxnQixXQUFBLGdCOzs7QUFFVDs7OztBQUlBLDhCQUFZLE1BQVosRUFBb0IsR0FBcEIsRUFBeUI7QUFBQTs7QUFBQSxtRUFDckIseUJBQU0sR0FBTixDQURxQjs7QUFHckIsY0FBSyxRQUFMLEdBQWdCLE1BQWhCOztBQUVBLFlBQUksT0FBTyxDQUFQLE1BQWMsR0FBbEIsRUFBdUI7QUFDbkIsa0JBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxrQkFBSyxNQUFMLEdBQWMsT0FBTyxLQUFQLENBQWEsQ0FBYixDQUFkO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsa0JBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxrQkFBSyxNQUFMLEdBQWMsTUFBZDtBQUNIOztBQUVELGNBQUssS0FBTCxHQUFhLENBQWI7QUFDQSxjQUFLLEtBQUwsR0FBYSxNQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLENBQWI7O0FBRUEsZUFBTyxNQUFLLEtBQUwsQ0FBVyxDQUFYLE1BQWtCLE1BQWxCLElBQTRCLE1BQUssS0FBTCxDQUFXLE1BQTlDLEVBQXNEO0FBQ2xELGtCQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ0Esa0JBQUssS0FBTDtBQUNIOztBQUVELGNBQUssTUFBTCxHQUFjLE1BQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBZDtBQXJCcUI7QUFzQnhCOztBQUVEOzs7OzsrQkFHQSxPLHNCQUFVO0FBQ04sWUFBSSxLQUFLLE9BQUwsRUFBSixFQUFvQjtBQUNoQixtQkFBTyxLQUFLLFlBQUwsRUFBUDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPLEtBQUssZUFBTCxFQUFQO0FBQ0g7QUFDSixLOztBQUVEOzs7OzsrQkFHQSxlLDhCQUFrQjtBQUNkLGVBQU8sS0FBSyxRQUFMLEdBQWdCLElBQWhCLENBQXFCLEdBQXJCLENBQVA7QUFDSCxLOztBQUVEOzs7OzsrQkFHQSxZLDJCQUFlO0FBQUEsd0JBQ2UsS0FBSyxRQUFMLEVBRGY7O0FBQUEsWUFDTixPQURNOztBQUFBLFlBQ00sS0FETjs7QUFHWCxZQUFJLE9BQU8sTUFBTSxHQUFOLENBQVU7QUFBQSw4QkFBaUIsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFqQjtBQUFBLFNBQVYsQ0FBWDs7QUFFQSxhQUFLLE9BQUwsQ0FBYSxPQUFiOztBQUVBLGVBQU8sS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWpCLENBQVA7QUFDSCxLOztBQUVEOzs7OzsrQkFHQSxhLDRCQUEyQjtBQUFBLFlBQWIsTUFBYSx5REFBSixFQUFJOztBQUN2QixZQUFJLEtBQUssT0FBTCxFQUFKLEVBQW9CO0FBQ2hCLGdCQUFJLE9BQU8sS0FBSyxHQUFMLENBQVMsT0FBVCxFQUFYOztBQUVBLGtDQUFvQixJQUFwQixpQkFBb0MsSUFBcEMsbUJBQXNELElBQXRELFlBQWlFLEtBQUssWUFBTCxFQUFqRTtBQUNIOztBQUVELFlBQUksUUFBUSxLQUFLLFFBQUwsRUFBWjtBQUFBLFlBQ0ksU0FBUyxNQUFNLEdBQU4sRUFEYjtBQUFBLFlBRUksVUFBVSxNQUFNLElBQU4sQ0FBVyxHQUFYLENBRmQ7O0FBSUEsWUFBSSxPQUFPLENBQUMsT0FBRCxDQUFYOztBQUVBLGVBQU8sT0FBUCxDQUFlO0FBQUEsbUJBQVMsS0FBSyxJQUFMLENBQVUsTUFBTSxPQUFOLEVBQVYsQ0FBVDtBQUFBLFNBQWY7O0FBRUEsZUFBVSxPQUFWLFNBQXFCLE1BQXJCLGNBQW9DLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBcEM7QUFDSCxLOztBQUVEOzs7OzsrQkFHQSxRLHVCQUFXO0FBQ1AsWUFBSSxVQUFVLFNBQWQ7QUFBQSxZQUNJLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBWCxFQURaOztBQUdBLFlBQUksS0FBSyxLQUFULEVBQWdCO0FBQ1osZ0JBQUksV0FBVyxLQUFLLEdBQUwsQ0FBUyxZQUFULENBQXNCLFNBQXRCLEVBQWlDLEdBQWpDLENBQXFDO0FBQUEsdUJBQVMsTUFBTSxPQUFmO0FBQUEsYUFBckMsQ0FBZjs7QUFFQSxnQkFBSSxTQUFTLE1BQVQsR0FBa0IsS0FBSyxLQUEzQixFQUFrQztBQUM5QixzQkFBTSxJQUFJLEtBQUosMkJBQWtDLEtBQUssUUFBdkMsT0FBTjtBQUNIOztBQUVELHNCQUFVLFNBQVMsU0FBUyxNQUFULEdBQWtCLEtBQUssS0FBaEMsQ0FBVjtBQUNILFNBUkQsTUFRTztBQUNILGdCQUFJLFNBQVMsS0FBSyxHQUFMLENBQVMsWUFBVCxDQUFzQixPQUF0QixFQUErQixHQUEvQixDQUFtQztBQUFBLHVCQUFTLE1BQU0sS0FBZjtBQUFBLGFBQW5DLENBQWI7QUFBQSxnQkFDSSxRQUFRLE9BQU8sT0FBUCxDQUFlLE1BQU0sQ0FBTixDQUFmLENBRFo7O0FBR0EsZ0JBQUksUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDWiwwQkFBVSxNQUFNLEtBQU4sRUFBVjtBQUNIO0FBQ0o7O0FBRUQsZUFBTyxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQWlCLEtBQWpCLENBQVA7QUFDSCxLOztBQUVEOzs7OzsrQkFHQSxPLHNCQUFVO0FBQ04sZUFBTyxLQUFLLEtBQVo7QUFDSCxLOztBQUVEOzs7Ozs7OztxQkFNTyxPLG9CQUFRLE0sRUFBUSxHLEVBQUs7QUFDeEIsZUFBTyxJQUFJLGdCQUFKLENBQXFCLE1BQXJCLEVBQTZCLEdBQTdCLENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZVBhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGUnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlUGF0aCBleHRlbmRzIFRlbXBsYXRlTm9kZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdHJpbmcsIGVudikge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMub3JpZ2luYWwgPSBzdHJpbmc7XG5cbiAgICAgICAgaWYgKHN0cmluZ1swXSA9PT0gJ0AnKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nLnNsaWNlKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53YXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxldmVsID0gMDtcbiAgICAgICAgdGhpcy5wYXJ0cyA9IHRoaXMuc3RyaW5nLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMucGFydHNbMF0gPT09ICd0aGlzJyAmJiB0aGlzLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdHJpbmcgPSB0aGlzLnBhcnRzLmpvaW4oJy4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBpbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzV2F0Y2goKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZVByb3h5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21waWxlVmFyaWFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY29tcGlsZVZhcmlhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJ0cygpLmpvaW4oJy4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBpbGVQcm94eSgpIHtcbiAgICAgICAgbGV0IFtjb250ZXh0LCAuLi5wYXJ0c10gPSB0aGlzLmdldFBhcnRzKCk7XG5cbiAgICAgICAgbGV0IHBhdGggPSBwYXJ0cy5tYXAocGFydCA9PiBgcHJveHkoJHtKU09OLnN0cmluZ2lmeShwYXJ0KX0pYCk7XG5cbiAgICAgICAgcGF0aC51bnNoaWZ0KGNvbnRleHQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVudi53YXRjaGVyKHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBpbGVNZXRob2QocGFyYW1zID0gW10pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNXYXRjaCgpKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IHRoaXMuZW52LnRlbXBWYXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGAoZnVuY3Rpb24oJHt0ZW1wfSl7cmV0dXJuICR7dGVtcH0uZW1pdC5iaW5kKCR7dGVtcH0pfSkoJHt0aGlzLmNvbXBpbGVQcm94eSgpfSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcnRzID0gdGhpcy5nZXRQYXJ0cygpLFxuICAgICAgICAgICAgbWV0aG9kID0gcGFydHMucG9wKCksXG4gICAgICAgICAgICBjb250ZXh0ID0gcGFydHMuam9pbignLicpO1xuXG4gICAgICAgIGxldCBiaW5kID0gW2NvbnRleHRdO1xuXG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKHBhcmFtID0+IGJpbmQucHVzaChwYXJhbS5jb21waWxlKCkpKTtcblxuICAgICAgICByZXR1cm4gYCR7Y29udGV4dH0uJHttZXRob2R9LmJpbmQoJHtiaW5kLmpvaW4oJywnKX0pYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgZ2V0UGFydHMoKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gJ2NvbnRleHQnLFxuICAgICAgICAgICAgcGFydHMgPSB0aGlzLnBhcnRzLnNsaWNlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubGV2ZWwpIHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0cyA9IHRoaXMuZW52LmZpbHRlclNjb3BlcygnY29udGV4dCcpLm1hcChzY29wZSA9PiBzY29wZS5jb250ZXh0KTtcblxuICAgICAgICAgICAgaWYgKGNvbnRleHRzLmxlbmd0aCA8IHRoaXMubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZXNvbHZlIHBhdGggXCIke3RoaXMub3JpZ2luYWx9XCJgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHRzW2NvbnRleHRzLmxlbmd0aCAtIHRoaXMubGV2ZWxdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNjb3BlcyA9IHRoaXMuZW52LmZpbHRlclNjb3Blcygnc2NvcGUnKS5tYXAoc2NvcGUgPT4gc2NvcGUuc2NvcGUpLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gc2NvcGVzLmluZGV4T2YocGFydHNbMF0pO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBwYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtjb250ZXh0XS5jb25jYXQocGFydHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzV2F0Y2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndhdGNoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVBhdGh9XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkoc3RyaW5nLCBlbnYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVQYXRoKHN0cmluZywgZW52KTtcbiAgICB9XG5cbn0iXX0=