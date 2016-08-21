'use strict';

exports.__esModule = true;
exports.TemplateNodeVar = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

var _TemplateNodePath = require('./TemplateNodePath');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeVar = exports.TemplateNodeVar = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeVar, _TemplateNode);

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeVar(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeVar);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        Object.assign(_this, node);
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodeVar.prototype.compile = function compile() {
        return this.path.compile();
    };

    /**
     * @returns {string}
     */


    TemplateNodeVar.prototype.compileMethod = function compileMethod() {
        return this.path.compileMethod();
    };

    /**
     * @returns {boolean}
     */


    TemplateNodeVar.prototype.isWatch = function isWatch() {
        return this.path.isWatch();
    };

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */


    TemplateNodeVar.factory = function factory(node, env) {
        return new TemplateNodeVar(node, env);
    };

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar}
     */


    TemplateNodeVar.factoryFromString = function factoryFromString(string, env) {
        return new TemplateNodeVar({ path: _TemplateNodePath.TemplateNodePath.factory(string, env) }, env);
    };

    return TemplateNodeVar;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVWYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUVhLGUsV0FBQSxlOzs7QUFFVDs7OztBQUlBLDZCQUFZLElBQVosRUFBa0IsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSxtRUFDbkIseUJBQU0sR0FBTixDQURtQjs7QUFHbkIsZUFBTyxNQUFQLFFBQW9CLElBQXBCO0FBSG1CO0FBSXRCOztBQUVEOzs7Ozs4QkFHQSxPLHNCQUFVO0FBQ04sZUFBTyxLQUFLLElBQUwsQ0FBVSxPQUFWLEVBQVA7QUFDSCxLOztBQUVEOzs7Ozs4QkFHQSxhLDRCQUFnQjtBQUNaLGVBQU8sS0FBSyxJQUFMLENBQVUsYUFBVixFQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7OEJBR0EsTyxzQkFBVTtBQUNOLGVBQU8sS0FBSyxJQUFMLENBQVUsT0FBVixFQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs7b0JBTU8sTyxvQkFBUSxJLEVBQU0sRyxFQUFLO0FBQ3RCLGVBQU8sSUFBSSxlQUFKLENBQW9CLElBQXBCLEVBQTBCLEdBQTFCLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OztvQkFNTyxpQiw4QkFBa0IsTSxFQUFRLEcsRUFBSztBQUNsQyxlQUFPLElBQUksZUFBSixDQUFvQixFQUFDLE1BQU0sbUNBQWlCLE9BQWpCLENBQXlCLE1BQXpCLEVBQWlDLEdBQWpDLENBQVAsRUFBcEIsRUFBbUUsR0FBbkUsQ0FBUDtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVOb2RlVmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZW1wbGF0ZU5vZGV9IGZyb20gJy4vVGVtcGxhdGVOb2RlJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlUGF0aH0gZnJvbSAnLi9UZW1wbGF0ZU5vZGVQYXRoJztcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlTm9kZVZhciBleHRlbmRzIFRlbXBsYXRlTm9kZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBub2RlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBlbnYpIHtcbiAgICAgICAgc3VwZXIoZW52KTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY29tcGlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aC5jb21waWxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlTWV0aG9kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmNvbXBpbGVNZXRob2QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1dhdGNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmlzV2F0Y2goKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBub2RlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVWYXJ9XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkobm9kZSwgZW52KSB7XG4gICAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVOb2RlVmFyKG5vZGUsIGVudik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlVmFyfVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5RnJvbVN0cmluZyhzdHJpbmcsIGVudikge1xuICAgICAgICByZXR1cm4gbmV3IFRlbXBsYXRlTm9kZVZhcih7cGF0aDogVGVtcGxhdGVOb2RlUGF0aC5mYWN0b3J5KHN0cmluZywgZW52KX0sIGVudilcbiAgICB9XG5cbn0iXX0=