'use strict';

exports.__esModule = true;
exports.TemplateNodeBlockHelper = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNodeHelper2 = require('./TemplateNodeHelper');

var _TemplateNodeString = require('./TemplateNodeString');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeBlockHelper = exports.TemplateNodeBlockHelper = function (_TemplateNodeHelper) {
    (0, _inherits3.default)(TemplateNodeBlockHelper, _TemplateNodeHelper);

    function TemplateNodeBlockHelper() {
        (0, _classCallCheck3.default)(this, TemplateNodeBlockHelper);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateNodeHelper.apply(this, arguments));
    }

    /**
     * @returns {{hash: string}}
     */
    TemplateNodeBlockHelper.prototype.compileOptions = function compileOptions() {
        var options = _TemplateNodeHelper.prototype.compileOptions.call(this),
            scope = this.hash.getScope();

        if (scope) {
            if (scope instanceof _TemplateNodeString.TemplateNodeString) {
                scope = scope.string;
            } else {
                console.log(scope);
                throw new Error('Scope must be string');
            }
        }

        if (this.content) {
            options.content = this._compileContent(scope, this.content);
        }

        if (this.inverse) {
            options.inverse = this._compileContent(scope, this.inverse);
        }

        return options;
    };

    /**
     * @param {string|null} scope
     * @param {TemplateNode} content
     * 
     * @returns {string}
     * @private
     */


    TemplateNodeBlockHelper.prototype._compileContent = function _compileContent(scope, content) {
        if (scope) {
            return this.env.scope({ scope: scope }, function () {
                return 'function(' + scope + '){return ' + content.compile() + '}';
            });
        } else {
            return 'function(){return ' + content.compile() + '}';
        }
    };

    /**
     * @param {{params: [], hash: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeBlockHelper}
     */


    TemplateNodeBlockHelper.factory = function factory(node, env) {
        node.params = (node.params || []).map(function (param) {
            return env.factory(param || []);
        });
        node.hash = env.factoryHashAttributes(node.hash || []);
        node.content = node.content && env.factoryContent(node.content);
        node.inverse = node.inverse && env.factoryContent(node.inverse);

        return new TemplateNodeBlockHelper(node, env);
    };

    return TemplateNodeBlockHelper;
}(_TemplateNodeHelper2.TemplateNodeHelper);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVCbG9ja0hlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0lBRWEsdUIsV0FBQSx1Qjs7Ozs7Ozs7QUFFVDs7O3NDQUdBLGMsNkJBQWlCO0FBQ2IsWUFBSSxVQUFVLDhCQUFNLGNBQU4sV0FBZDtBQUFBLFlBQ0ksUUFBUSxLQUFLLElBQUwsQ0FBVSxRQUFWLEVBRFo7O0FBR0EsWUFBSSxLQUFKLEVBQVc7QUFDUCxnQkFBSSx1REFBSixFQUF5QztBQUNyQyx3QkFBUSxNQUFNLE1BQWQ7QUFDSCxhQUZELE1BRU87QUFDSCx3QkFBUSxHQUFSLENBQVksS0FBWjtBQUNBLHNCQUFNLElBQUksS0FBSixDQUFVLHNCQUFWLENBQU47QUFDSDtBQUNKOztBQUVELFlBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2Qsb0JBQVEsT0FBUixHQUFrQixLQUFLLGVBQUwsQ0FBcUIsS0FBckIsRUFBNEIsS0FBSyxPQUFqQyxDQUFsQjtBQUNIOztBQUVELFlBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2Qsb0JBQVEsT0FBUixHQUFrQixLQUFLLGVBQUwsQ0FBcUIsS0FBckIsRUFBNEIsS0FBSyxPQUFqQyxDQUFsQjtBQUNIOztBQUVELGVBQU8sT0FBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7OztzQ0FPQSxlLDRCQUFnQixLLEVBQU8sTyxFQUFTO0FBQzVCLFlBQUksS0FBSixFQUFXO0FBQ1AsbUJBQU8sS0FBSyxHQUFMLENBQVMsS0FBVCxDQUFlLEVBQUMsWUFBRCxFQUFmLEVBQXdCLFlBQU07QUFDakMscUNBQW1CLEtBQW5CLGlCQUFvQyxRQUFRLE9BQVIsRUFBcEM7QUFDSCxhQUZNLENBQVA7QUFHSCxTQUpELE1BSU87QUFDSCwwQ0FBNEIsUUFBUSxPQUFSLEVBQTVCO0FBQ0g7QUFDSixLOztBQUVEOzs7Ozs7Ozs0QkFNTyxPLG9CQUFRLEksRUFBTSxHLEVBQUs7QUFDdEIsYUFBSyxNQUFMLEdBQWMsQ0FBQyxLQUFLLE1BQUwsSUFBZSxFQUFoQixFQUFvQixHQUFwQixDQUF3QjtBQUFBLG1CQUFTLElBQUksT0FBSixDQUFZLFNBQVMsRUFBckIsQ0FBVDtBQUFBLFNBQXhCLENBQWQ7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFJLHFCQUFKLENBQTBCLEtBQUssSUFBTCxJQUFhLEVBQXZDLENBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsSUFBZ0IsSUFBSSxjQUFKLENBQW1CLEtBQUssT0FBeEIsQ0FBL0I7QUFDQSxhQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsSUFBZ0IsSUFBSSxjQUFKLENBQW1CLEtBQUssT0FBeEIsQ0FBL0I7O0FBRUEsZUFBTyxJQUFJLHVCQUFKLENBQTRCLElBQTVCLEVBQWtDLEdBQWxDLENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZUJsb2NrSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU5vZGVIZWxwZXJ9IGZyb20gJy4vVGVtcGxhdGVOb2RlSGVscGVyJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlU3RyaW5nfSBmcm9tIFwiLi9UZW1wbGF0ZU5vZGVTdHJpbmdcIjtcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlTm9kZUJsb2NrSGVscGVyIGV4dGVuZHMgVGVtcGxhdGVOb2RlSGVscGVyIHtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHt7aGFzaDogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBjb21waWxlT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBzdXBlci5jb21waWxlT3B0aW9ucygpLFxuICAgICAgICAgICAgc2NvcGUgPSB0aGlzLmhhc2guZ2V0U2NvcGUoKTtcblxuICAgICAgICBpZiAoc2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChzY29wZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZVN0cmluZykge1xuICAgICAgICAgICAgICAgIHNjb3BlID0gc2NvcGUuc3RyaW5nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY29wZSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY29wZSBtdXN0IGJlIHN0cmluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50ID0gdGhpcy5fY29tcGlsZUNvbnRlbnQoc2NvcGUsIHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnZlcnNlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmludmVyc2UgPSB0aGlzLl9jb21waWxlQ29udGVudChzY29wZSwgdGhpcy5pbnZlcnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHNjb3BlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZU5vZGV9IGNvbnRlbnRcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NvbXBpbGVDb250ZW50KHNjb3BlLCBjb250ZW50KSB7XG4gICAgICAgIGlmIChzY29wZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW52LnNjb3BlKHtzY29wZX0sICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYGZ1bmN0aW9uKCR7c2NvcGV9KXtyZXR1cm4gJHtjb250ZW50LmNvbXBpbGUoKX19YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYGZ1bmN0aW9uKCl7cmV0dXJuICR7Y29udGVudC5jb21waWxlKCl9fWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3twYXJhbXM6IFtdLCBoYXNoOiBbXX19IG5vZGVcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZUJsb2NrSGVscGVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5KG5vZGUsIGVudikge1xuICAgICAgICBub2RlLnBhcmFtcyA9IChub2RlLnBhcmFtcyB8fCBbXSkubWFwKHBhcmFtID0+IGVudi5mYWN0b3J5KHBhcmFtIHx8IFtdKSk7XG4gICAgICAgIG5vZGUuaGFzaCA9IGVudi5mYWN0b3J5SGFzaEF0dHJpYnV0ZXMobm9kZS5oYXNoIHx8IFtdKTtcbiAgICAgICAgbm9kZS5jb250ZW50ID0gbm9kZS5jb250ZW50ICYmIGVudi5mYWN0b3J5Q29udGVudChub2RlLmNvbnRlbnQpO1xuICAgICAgICBub2RlLmludmVyc2UgPSBub2RlLmludmVyc2UgJiYgZW52LmZhY3RvcnlDb250ZW50KG5vZGUuaW52ZXJzZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVCbG9ja0hlbHBlcihub2RlLCBlbnYpO1xuICAgIH1cblxufSJdfQ==