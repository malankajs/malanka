'use strict';

exports.__esModule = true;
exports.TemplateNodeStringProxy = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeStringProxy = exports.TemplateNodeStringProxy = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeStringProxy, _TemplateNode);

    /**
     * @param {TemplateNodeContent} content
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeStringProxy(content, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeStringProxy);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        _this.content = content;
        return _this;
    }

    /**
     * @returns {{}}
     */


    TemplateNodeStringProxy.prototype.compile = function compile() {
        var _this2 = this;

        return this.env.scope({ watchers: [] }, function (scope) {
            var content = _this2.content.compile();

            if (content.isArray) {
                var func = _this2.env.resolveRuntime('join');

                content = func + '(' + content + ')';
            }

            var watchers = Object.keys(scope.watchers);

            if (watchers.length) {
                var proxy = _this2.env.resolveComponent('ValueProxy'),
                    params = watchers.map(function (path) {
                    return scope.watchers[path];
                }),
                    body = void 0;

                if (watchers.length > 1) {
                    body = 'return ' + proxy + '.all(' + params.join(', ') + ').pipe(function(' + params.join(', ') + '){return ' + content + '})';
                } else {
                    body = 'return ' + params[0] + '.pipe(function(' + params[0] + '){return ' + content + '})';
                }

                return '(function(' + params.join(', ') + '){' + body + '})(' + watchers.join(',') + ')';
            } else {
                return '' + content;
            }
        });
    };

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeStringProxy}
     */


    TemplateNodeStringProxy.factory = function factory(nodes, env) {
        return new TemplateNodeStringProxy(env.factoryContent(nodes), env);
    };

    return TemplateNodeStringProxy;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVTdHJpbmdQcm94eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRWEsdUIsV0FBQSx1Qjs7O0FBRVQ7Ozs7QUFJQSxxQ0FBWSxPQUFaLEVBQXFCLEdBQXJCLEVBQTBCO0FBQUE7O0FBQUEsbUVBQ3RCLHlCQUFNLEdBQU4sQ0FEc0I7O0FBR3RCLGNBQUssT0FBTCxHQUFlLE9BQWY7QUFIc0I7QUFJekI7O0FBRUQ7Ozs7O3NDQUdBLE8sc0JBQVU7QUFBQTs7QUFDTixlQUFPLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxFQUFDLFVBQVUsRUFBWCxFQUFmLEVBQStCLFVBQUMsS0FBRCxFQUFXO0FBQzdDLGdCQUFJLFVBQVUsT0FBSyxPQUFMLENBQWEsT0FBYixFQUFkOztBQUVBLGdCQUFJLFFBQVEsT0FBWixFQUFxQjtBQUNqQixvQkFBSSxPQUFPLE9BQUssR0FBTCxDQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDs7QUFFQSwwQkFBYSxJQUFiLFNBQXFCLE9BQXJCO0FBQ0g7O0FBRUQsZ0JBQUksV0FBVyxPQUFPLElBQVAsQ0FBWSxNQUFNLFFBQWxCLENBQWY7O0FBRUEsZ0JBQUksU0FBUyxNQUFiLEVBQXFCO0FBQ2pCLG9CQUFJLFFBQVEsT0FBSyxHQUFMLENBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBWjtBQUFBLG9CQUNJLFNBQVMsU0FBUyxHQUFULENBQWE7QUFBQSwyQkFBUSxNQUFNLFFBQU4sQ0FBZSxJQUFmLENBQVI7QUFBQSxpQkFBYixDQURiO0FBQUEsb0JBRUksYUFGSjs7QUFJQSxvQkFBSSxTQUFTLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsdUNBQWlCLEtBQWpCLGFBQThCLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBOUIsd0JBQWtFLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBbEUsaUJBQStGLE9BQS9GO0FBQ0gsaUJBRkQsTUFFTztBQUNILHVDQUFpQixPQUFPLENBQVAsQ0FBakIsdUJBQTRDLE9BQU8sQ0FBUCxDQUE1QyxpQkFBaUUsT0FBakU7QUFDSDs7QUFFRCxzQ0FBb0IsT0FBTyxJQUFQLENBQVksSUFBWixDQUFwQixVQUEwQyxJQUExQyxXQUFvRCxTQUFTLElBQVQsQ0FBYyxHQUFkLENBQXBEO0FBRUgsYUFiRCxNQWFPO0FBQ0gsNEJBQVUsT0FBVjtBQUNIO0FBQ0osU0EzQk0sQ0FBUDtBQTRCSCxLOztBQUVEOzs7Ozs7Ozs0QkFNTyxPLG9CQUFRLEssRUFBTyxHLEVBQUs7QUFDdkIsZUFBTyxJQUFJLHVCQUFKLENBQTRCLElBQUksY0FBSixDQUFtQixLQUFuQixDQUE1QixFQUF1RCxHQUF2RCxDQUFQO0FBQ0gsSyIsImZpbGUiOiJUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGVtcGxhdGVOb2RlfSBmcm9tICcuL1RlbXBsYXRlTm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eSBleHRlbmRzIFRlbXBsYXRlTm9kZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZUNvbnRlbnR9IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQsIGVudikge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3t9fVxuICAgICAqL1xuICAgIGNvbXBpbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudi5zY29wZSh7d2F0Y2hlcnM6IFtdfSwgKHNjb3BlKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudC5jb21waWxlKCk7XG5cbiAgICAgICAgICAgIGlmIChjb250ZW50LmlzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZnVuYyA9IHRoaXMuZW52LnJlc29sdmVSdW50aW1lKCdqb2luJyk7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYCR7ZnVuY30oJHtjb250ZW50fSlgO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgd2F0Y2hlcnMgPSBPYmplY3Qua2V5cyhzY29wZS53YXRjaGVycyk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJveHkgPSB0aGlzLmVudi5yZXNvbHZlQ29tcG9uZW50KCdWYWx1ZVByb3h5JyksXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IHdhdGNoZXJzLm1hcChwYXRoID0+IHNjb3BlLndhdGNoZXJzW3BhdGhdKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTtcblxuICAgICAgICAgICAgICAgIGlmICh3YXRjaGVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBgcmV0dXJuICR7cHJveHl9LmFsbCgke3BhcmFtcy5qb2luKCcsICcpfSkucGlwZShmdW5jdGlvbigke3BhcmFtcy5qb2luKCcsICcpfSl7cmV0dXJuICR7Y29udGVudH19KWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGByZXR1cm4gJHtwYXJhbXNbMF19LnBpcGUoZnVuY3Rpb24oJHtwYXJhbXNbMF19KXtyZXR1cm4gJHtjb250ZW50fX0pYDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYChmdW5jdGlvbigke3BhcmFtcy5qb2luKCcsICcpfSl7JHtib2R5fX0pKCR7d2F0Y2hlcnMuam9pbignLCcpfSlgO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb250ZW50fWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e31bXX0gbm9kZXNcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ1Byb3h5fVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5KG5vZGVzLCBlbnYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eShlbnYuZmFjdG9yeUNvbnRlbnQobm9kZXMpLCBlbnYpO1xuICAgIH1cblxufSJdfQ==