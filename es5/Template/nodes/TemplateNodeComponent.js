'use strict';

exports.__esModule = true;
exports.TemplateNodeComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _TemplateNode2 = require('./TemplateNode');

var _TemplateNodeString = require('./TemplateNodeString');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateNodeComponent = exports.TemplateNodeComponent = function (_TemplateNode) {
    (0, _inherits3.default)(TemplateNodeComponent, _TemplateNode);

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    function TemplateNodeComponent(node, env) {
        (0, _classCallCheck3.default)(this, TemplateNodeComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, _TemplateNode.call(this, env));

        Object.assign(_this, node);
        return _this;
    }

    /**
     * @returns {string}
     */


    TemplateNodeComponent.prototype.compile = function compile() {
        var _this2 = this;

        var name = this.name,
            ComponentName = this.env.resolveComponent(name),
            isCustomComponent = name === ComponentName,
            params = {},
            regionName = void 0,
            scope = void 0;

        if (name !== 'div' && !isCustomComponent) {
            params.tagName = JSON.stringify(name);
        }

        if (this.attributes.length) {
            (function () {
                var attributes = {},
                    events = {};

                _this2.attributes.forEach(function (attr) {
                    if (attr.isEvent()) {
                        Object.assign(events, attr.compileEvent());
                    } else if (attr.name === 'as') {
                        regionName = attr.value.compile();
                    } else if (attr.name === 'scope') {
                        if (attr.value instanceof _TemplateNodeString.TemplateNodeString) {
                            scope = attr.value.string;
                        } else {
                            throw new Error('Scope must be string');
                        }
                    } else {
                        if (!isCustomComponent) {
                            Object.assign(attributes, attr.compileHash());
                        } else {
                            Object.assign(params, attr.compileHash());
                        }
                    }
                });

                if (Object.keys(attributes).length) {
                    params.attributes = _this2.env.compileHash(attributes);
                }

                if (Object.keys(events).length) {
                    params.events = _this2.env.compileHash(events);
                }
            })();
        }

        if (scope) {
            params.content = this.env.scope({ scope: scope }, function () {
                var content = _this2.compileContent();

                return _this2.env.factoryCompiled('function(' + scope + '){return ' + content + '}', { isString: true, length: content.length });
            });
        } else {
            params.content = this.compileContent();
        }

        if (!params.content.length) {
            delete params.content;
        }

        return (regionName ? regionName + '=' : '') + 'new ' + ComponentName + '(' + this.env.compileHash(params) + ')';
    };

    /**
     * @returns {string}
     */


    TemplateNodeComponent.prototype.compileContent = function compileContent() {
        return this.content.compile({ mergeVars: false });
    };

    /**
     * @param {string} name
     * @returns {TemplateNodeAttribute}
     */


    TemplateNodeComponent.prototype.getAttribute = function getAttribute(name) {
        return this.attributes.find(function (attr) {
            return attr.name === name;
        });
    };

    /**
     * @param {string} name
     * @returns {TemplateNodeAttribute}
     */


    TemplateNodeComponent.prototype.removeAttribute = function removeAttribute(name) {
        this.attributes = this.attributes.filter(function (attr) {
            return attr.name !== name;
        });
    };

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeComponent}
     */


    TemplateNodeComponent.factory = function factory(node, env) {
        node.attributes = (node.attributes || []).map(function (node) {
            return env.factoryAttribute(node);
        });
        node.content = env.factoryContent(node.content || []);

        return new TemplateNodeComponent(node, env);
    };

    return TemplateNodeComponent;
}(_TemplateNode2.TemplateNode);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9UZW1wbGF0ZS9ub2Rlcy9UZW1wbGF0ZU5vZGVDb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztJQUVhLHFCLFdBQUEscUI7OztBQUVUOzs7O0FBSUEsbUNBQVksSUFBWixFQUFrQixHQUFsQixFQUF1QjtBQUFBOztBQUFBLG1FQUNuQix5QkFBTSxHQUFOLENBRG1COztBQUduQixlQUFPLE1BQVAsUUFBb0IsSUFBcEI7QUFIbUI7QUFJdEI7O0FBRUQ7Ozs7O29DQUdBLE8sc0JBQVU7QUFBQTs7QUFDTixZQUFJLE9BQU8sS0FBSyxJQUFoQjtBQUFBLFlBQ0ksZ0JBQWdCLEtBQUssR0FBTCxDQUFTLGdCQUFULENBQTBCLElBQTFCLENBRHBCO0FBQUEsWUFFSSxvQkFBcUIsU0FBUyxhQUZsQztBQUFBLFlBR0ksU0FBUyxFQUhiO0FBQUEsWUFJSSxtQkFKSjtBQUFBLFlBS0ksY0FMSjs7QUFPQSxZQUFJLFNBQVMsS0FBVCxJQUFrQixDQUFDLGlCQUF2QixFQUEwQztBQUN0QyxtQkFBTyxPQUFQLEdBQWlCLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBakI7QUFDSDs7QUFFRCxZQUFJLEtBQUssVUFBTCxDQUFnQixNQUFwQixFQUE0QjtBQUFBO0FBQ3hCLG9CQUFJLGFBQWEsRUFBakI7QUFBQSxvQkFBcUIsU0FBUyxFQUE5Qjs7QUFFQSx1QkFBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLGdCQUFRO0FBQzVCLHdCQUFJLEtBQUssT0FBTCxFQUFKLEVBQW9CO0FBQ2hCLCtCQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXNCLEtBQUssWUFBTCxFQUF0QjtBQUNILHFCQUZELE1BRU8sSUFBSSxLQUFLLElBQUwsS0FBYyxJQUFsQixFQUF3QjtBQUMzQixxQ0FBYSxLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQWI7QUFDSCxxQkFGTSxNQUVBLElBQUksS0FBSyxJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDOUIsNEJBQUksS0FBSyxLQUFMLGtEQUFKLEVBQThDO0FBQzFDLG9DQUFRLEtBQUssS0FBTCxDQUFXLE1BQW5CO0FBQ0gseUJBRkQsTUFFTztBQUNILGtDQUFNLElBQUksS0FBSixDQUFVLHNCQUFWLENBQU47QUFDSDtBQUNKLHFCQU5NLE1BTUE7QUFDSCw0QkFBSSxDQUFDLGlCQUFMLEVBQXdCO0FBQ3BCLG1DQUFPLE1BQVAsQ0FBYyxVQUFkLEVBQTBCLEtBQUssV0FBTCxFQUExQjtBQUNILHlCQUZELE1BRU87QUFDSCxtQ0FBTyxNQUFQLENBQWMsTUFBZCxFQUFzQixLQUFLLFdBQUwsRUFBdEI7QUFDSDtBQUNKO0FBQ0osaUJBbEJEOztBQW9CQSxvQkFBSSxPQUFPLElBQVAsQ0FBWSxVQUFaLEVBQXdCLE1BQTVCLEVBQW9DO0FBQ2hDLDJCQUFPLFVBQVAsR0FBb0IsT0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixVQUFyQixDQUFwQjtBQUNIOztBQUVELG9CQUFJLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsTUFBeEIsRUFBZ0M7QUFDNUIsMkJBQU8sTUFBUCxHQUFnQixPQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLE1BQXJCLENBQWhCO0FBQ0g7QUE3QnVCO0FBOEIzQjs7QUFFRCxZQUFJLEtBQUosRUFBVztBQUNQLG1CQUFPLE9BQVAsR0FBaUIsS0FBSyxHQUFMLENBQVMsS0FBVCxDQUFlLEVBQUMsWUFBRCxFQUFmLEVBQXdCLFlBQU07QUFDM0Msb0JBQUksVUFBVSxPQUFLLGNBQUwsRUFBZDs7QUFFQSx1QkFBTyxPQUFLLEdBQUwsQ0FBUyxlQUFULGVBQXFDLEtBQXJDLGlCQUFzRCxPQUF0RCxRQUFrRSxFQUFDLFVBQVUsSUFBWCxFQUFpQixRQUFRLFFBQVEsTUFBakMsRUFBbEUsQ0FBUDtBQUNILGFBSmdCLENBQWpCO0FBS0gsU0FORCxNQU1PO0FBQ0gsbUJBQU8sT0FBUCxHQUFpQixLQUFLLGNBQUwsRUFBakI7QUFDSDs7QUFFRCxZQUFJLENBQUMsT0FBTyxPQUFQLENBQWUsTUFBcEIsRUFBNEI7QUFDeEIsbUJBQU8sT0FBTyxPQUFkO0FBQ0g7O0FBRUQsZ0JBQVUsYUFBYSxhQUFhLEdBQTFCLEdBQWdDLEVBQTFDLGFBQW1ELGFBQW5ELFNBQW9FLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsTUFBckIsQ0FBcEU7QUFDSCxLOztBQUVEOzs7OztvQ0FHQSxjLDZCQUFpQjtBQUNiLGVBQU8sS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixFQUFDLFdBQVcsS0FBWixFQUFyQixDQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7O29DQUlBLFkseUJBQWEsSSxFQUFNO0FBQ2YsZUFBTyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUI7QUFBQSxtQkFBUSxLQUFLLElBQUwsS0FBYyxJQUF0QjtBQUFBLFNBQXJCLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7b0NBSUEsZSw0QkFBZ0IsSSxFQUFNO0FBQ2xCLGFBQUssVUFBTCxHQUFrQixLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUI7QUFBQSxtQkFBUSxLQUFLLElBQUwsS0FBYyxJQUF0QjtBQUFBLFNBQXZCLENBQWxCO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs7MEJBTU8sTyxvQkFBUSxJLEVBQU0sRyxFQUFLO0FBQ3RCLGFBQUssVUFBTCxHQUFrQixDQUFDLEtBQUssVUFBTCxJQUFtQixFQUFwQixFQUF3QixHQUF4QixDQUE0QjtBQUFBLG1CQUFRLElBQUksZ0JBQUosQ0FBcUIsSUFBckIsQ0FBUjtBQUFBLFNBQTVCLENBQWxCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBSSxjQUFKLENBQW1CLEtBQUssT0FBTCxJQUFnQixFQUFuQyxDQUFmOztBQUVBLGVBQU8sSUFBSSxxQkFBSixDQUEwQixJQUExQixFQUFnQyxHQUFoQyxDQUFQO0FBQ0gsSyIsImZpbGUiOiJUZW1wbGF0ZU5vZGVDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RlbXBsYXRlTm9kZX0gZnJvbSAnLi9UZW1wbGF0ZU5vZGUnO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVTdHJpbmd9IGZyb20gXCIuL1RlbXBsYXRlTm9kZVN0cmluZ1wiO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVOb2RlQ29tcG9uZW50IGV4dGVuZHMgVGVtcGxhdGVOb2RlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IG5vZGVcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlRW52aXJvbm1lbnR9IGVudlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIGVudikge1xuICAgICAgICBzdXBlcihlbnYpO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgbm9kZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlKCkge1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubmFtZSxcbiAgICAgICAgICAgIENvbXBvbmVudE5hbWUgPSB0aGlzLmVudi5yZXNvbHZlQ29tcG9uZW50KG5hbWUpLFxuICAgICAgICAgICAgaXNDdXN0b21Db21wb25lbnQgPSAobmFtZSA9PT0gQ29tcG9uZW50TmFtZSksXG4gICAgICAgICAgICBwYXJhbXMgPSB7fSxcbiAgICAgICAgICAgIHJlZ2lvbk5hbWUsXG4gICAgICAgICAgICBzY29wZTtcblxuICAgICAgICBpZiAobmFtZSAhPT0gJ2RpdicgJiYgIWlzQ3VzdG9tQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBwYXJhbXMudGFnTmFtZSA9IEpTT04uc3RyaW5naWZ5KG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVzID0ge30sIGV2ZW50cyA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5pc0V2ZW50KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihldmVudHMsIGF0dHIuY29tcGlsZUV2ZW50KCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0ci5uYW1lID09PSAnYXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbk5hbWUgPSBhdHRyLnZhbHVlLmNvbXBpbGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSA9PT0gJ3Njb3BlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci52YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlTm9kZVN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgPSBhdHRyLnZhbHVlLnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2NvcGUgbXVzdCBiZSBzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNDdXN0b21Db21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgYXR0ci5jb21waWxlSGFzaCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCBhdHRyLmNvbXBpbGVIYXNoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuYXR0cmlidXRlcyA9IHRoaXMuZW52LmNvbXBpbGVIYXNoKGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoZXZlbnRzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuZXZlbnRzID0gdGhpcy5lbnYuY29tcGlsZUhhc2goZXZlbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY29wZSkge1xuICAgICAgICAgICAgcGFyYW1zLmNvbnRlbnQgPSB0aGlzLmVudi5zY29wZSh7c2NvcGV9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbXBpbGVDb250ZW50KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbnYuZmFjdG9yeUNvbXBpbGVkKGBmdW5jdGlvbigke3Njb3BlfSl7cmV0dXJuICR7Y29udGVudH19YCwge2lzU3RyaW5nOiB0cnVlLCBsZW5ndGg6IGNvbnRlbnQubGVuZ3RofSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmFtcy5jb250ZW50ID0gdGhpcy5jb21waWxlQ29udGVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXJhbXMuY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuY29udGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHtyZWdpb25OYW1lID8gcmVnaW9uTmFtZSArICc9JyA6ICcnfW5ldyAke0NvbXBvbmVudE5hbWV9KCR7dGhpcy5lbnYuY29tcGlsZUhhc2gocGFyYW1zKX0pYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBpbGVDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNvbXBpbGUoe21lcmdlVmFyczogZmFsc2V9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVBdHRyaWJ1dGV9XG4gICAgICovXG4gICAgZ2V0QXR0cmlidXRlKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcy5maW5kKGF0dHIgPT4gYXR0ci5uYW1lID09PSBuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVBdHRyaWJ1dGV9XG4gICAgICovXG4gICAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzLmZpbHRlcihhdHRyID0+IGF0dHIubmFtZSAhPT0gbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gbm9kZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVFbnZpcm9ubWVudH0gZW52XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlQ29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBmYWN0b3J5KG5vZGUsIGVudikge1xuICAgICAgICBub2RlLmF0dHJpYnV0ZXMgPSAobm9kZS5hdHRyaWJ1dGVzIHx8IFtdKS5tYXAobm9kZSA9PiBlbnYuZmFjdG9yeUF0dHJpYnV0ZShub2RlKSk7XG4gICAgICAgIG5vZGUuY29udGVudCA9IGVudi5mYWN0b3J5Q29udGVudChub2RlLmNvbnRlbnQgfHwgW10pO1xuXG4gICAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVOb2RlQ29tcG9uZW50KG5vZGUsIGVudik7XG4gICAgfVxuXG59Il19