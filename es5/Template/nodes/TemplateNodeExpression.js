'use strict';

exports.__esModule = true;
exports.TemplateNodeExpression = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _TemplateNodeVar = require('./TemplateNodeVar');

var _TemplateNodeHelper = require('./TemplateNodeHelper');

var _TemplateNodeBlockHelper = require('./TemplateNodeBlockHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeExpression = exports.TemplateNodeExpression = function () {
    function TemplateNodeExpression() {
        (0, _classCallCheck3.default)(this, TemplateNodeExpression);
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */
    TemplateNodeExpression.factory = function factory(node, env) {
        var convert = {
            path: env.factoryPath(node.path),
            params: node.params || [],
            hash: node.hash || [],
            content: node.content,
            inverse: node.inverse
        };

        if (convert.hash.length || convert.params.length || convert.content || convert.inverse) {
            if (convert.content || convert.inverse) {
                return _TemplateNodeBlockHelper.TemplateNodeBlockHelper.factory(convert, env);
            } else {
                return _TemplateNodeHelper.TemplateNodeHelper.factory(convert, env);
            }
        }

        return _TemplateNodeVar.TemplateNodeVar.factory(convert, env);
    };

    return TemplateNodeExpression;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVFeHByZXNzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0lBRWEsc0IsV0FBQSxzQjs7Ozs7QUFFVDs7Ozs7OzJCQU1PLE8sb0JBQVEsSSxFQUFNLEcsRUFBSztBQUN0QixZQUFJLFVBQVU7QUFDVixrQkFBTSxJQUFJLFdBQUosQ0FBZ0IsS0FBSyxJQUFyQixDQURJO0FBRVYsb0JBQVEsS0FBSyxNQUFMLElBQWUsRUFGYjtBQUdWLGtCQUFNLEtBQUssSUFBTCxJQUFhLEVBSFQ7QUFJVixxQkFBUyxLQUFLLE9BSko7QUFLVixxQkFBUyxLQUFLO0FBTEosU0FBZDs7QUFRQSxZQUFJLFFBQVEsSUFBUixDQUFhLE1BQWIsSUFBdUIsUUFBUSxNQUFSLENBQWUsTUFBdEMsSUFBZ0QsUUFBUSxPQUF4RCxJQUFtRSxRQUFRLE9BQS9FLEVBQXdGO0FBQ3BGLGdCQUFJLFFBQVEsT0FBUixJQUFtQixRQUFRLE9BQS9CLEVBQXdDO0FBQ3BDLHVCQUFPLGlEQUF3QixPQUF4QixDQUFnQyxPQUFoQyxFQUF5QyxHQUF6QyxDQUFQO0FBQ0gsYUFGRCxNQUVNO0FBQ0YsdUJBQU8sdUNBQW1CLE9BQW5CLENBQTJCLE9BQTNCLEVBQW9DLEdBQXBDLENBQVA7QUFDSDtBQUNKOztBQUVELGVBQU8saUNBQWdCLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLEdBQWpDLENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZUV4cHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZVZhcn0gZnJvbSAnLi9UZW1wbGF0ZU5vZGVWYXInO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVIZWxwZXJ9IGZyb20gJy4vVGVtcGxhdGVOb2RlSGVscGVyJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlQmxvY2tIZWxwZXJ9IGZyb20gJy4vVGVtcGxhdGVOb2RlQmxvY2tIZWxwZXInO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlRXhwcmVzc2lvbiB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBub2RlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVWYXJ9XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkobm9kZSwgZW52KSB7XG4gICAgICAgIGxldCBjb252ZXJ0ID0ge1xuICAgICAgICAgICAgcGF0aDogZW52LmZhY3RvcnlQYXRoKG5vZGUucGF0aCksXG4gICAgICAgICAgICBwYXJhbXM6IG5vZGUucGFyYW1zIHx8IFtdLFxuICAgICAgICAgICAgaGFzaDogbm9kZS5oYXNoIHx8IFtdLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5jb250ZW50LFxuICAgICAgICAgICAgaW52ZXJzZTogbm9kZS5pbnZlcnNlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbnZlcnQuaGFzaC5sZW5ndGggfHwgY29udmVydC5wYXJhbXMubGVuZ3RoIHx8IGNvbnZlcnQuY29udGVudCB8fCBjb252ZXJ0LmludmVyc2UpIHtcbiAgICAgICAgICAgIGlmIChjb252ZXJ0LmNvbnRlbnQgfHwgY29udmVydC5pbnZlcnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRlbXBsYXRlTm9kZUJsb2NrSGVscGVyLmZhY3RvcnkoY29udmVydCwgZW52KTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVGVtcGxhdGVOb2RlSGVscGVyLmZhY3RvcnkoY29udmVydCwgZW52KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBUZW1wbGF0ZU5vZGVWYXIuZmFjdG9yeShjb252ZXJ0LCBlbnYpO1xuICAgIH1cblxufSJdfQ==