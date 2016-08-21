'use strict';

exports.__esModule = true;
exports.TemplateNodeHelper = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNodeVar2 = require('./TemplateNodeVar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeHelper = exports.TemplateNodeHelper = function (_TemplateNodeVar) {
    (0, _inherits3.default)(TemplateNodeHelper, _TemplateNodeVar);

    function TemplateNodeHelper() {
        (0, _classCallCheck3.default)(this, TemplateNodeHelper);
        return (0, _possibleConstructorReturn3.default)(this, _TemplateNodeVar.apply(this, arguments));
    }

    /**
     * @returns {string}
     */
    TemplateNodeHelper.prototype.compile = function compile() {
        var helperName = this.env.resolveHelper(this.path.string),
            args = ['context'],
            context = this.hash.getContext(),
            scope = this.hash.getScope();

        args = args.concat(this.params.map(function (param) {
            return param.compile();
        }));

        args.push(this.env.compileHash(this.compileOptions()));

        return '' + (context ? context.compile() + '=' : '') + helperName + '.call(' + args.join(',') + ')';
    };

    /**
     * @returns {{hash: string}}
     */


    TemplateNodeHelper.prototype.compileOptions = function compileOptions() {
        var hash = {
            hash: this.env.compileHash(this.hash.compileHash())
        };

        if (this.env.scopeValue('isString')) {
            hash.isString = true;
        }

        return hash;
    };

    /**
     * @param {{params: [], hash: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHelper}
     */


    TemplateNodeHelper.factory = function factory(node, env) {
        node.params = node.params.map(function (param) {
            return env.factory(param || []);
        });
        node.hash = env.factoryHashAttributes(node.hash || []);

        return new TemplateNodeHelper(node, env);
    };

    return TemplateNodeHelper;
}(_TemplateNodeVar2.TemplateNodeVar);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVIZWxwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUVhLGtCLFdBQUEsa0I7Ozs7Ozs7O0FBRVQ7OztpQ0FHQSxPLHNCQUFVO0FBQ04sWUFBSSxhQUFhLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsS0FBSyxJQUFMLENBQVUsTUFBakMsQ0FBakI7QUFBQSxZQUNJLE9BQU8sQ0FBQyxTQUFELENBRFg7QUFBQSxZQUVJLFVBQVUsS0FBSyxJQUFMLENBQVUsVUFBVixFQUZkO0FBQUEsWUFHSSxRQUFRLEtBQUssSUFBTCxDQUFVLFFBQVYsRUFIWjs7QUFLQSxlQUFPLEtBQUssTUFBTCxDQUFZLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0I7QUFBQSxtQkFBUyxNQUFNLE9BQU4sRUFBVDtBQUFBLFNBQWhCLENBQVosQ0FBUDs7QUFFQSxhQUFLLElBQUwsQ0FBVSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEtBQUssY0FBTCxFQUFyQixDQUFWOztBQUVBLHFCQUFVLFVBQVUsUUFBUSxPQUFSLEtBQW9CLEdBQTlCLEdBQW9DLEVBQTlDLElBQW1ELFVBQW5ELGNBQXNFLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBdEU7QUFDSCxLOztBQUVEOzs7OztpQ0FHQSxjLDZCQUFpQjtBQUNiLFlBQUksT0FBTztBQUNQLGtCQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsV0FBVixFQUFyQjtBQURDLFNBQVg7O0FBSUEsWUFBSSxLQUFLLEdBQUwsQ0FBUyxVQUFULENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakMsaUJBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNIOztBQUVELGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7O3VCQU1PLE8sb0JBQVEsSSxFQUFNLEcsRUFBSztBQUN0QixhQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCO0FBQUEsbUJBQVMsSUFBSSxPQUFKLENBQVksU0FBUyxFQUFyQixDQUFUO0FBQUEsU0FBaEIsQ0FBZDtBQUNBLGFBQUssSUFBTCxHQUFZLElBQUkscUJBQUosQ0FBMEIsS0FBSyxJQUFMLElBQWEsRUFBdkMsQ0FBWjs7QUFFQSxlQUFPLElBQUksa0JBQUosQ0FBdUIsSUFBdkIsRUFBNkIsR0FBN0IsQ0FBUDtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVOb2RlSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU5vZGVWYXJ9IGZyb20gJy4vVGVtcGxhdGVOb2RlVmFyJztcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlTm9kZUhlbHBlciBleHRlbmRzIFRlbXBsYXRlTm9kZVZhciB7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBpbGUoKSB7XG4gICAgICAgIGxldCBoZWxwZXJOYW1lID0gdGhpcy5lbnYucmVzb2x2ZUhlbHBlcih0aGlzLnBhdGguc3RyaW5nKSxcbiAgICAgICAgICAgIGFyZ3MgPSBbJ2NvbnRleHQnXSxcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLmhhc2guZ2V0Q29udGV4dCgpLFxuICAgICAgICAgICAgc2NvcGUgPSB0aGlzLmhhc2guZ2V0U2NvcGUoKTtcblxuICAgICAgICBhcmdzID0gYXJncy5jb25jYXQodGhpcy5wYXJhbXMubWFwKHBhcmFtID0+IHBhcmFtLmNvbXBpbGUoKSkpO1xuXG4gICAgICAgIGFyZ3MucHVzaCh0aGlzLmVudi5jb21waWxlSGFzaCh0aGlzLmNvbXBpbGVPcHRpb25zKCkpKTtcblxuICAgICAgICByZXR1cm4gYCR7Y29udGV4dCA/IGNvbnRleHQuY29tcGlsZSgpICsgJz0nIDogJyd9JHtoZWxwZXJOYW1lfS5jYWxsKCR7YXJncy5qb2luKCcsJyl9KWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3toYXNoOiBzdHJpbmd9fVxuICAgICAqL1xuICAgIGNvbXBpbGVPcHRpb25zKCkge1xuICAgICAgICB2YXIgaGFzaCA9IHtcbiAgICAgICAgICAgIGhhc2g6IHRoaXMuZW52LmNvbXBpbGVIYXNoKHRoaXMuaGFzaC5jb21waWxlSGFzaCgpKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmVudi5zY29wZVZhbHVlKCdpc1N0cmluZycpKSB7XG4gICAgICAgICAgICBoYXNoLmlzU3RyaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e3BhcmFtczogW10sIGhhc2g6IFtdfX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlSGVscGVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5KG5vZGUsIGVudikge1xuICAgICAgICBub2RlLnBhcmFtcyA9IG5vZGUucGFyYW1zLm1hcChwYXJhbSA9PiBlbnYuZmFjdG9yeShwYXJhbSB8fCBbXSkpO1xuICAgICAgICBub2RlLmhhc2ggPSBlbnYuZmFjdG9yeUhhc2hBdHRyaWJ1dGVzKG5vZGUuaGFzaCB8fCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVIZWxwZXIobm9kZSwgZW52KTtcbiAgICB9XG5cbn0iXX0=