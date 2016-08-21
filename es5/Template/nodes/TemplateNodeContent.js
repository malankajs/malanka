'use strict';

exports.__esModule = true;
exports.TemplateNodeContent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

var _TemplateNodeHelper = require('./TemplateNodeHelper');

var _TemplateNodeString = require('./TemplateNodeString');

var _TemplateNodeVar = require('./TemplateNodeVar');

var _TemplateNodeStringProxy = require('./TemplateNodeStringProxy');

var _TemplateNodeComment = require('./TemplateNodeComment');

var _TemplateNodeComponent = require('./TemplateNodeComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeContent = exports.TemplateNodeContent = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeContent, _TemplateNode);

    /**
     * @param {TemplateNode[]} nodes
     * @param {TemplateEnvironment} env
     * @param {boolean} merged
     */
    function TemplateNodeContent(nodes, env) {
        var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var _ref$merged = _ref.merged;
        var merged = _ref$merged === undefined ? false : _ref$merged;
        (0, _classCallCheck3.default)(this, TemplateNodeContent);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        _this.nodes = nodes;
        _this.merged = merged;
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodeContent.prototype.compile = function compile(options) {
        var mergeNodes = this.mergeNodes(options),
            outputArray = mergeNodes.map(function (node) {
            return node.compile();
        });

        if (outputArray.length === 1) {
            return outputArray[0];
        }

        var isKnownOutput = mergeNodes.every(function (node) {
            return node instanceof _TemplateNodeComponent.TemplateNodeComponent || node instanceof _TemplateNodeString.TemplateNodeString;
        });

        var output = '[' + outputArray.join(',') + ']';

        if (!isKnownOutput) {
            output = this.flatten(output);
        }

        return this.env.factoryCompiled(output, {
            length: outputArray.length,
            isArray: true
        });
    };

    /**
     * @param {string} content
     * @returns {*}
     */


    TemplateNodeContent.prototype.flatten = function flatten(content) {
        var func = this.env.resolveRuntime('mergeStrings');

        return func + '(' + content + ', context)';
    };

    TemplateNodeContent.prototype.mergeNodes = function mergeNodes() {
        // return this.nodes;
        if (!this.nodes.length || this.merged) {
            return this.nodes;
        }

        var nodes = [],
            queue = [];

        var flushQueue = function flushQueue() {
            var resultNode = void 0;

            if (queue.length === 1) {
                resultNode = queue[0];
            } else if (queue.length > 0) {
                resultNode = new _TemplateNodeStringProxy.TemplateNodeStringProxy(new TemplateNodeContent(queue, queue[0].env, { merged: true }), queue[0].env);
            }

            if (resultNode) {
                nodes.push(resultNode);
            }

            queue = [];
        };

        var pushQueue = function pushQueue(node) {
            var last = queue[queue.length - 1];

            if (queue.length && node instanceof _TemplateNodeString.TemplateNodeString && last instanceof _TemplateNodeString.TemplateNodeString) {
                last.string += node.string;
            } else {
                queue.push(node);
            }
        };

        for (var index = 0; index < this.nodes.length; index++) {
            var node = this.nodes[index];

            if (node instanceof _TemplateNodeString.TemplateNodeString) {
                pushQueue(node);
            } else if (node instanceof _TemplateNodeComment.TemplateNodeComment) {} else {
                flushQueue();
                nodes.push(node);
            }
        }

        flushQueue();

        return nodes;
    };

    /**
     * @param {{type: string}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeContent}
     */


    TemplateNodeContent.factory = function factory(nodes, env) {
        return new TemplateNodeContent(env.factoryNodes(nodes, env), env);
    };

    return TemplateNodeContent;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVDb250ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7SUFFYSxtQixXQUFBLG1COzs7QUFFVDs7Ozs7QUFLQSxpQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQStDO0FBQUEseUVBQUosRUFBSTs7QUFBQSwrQkFBdEIsTUFBc0I7QUFBQSxZQUF0QixNQUFzQiwrQkFBYixLQUFhO0FBQUE7O0FBQUEsbUVBQzNDLHlCQUFNLEdBQU4sQ0FEMkM7O0FBRzNDLGNBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxjQUFLLE1BQUwsR0FBYyxNQUFkO0FBSjJDO0FBSzlDOztBQUVEOzs7OztrQ0FHQSxPLG9CQUFRLE8sRUFBUztBQUNiLFlBQUksYUFBYSxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBakI7QUFBQSxZQUNJLGNBQWMsV0FBVyxHQUFYLENBQWU7QUFBQSxtQkFBUSxLQUFLLE9BQUwsRUFBUjtBQUFBLFNBQWYsQ0FEbEI7O0FBR0EsWUFBSSxZQUFZLE1BQVosS0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsbUJBQU8sWUFBWSxDQUFaLENBQVA7QUFDSDs7QUFFRCxZQUFJLGdCQUFnQixXQUFXLEtBQVgsQ0FBaUIsZ0JBQVE7QUFDekMsbUJBQU8sZ0VBQ0Msc0RBRFI7QUFFSCxTQUhtQixDQUFwQjs7QUFLQSxZQUFJLGVBQWEsWUFBWSxJQUFaLENBQWlCLEdBQWpCLENBQWIsTUFBSjs7QUFFQSxZQUFJLENBQUMsYUFBTCxFQUFvQjtBQUNoQixxQkFBUyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQVQ7QUFDSDs7QUFFRCxlQUFPLEtBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsTUFBekIsRUFBaUM7QUFDcEMsb0JBQVEsWUFBWSxNQURnQjtBQUVwQyxxQkFBUztBQUYyQixTQUFqQyxDQUFQO0FBSUgsSzs7QUFFRDs7Ozs7O2tDQUlBLE8sb0JBQVEsTyxFQUFTO0FBQ2IsWUFBSSxPQUFPLEtBQUssR0FBTCxDQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBWDs7QUFFQSxlQUFVLElBQVYsU0FBa0IsT0FBbEI7QUFDSCxLOztrQ0FFRCxVLHlCQUFhO0FBQ1Q7QUFDQSxZQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsTUFBWixJQUFzQixLQUFLLE1BQS9CLEVBQXVDO0FBQ25DLG1CQUFPLEtBQUssS0FBWjtBQUNIOztBQUVELFlBQUksUUFBUSxFQUFaO0FBQUEsWUFDSSxRQUFRLEVBRFo7O0FBR0EsWUFBSSxhQUFhLFNBQWIsVUFBYSxHQUFNO0FBQ25CLGdCQUFJLG1CQUFKOztBQUVBLGdCQUFJLE1BQU0sTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUNwQiw2QkFBYSxNQUFNLENBQU4sQ0FBYjtBQUNILGFBRkQsTUFFTyxJQUFJLE1BQU0sTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ3pCLDZCQUFhLHFEQUNULElBQUksbUJBQUosQ0FBd0IsS0FBeEIsRUFBK0IsTUFBTSxDQUFOLEVBQVMsR0FBeEMsRUFBNkMsRUFBQyxRQUFRLElBQVQsRUFBN0MsQ0FEUyxFQUVULE1BQU0sQ0FBTixFQUFTLEdBRkEsQ0FBYjtBQUlIOztBQUVELGdCQUFJLFVBQUosRUFBZ0I7QUFDWixzQkFBTSxJQUFOLENBQVcsVUFBWDtBQUNIOztBQUVELG9CQUFRLEVBQVI7QUFDSCxTQWpCRDs7QUFtQkEsWUFBSSxZQUFZLFNBQVosU0FBWSxDQUFDLElBQUQsRUFBVTtBQUN0QixnQkFBSSxPQUFPLE1BQU0sTUFBTSxNQUFOLEdBQWUsQ0FBckIsQ0FBWDs7QUFFQSxnQkFBSSxNQUFNLE1BQU4sSUFBZ0Isc0RBQWhCLElBQXNELHNEQUExRCxFQUE4RjtBQUMxRixxQkFBSyxNQUFMLElBQWUsS0FBSyxNQUFwQjtBQUNILGFBRkQsTUFFTztBQUNILHNCQUFNLElBQU4sQ0FBVyxJQUFYO0FBQ0g7QUFDSixTQVJEOztBQVVBLGFBQUssSUFBSSxRQUFRLENBQWpCLEVBQW9CLFFBQVEsS0FBSyxLQUFMLENBQVcsTUFBdkMsRUFBK0MsT0FBL0MsRUFBd0Q7QUFDcEQsZ0JBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQVg7O0FBRUEsZ0JBQUksc0RBQUosRUFBd0M7QUFDcEMsMEJBQVUsSUFBVjtBQUNILGFBRkQsTUFFTyxJQUFJLHdEQUFKLEVBQXlDLENBRS9DLENBRk0sTUFFQTtBQUNIO0FBQ0Esc0JBQU0sSUFBTixDQUFXLElBQVg7QUFDSDtBQUNKOztBQUVEOztBQUVBLGVBQU8sS0FBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7O3dCQU1PLE8sb0JBQVEsSyxFQUFPLEcsRUFBSztBQUN2QixlQUFPLElBQUksbUJBQUosQ0FBd0IsSUFBSSxZQUFKLENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLENBQXhCLEVBQXNELEdBQXRELENBQVA7QUFDSCxLIiwiZmlsZSI6IlRlbXBsYXRlTm9kZUNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGUnO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVIZWxwZXJ9IGZyb20gJy4vVGVtcGxhdGVOb2RlSGVscGVyJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlU3RyaW5nfSBmcm9tICcuL1RlbXBsYXRlTm9kZVN0cmluZyc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZVZhcn0gZnJvbSAnLi9UZW1wbGF0ZU5vZGVWYXInO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGVTdHJpbmdQcm94eSc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUNvbW1lbnR9IGZyb20gJy4vVGVtcGxhdGVOb2RlQ29tbWVudCc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUNvbXBvbmVudH0gZnJvbSBcIi4vVGVtcGxhdGVOb2RlQ29tcG9uZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZU5vZGVDb250ZW50IGV4dGVuZHMgVGVtcGxhdGVOb2RlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVOb2RlW119IG5vZGVzXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1lcmdlZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vZGVzLCBlbnYsIHttZXJnZWQgPSBmYWxzZX0gPSB7fSkge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICAgICAgdGhpcy5tZXJnZWQgPSBtZXJnZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG1lcmdlTm9kZXMgPSB0aGlzLm1lcmdlTm9kZXMob3B0aW9ucyksXG4gICAgICAgICAgICBvdXRwdXRBcnJheSA9IG1lcmdlTm9kZXMubWFwKG5vZGUgPT4gbm9kZS5jb21waWxlKCkpO1xuXG4gICAgICAgIGlmIChvdXRwdXRBcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXRBcnJheVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc0tub3duT3V0cHV0ID0gbWVyZ2VOb2Rlcy5ldmVyeShub2RlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlQ29tcG9uZW50IHx8XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgaW5zdGFuY2VvZiBUZW1wbGF0ZU5vZGVTdHJpbmdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG91dHB1dCA9IGBbJHtvdXRwdXRBcnJheS5qb2luKCcsJyl9XWA7XG5cbiAgICAgICAgaWYgKCFpc0tub3duT3V0cHV0KSB7XG4gICAgICAgICAgICBvdXRwdXQgPSB0aGlzLmZsYXR0ZW4ob3V0cHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmVudi5mYWN0b3J5Q29tcGlsZWQob3V0cHV0LCB7XG4gICAgICAgICAgICBsZW5ndGg6IG91dHB1dEFycmF5Lmxlbmd0aCxcbiAgICAgICAgICAgIGlzQXJyYXk6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBmbGF0dGVuKGNvbnRlbnQpIHtcbiAgICAgICAgbGV0IGZ1bmMgPSB0aGlzLmVudi5yZXNvbHZlUnVudGltZSgnbWVyZ2VTdHJpbmdzJyk7XG5cbiAgICAgICAgcmV0dXJuIGAke2Z1bmN9KCR7Y29udGVudH0sIGNvbnRleHQpYDtcbiAgICB9XG5cbiAgICBtZXJnZU5vZGVzKCkge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5ub2RlcztcbiAgICAgICAgaWYgKCF0aGlzLm5vZGVzLmxlbmd0aCB8fCB0aGlzLm1lcmdlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXM7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbm9kZXMgPSBbXSxcbiAgICAgICAgICAgIHF1ZXVlID0gW107XG5cbiAgICAgICAgbGV0IGZsdXNoUXVldWUgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0Tm9kZTtcblxuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdE5vZGUgPSBxdWV1ZVswXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdE5vZGUgPSBuZXcgVGVtcGxhdGVOb2RlU3RyaW5nUHJveHkoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUZW1wbGF0ZU5vZGVDb250ZW50KHF1ZXVlLCBxdWV1ZVswXS5lbnYsIHttZXJnZWQ6IHRydWV9KSxcbiAgICAgICAgICAgICAgICAgICAgcXVldWVbMF0uZW52XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlc3VsdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlc3VsdE5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBwdXNoUXVldWUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGxhc3QgPSBxdWV1ZVtxdWV1ZS5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCAmJiBub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlU3RyaW5nICYmIGxhc3QgaW5zdGFuY2VvZiBUZW1wbGF0ZU5vZGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBsYXN0LnN0cmluZyArPSBub2RlLnN0cmluZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2Rlc1tpbmRleF07XG5cbiAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgVGVtcGxhdGVOb2RlU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcHVzaFF1ZXVlKG5vZGUpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBUZW1wbGF0ZU5vZGVDb21tZW50KSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZsdXNoUXVldWUoKTtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmx1c2hRdWV1ZSgpO1xuXG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t0eXBlOiBzdHJpbmd9W119IG5vZGVzXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUVudmlyb25tZW50fSBlbnZcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVDb250ZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5KG5vZGVzLCBlbnYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZU5vZGVDb250ZW50KGVudi5mYWN0b3J5Tm9kZXMobm9kZXMsIGVudiksIGVudik7XG4gICAgfVxuXG59Il19