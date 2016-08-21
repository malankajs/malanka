'use strict';

exports.__esModule = true;
exports.TemplateNodeHashAttributes = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeHashAttributes = exports.TemplateNodeHashAttributes = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeHashAttributes, _TemplateNode);

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeHashAttributes(nodes, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeHashAttributes);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        _this.nodes = nodes;
        return _this;
    }

    /**
     * @returns {{}}
     */


    TemplateNodeHashAttributes.prototype.compileHash = function compileHash() {
        var _this2 = this;

        return this.env.scope({ isString: true }, function () {
            var hash = {},
                events = {};

            _this2.nodes.forEach(function (attr) {
                if (attr.isEvent()) {
                    Object.assign(events, attr.compileEvent());
                } else {
                    Object.assign(hash, attr.compileHash());
                }
            });

            if (Object.keys(events).length) {
                hash.events = _this2.env.compileHash(events);
            }

            return hash;
        });
    };

    /**
     * @returns {boolean}
     */


    TemplateNodeHashAttributes.prototype.isEmpty = function isEmpty() {
        return !this.nodes.length;
    };

    /**
     * @returns {TemplateNodeExpression}
     */


    TemplateNodeHashAttributes.prototype.getContext = function getContext() {
        var context = this.nodes.find(function (node) {
            return node.name === 'as';
        });

        if (context) {
            return context.value;
        }
    };

    /**
     * @returns {TemplateNodeExpression}
     */


    TemplateNodeHashAttributes.prototype.getScope = function getScope() {
        var scope = this.nodes.find(function (node) {
            return node.name === 'scope';
        });

        if (scope) {
            return scope.value;
        }
    };

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHashAttributes}
     */


    TemplateNodeHashAttributes.factory = function factory(nodes, env) {
        nodes = nodes.map(function (node) {
            return env.factoryHashAttribute(node);
        });

        return new TemplateNodeHashAttributes(nodes, env);
    };

    return TemplateNodeHashAttributes;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRWEsMEIsV0FBQSwwQjs7O0FBRVQ7Ozs7QUFJQSx3Q0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCO0FBQUE7O0FBQUEsbUVBQ3BCLHlCQUFNLEdBQU4sQ0FEb0I7O0FBR3BCLGNBQUssS0FBTCxHQUFhLEtBQWI7QUFIb0I7QUFJdkI7O0FBRUQ7Ozs7O3lDQUdBLFcsMEJBQWM7QUFBQTs7QUFDVixlQUFPLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxFQUFDLFVBQVUsSUFBWCxFQUFmLEVBQWlDLFlBQU07QUFDMUMsZ0JBQUksT0FBTyxFQUFYO0FBQUEsZ0JBQWUsU0FBUyxFQUF4Qjs7QUFFQSxtQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixnQkFBUTtBQUN2QixvQkFBSSxLQUFLLE9BQUwsRUFBSixFQUFvQjtBQUNoQiwyQkFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQixLQUFLLFlBQUwsRUFBdEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsMkJBQU8sTUFBUCxDQUFjLElBQWQsRUFBb0IsS0FBSyxXQUFMLEVBQXBCO0FBQ0g7QUFDSixhQU5EOztBQVFBLGdCQUFJLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsTUFBeEIsRUFBZ0M7QUFDNUIscUJBQUssTUFBTCxHQUFjLE9BQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsTUFBckIsQ0FBZDtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSCxTQWhCTSxDQUFQO0FBaUJILEs7O0FBRUQ7Ozs7O3lDQUdBLE8sc0JBQVU7QUFDTixlQUFPLENBQUMsS0FBSyxLQUFMLENBQVcsTUFBbkI7QUFDSCxLOztBQUVEOzs7Ozt5Q0FHQSxVLHlCQUFhO0FBQ1QsWUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0I7QUFBQSxtQkFBUSxLQUFLLElBQUwsS0FBYyxJQUF0QjtBQUFBLFNBQWhCLENBQWQ7O0FBRUEsWUFBSSxPQUFKLEVBQWE7QUFDVCxtQkFBTyxRQUFRLEtBQWY7QUFDSDtBQUNKLEs7O0FBRUQ7Ozs7O3lDQUdBLFEsdUJBQVc7QUFDUCxZQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQjtBQUFBLG1CQUFRLEtBQUssSUFBTCxLQUFjLE9BQXRCO0FBQUEsU0FBaEIsQ0FBWjs7QUFFQSxZQUFJLEtBQUosRUFBVztBQUNQLG1CQUFPLE1BQU0sS0FBYjtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7Ozs7K0JBTU8sTyxvQkFBUSxLLEVBQU8sRyxFQUFLO0FBQ3ZCLGdCQUFRLE1BQU0sR0FBTixDQUFVO0FBQUEsbUJBQVEsSUFBSSxvQkFBSixDQUF5QixJQUF6QixDQUFSO0FBQUEsU0FBVixDQUFSOztBQUVBLGVBQU8sSUFBSSwwQkFBSixDQUErQixLQUEvQixFQUFzQyxHQUF0QyxDQUFQO0FBQ0gsSyIsImZpbGUiOiJUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGVtcGxhdGVOb2RlfSBmcm9tICcuL1RlbXBsYXRlTm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlcyBleHRlbmRzIFRlbXBsYXRlTm9kZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9W119IG5vZGVzXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihub2RlcywgZW52KSB7XG4gICAgICAgIHN1cGVyKGVudik7XG5cbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHt7fX1cbiAgICAgKi9cbiAgICBjb21waWxlSGFzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52LnNjb3BlKHtpc1N0cmluZzogdHJ1ZX0sICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNoID0ge30sIGV2ZW50cyA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzLm5vZGVzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIuaXNFdmVudCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZXZlbnRzLCBhdHRyLmNvbXBpbGVFdmVudCgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGhhc2gsIGF0dHIuY29tcGlsZUhhc2goKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhldmVudHMpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhhc2guZXZlbnRzID0gdGhpcy5lbnYuY29tcGlsZUhhc2goZXZlbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZUV4cHJlc3Npb259XG4gICAgICovXG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLm5vZGVzLmZpbmQobm9kZSA9PiBub2RlLm5hbWUgPT09ICdhcycpO1xuXG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVFeHByZXNzaW9ufVxuICAgICAqL1xuICAgIGdldFNjb3BlKCkge1xuICAgICAgICBsZXQgc2NvcGUgPSB0aGlzLm5vZGVzLmZpbmQobm9kZSA9PiBub2RlLm5hbWUgPT09ICdzY29wZScpO1xuXG4gICAgICAgIGlmIChzY29wZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjb3BlLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fVtdfSBub2Rlc1xuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlSGFzaEF0dHJpYnV0ZXN9XG4gICAgICovXG4gICAgc3RhdGljIGZhY3Rvcnkobm9kZXMsIGVudikge1xuICAgICAgICBub2RlcyA9IG5vZGVzLm1hcChub2RlID0+IGVudi5mYWN0b3J5SGFzaEF0dHJpYnV0ZShub2RlKSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlcyhub2RlcywgZW52KTtcbiAgICB9XG5cbn0iXX0=