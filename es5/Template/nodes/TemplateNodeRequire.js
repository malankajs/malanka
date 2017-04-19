'use strict';

exports.__esModule = true;
exports.TemplateNodeRequire = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeRequire = exports.TemplateNodeRequire = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeRequire, _TemplateNode);

    /**
     * @param {TemplateNodeString} node
     * @param {TemplateNodeExpression} env
     */
    function TemplateNodeRequire(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeRequire);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        _this.path = node.string;
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodeRequire.prototype.compile = function compile() {
        return 'require(' + JSON.stringify(this.path) + ')';
    };

    /**
     * @param {TemplateNodeString} node
     * @param {TemplateNodeExpression} env
     * 
     * @returns {TemplateNodeRequire}
     */


    TemplateNodeRequire.factory = function factory(node, env) {
        return new this(node, env);
    };

    return TemplateNodeRequire;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVSZXF1aXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFYSxtQixXQUFBLG1COzs7QUFFVDs7OztBQUlBLGlDQUFZLElBQVosRUFBa0IsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSxtRUFDbkIseUJBQU0sR0FBTixDQURtQjs7QUFHbkIsY0FBSyxJQUFMLEdBQVksS0FBSyxNQUFqQjtBQUhtQjtBQUl0Qjs7QUFFRDs7Ozs7a0NBR0EsTyxzQkFBVTtBQUNOLDRCQUFrQixLQUFLLFNBQUwsQ0FBZSxLQUFLLElBQXBCLENBQWxCO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs7d0JBTU8sTyxvQkFBUSxJLEVBQU0sRyxFQUFLO0FBQ3RCLGVBQU8sSUFBSSxJQUFKLENBQVMsSUFBVCxFQUFlLEdBQWYsQ0FBUDtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVOb2RlUmVxdWlyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGVtcGxhdGVOb2RlfSBmcm9tICcuL1RlbXBsYXRlTm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU5vZGVSZXF1aXJlIGV4dGVuZHMgVGVtcGxhdGVOb2RlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlU3RyaW5nfSBub2RlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZU5vZGVFeHByZXNzaW9ufSBlbnZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBlbnYpIHtcbiAgICAgICAgc3VwZXIoZW52KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGF0aCA9IG5vZGUuc3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgY29tcGlsZSgpIHtcbiAgICAgICAgcmV0dXJuIGByZXF1aXJlKCR7SlNPTi5zdHJpbmdpZnkodGhpcy5wYXRoKX0pYDtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZU5vZGVTdHJpbmd9IG5vZGVcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlTm9kZUV4cHJlc3Npb259IGVudlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVSZXF1aXJlfVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5KG5vZGUsIGVudikge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMobm9kZSwgZW52KTtcbiAgICB9XG4gICAgXG59Il19