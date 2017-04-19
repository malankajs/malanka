'use strict';

exports.__esModule = true;
exports.Component = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _utils = require('../utils');

var _ValueProxy = require('../Data/ValueProxy');

var _Prototype = require('../Decorators/Prototype');

var _Model = require('../Data/Model');

var _TextComponent = require('./TextComponent');

var _AbstractComponent2 = require('./AbstractComponent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = exports.Component = (_dec = (0, _Prototype.Prototype)({
    tagName: 'div',
    styles: {}
}), _dec(_class = function (_AbstractComponent) {
    (0, _inherits3.default)(Component, _AbstractComponent);

    /**
     * @param {{[env]: Environment}} options
     */
    function Component() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        (0, _classCallCheck3.default)(this, Component);

        var _this = (0, _possibleConstructorReturn3.default)(this, _AbstractComponent.call(this, options));

        var events = _this.events,
            attributes = _this.attributes;

        Object.assign(_this, options);

        if (events || options.events) {
            _this.events = Object.assign({}, events, options.events);
        }

        if (attributes || options.attributes) {
            _this.attributes = Object.assign({}, attributes, options.attributes);
        } else {
            _this.attributes = {};
        }

        _this._className = (0, _utils.result)(_this, 'class') || (0, _utils.result)(_this, 'className');

        _this._listenAttributes = {};

        if (_this.element) {
            _this._isRendered = true;
        }

        if (_this.initialize) {
            _this.initialize(options);
        }
        return _this;
    }

    /**
     * Render component
     *
     * @params {Element} element restore
     */


    Component.prototype.render = function render() {
        var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        var className = this._className,
            attributes = this.attributes,
            tagName = this.tagName;

        if (!this.isRendered()) {
            if (element) {
                this.element = element;
            } else {
                this.element = this.getRenderer().createElement(tagName);
            }
        }

        if (className !== undefined) {
            attributes['class'] = className;
        }

        this.setAttributes(attributes, element);
        this.renderContent(element);

        if (!this.isRendered()) {
            this.listenEvents();
        }

        if (this.onRender) {
            this.onRender();
        }

        this._isRendered = true;
    };

    /**
     * @returns {Component[]}
     */


    Component.prototype.renderContent = function renderContent() {
        var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        var content = this.prepareContent(),
            renderer = this.getRenderer();

        var components = [],
            currentComponents = this.components.slice(),
            newComponents = content,
            elements = element ? [].slice.call(element.childNodes) : [];

        if (element) {
            // Browser generate tbody for table
            // if we have only it - ignore
            if (element.tagName && element.tagName.toLowerCase() === 'table' && elements.length === 1) {
                elements = [].slice.call(elements[0].childNodes);
            }

            if (newComponents.length !== elements.length) {
                // if we have empty element, just render
                if (elements.length) {
                    console.warn('Restore Components count %d, but we have %d nodes', newComponents.length, elements.length);

                    // clean component and render
                    renderer.clear(this.element);
                }

                element = null;
                elements = [];
            }
        }

        for (var index = 0; index < newComponents.length; index++) {
            var component = this.prepareComponent(newComponents[index]),
                currentIndex = currentComponents.indexOf(component);

            if (component) {
                if (currentIndex !== -1) {
                    currentComponents.splice(currentIndex, 1);
                }

                if (!component.isRendered()) {
                    this.getEnv().render(component, element && elements.shift());
                }

                components.push(component);
            }
        }

        for (var _index = 0; _index < currentComponents.length; _index++) {
            currentComponents[_index].destroy();
        }

        this.components = components;

        if (!element) {
            for (var _index2 = 0; _index2 < components.length; _index2++) {
                renderer.append(this.element, components[_index2].getElement());
            }
        }

        return components;
    };

    /**
     * @returns {*[]}
     */


    Component.prototype.prepareContent = function prepareContent() {
        var content = this.content,
            template = this.template;

        if (typeof content === 'function') {
            content = content(this);
        }

        if (template) {
            content = template(this);
        }

        if (content == null) {
            content = [];
        }

        if (!Array.isArray(content)) {
            content = [content];
        }

        return content;
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {Component|ValueProxy|string|number|boolean|array} component
     *
     * @returns {AbstractComponent}
     */


    Component.prototype.prepareComponent = function prepareComponent(component) {
        if (component instanceof _ValueProxy.ValueProxy || typeof component !== 'object') {
            component = new _TextComponent.TextComponent({
                content: component
            });
        }

        return component;
    };

    /**
     * @param {{}} attributes
     * @param {Element} element
     */


    Component.prototype.setAttributes = function setAttributes(attributes) {
        var _this2 = this;

        var element = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        var options = { update: !element };

        Object.keys(attributes).forEach(function (key) {
            _this2.setAttribute(key, attributes[key], options);
        });
    };

    /**
     * @param {string} key
     * @param {string|ValueProxy} attribute
     * @param {boolean} update
     */


    Component.prototype.setAttribute = function setAttribute(key, attribute) {
        var _this3 = this;

        var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var _ref$update = _ref.update;
        var update = _ref$update === undefined ? true : _ref$update;

        var renderer = this.getRenderer();

        if (attribute != null) {
            if (attribute instanceof _ValueProxy.ValueProxy) {
                if (this._listenAttributes[key]) {
                    this._listenAttributes[key]();
                }

                var callback = this.getPlanner().commitWrapper(function (value) {
                    if (_this3.isRendered()) {
                        renderer.setAttribute(_this3.element, key, String(value));
                    }
                });

                this.listenTo(attribute, callback);

                this._listenAttributes[key] = function () {
                    attribute.off(callback);
                };
            }

            if (update) {
                renderer.setAttribute(this.element, key, String(attribute));
            }
        }
    };

    /**
     * Listen DOM events
     */


    Component.prototype.listenEvents = function listenEvents() {
        var _this4 = this;

        if (this.events) {
            (function () {
                var renderer = _this4.getRenderer();

                Object.keys(_this4.events).forEach(function (event) {
                    renderer.addEventListener(_this4.element, event, _this4.events[event].bind(_this4));
                });
            })();
        }
    };

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */


    Component.prototype.proxy = function proxy(key) {
        return this[key];
    };

    /**
     * @param {string} name
     * @param {*} args
     */


    Component.prototype.emitEvent = function emitEvent(name) {
        if (this.events && this.events[name]) {
            var _events;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            (_events = this.events)[name].apply(_events, args);
        }
    };

    /**
     * Destroy component
     */


    Component.prototype.destroy = function destroy() {
        _AbstractComponent.prototype.destroy.call(this);
        this.components.forEach(function (component) {
            return component.destroy();
        });
    };

    /**
     * @returns {Model}
     */


    (0, _createClass3.default)(Component, [{
        key: 'state',
        get: function get() {
            if (!this._state) {
                this._state = new _Model.Model(this.stateDefaults);
            }

            return this._state;
        }

        /**
         * @param {Model} state
         */
        ,
        set: function set(state) {
            this._state = state;
        }
    }]);
    return Component;
}(_AbstractComponent2.AbstractComponent)) || _class);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL0NvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0lBTWEsUyxXQUFBLFMsV0FKWiwwQkFBVTtBQUNQLGFBQVMsS0FERjtBQUVQLFlBQVE7QUFGRCxDQUFWLEM7OztBQU1HOzs7QUFHQSx5QkFBMEI7QUFBQSxZQUFkLE9BQWMseURBQUosRUFBSTtBQUFBOztBQUFBLG1FQUN0Qiw4QkFBTSxPQUFOLENBRHNCOztBQUd0QixZQUFJLFNBQVMsTUFBSyxNQUFsQjtBQUFBLFlBQ0ksYUFBYSxNQUFLLFVBRHRCOztBQUdBLGVBQU8sTUFBUCxRQUFvQixPQUFwQjs7QUFFQSxZQUFJLFVBQVUsUUFBUSxNQUF0QixFQUE4QjtBQUMxQixrQkFBSyxNQUFMLEdBQWMsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixNQUFsQixFQUEwQixRQUFRLE1BQWxDLENBQWQ7QUFDSDs7QUFFRCxZQUFJLGNBQWMsUUFBUSxVQUExQixFQUFzQztBQUNsQyxrQkFBSyxVQUFMLEdBQWtCLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsVUFBbEIsRUFBOEIsUUFBUSxVQUF0QyxDQUFsQjtBQUNILFNBRkQsTUFFTztBQUNILGtCQUFLLFVBQUwsR0FBa0IsRUFBbEI7QUFDSDs7QUFFRCxjQUFLLFVBQUwsR0FBa0IsMEJBQWEsT0FBYixLQUF5QiwwQkFBYSxXQUFiLENBQTNDOztBQUVBLGNBQUssaUJBQUwsR0FBeUIsRUFBekI7O0FBRUEsWUFBSSxNQUFLLE9BQVQsRUFBa0I7QUFDZCxrQkFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0g7O0FBRUQsWUFBSSxNQUFLLFVBQVQsRUFBcUI7QUFDakIsa0JBQUssVUFBTCxDQUFnQixPQUFoQjtBQUNIO0FBNUJxQjtBQTZCekI7O0FBRUQ7Ozs7Ozs7d0JBS0EsTSxxQkFBdUI7QUFBQSxZQUFo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QUssT0FBL0IsRUFBd0MsS0FBeEMsRUFBK0MsT0FBSyxNQUFMLENBQVksS0FBWixFQUFtQixJQUFuQixRQUEvQztBQUNILGlCQUZEO0FBSGE7QUFNaEI7QUFDSixLOztBQUVEOzs7Ozs7O3dCQUtBLEssa0JBQU0sRyxFQUFLO0FBQ1AsZUFBTyxLQUFLLEdBQUwsQ0FBUDtBQUNILEs7O0FBRUQ7Ozs7Ozt3QkFJQSxTLHNCQUFVLEksRUFBZTtBQUNyQixZQUFJLEtBQUssTUFBTCxJQUFlLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBbkIsRUFBc0M7QUFBQTs7QUFBQSw4Q0FEdkIsSUFDdUI7QUFEdkIsb0JBQ3VCO0FBQUE7O0FBQ2xDLDRCQUFLLE1BQUwsRUFBWSxJQUFaLGlCQUFxQixJQUFyQjtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7d0JBR0EsTyxzQkFBVTtBQUNOLHFDQUFNLE9BQU47QUFDQSxhQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0I7QUFBQSxtQkFBYSxVQUFVLE9BQVYsRUFBYjtBQUFBLFNBQXhCO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs0QkFHWTtBQUNSLGdCQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2QscUJBQUssTUFBTCxHQUFjLGlCQUFVLEtBQUssYUFBZixDQUFkO0FBQ0g7O0FBRUQsbUJBQU8sS0FBSyxNQUFaO0FBQ0g7O0FBRUQ7Ozs7MEJBR1UsSyxFQUFPO0FBQ2IsaUJBQUssTUFBTCxHQUFjLEtBQWQ7QUFDSCIsImZpbGUiOiJDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Jlc3VsdH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtWYWx1ZVByb3h5fSBmcm9tICcuLi9EYXRhL1ZhbHVlUHJveHknO1xuaW1wb3J0IHtQcm90b3R5cGV9IGZyb20gJy4uL0RlY29yYXRvcnMvUHJvdG90eXBlJztcbmltcG9ydCB7TW9kZWx9IGZyb20gJy4uL0RhdGEvTW9kZWwnO1xuXG5pbXBvcnQge1RleHRDb21wb25lbnR9IGZyb20gJy4vVGV4dENvbXBvbmVudCc7XG5pbXBvcnQge0Fic3RyYWN0Q29tcG9uZW50fSBmcm9tICcuL0Fic3RyYWN0Q29tcG9uZW50JztcblxuQFByb3RvdHlwZSh7XG4gICAgdGFnTmFtZTogJ2RpdicsXG4gICAgc3R5bGVzOiB7fVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3tbZW52XTogRW52aXJvbm1lbnR9fSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgICAgIGxldCBldmVudHMgPSB0aGlzLmV2ZW50cyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXM7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICBpZiAoZXZlbnRzIHx8IG9wdGlvbnMuZXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50cywgb3B0aW9ucy5ldmVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgfHwgb3B0aW9ucy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBhdHRyaWJ1dGVzLCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jbGFzc05hbWUgPSByZXN1bHQodGhpcywgJ2NsYXNzJykgfHwgcmVzdWx0KHRoaXMsICdjbGFzc05hbWUnKTtcblxuICAgICAgICB0aGlzLl9saXN0ZW5BdHRyaWJ1dGVzID0ge307XG5cbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5faXNSZW5kZXJlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgY29tcG9uZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW1zIHtFbGVtZW50fSBlbGVtZW50IHJlc3RvcmVcbiAgICAgKi9cbiAgICByZW5kZXIoZWxlbWVudCA9IG51bGwpIHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuX2NsYXNzTmFtZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICB0YWdOYW1lID0gdGhpcy50YWdOYW1lO1xuXG4gICAgICAgIGlmICghdGhpcy5pc1JlbmRlcmVkKCkpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5nZXRSZW5kZXJlcigpLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNbJ2NsYXNzJ10gPSBjbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZXMoYXR0cmlidXRlcywgZWxlbWVudCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudChlbGVtZW50KTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNSZW5kZXJlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbkV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25SZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMub25SZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzUmVuZGVyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRbXX1cbiAgICAgKi9cbiAgICByZW5kZXJDb250ZW50KGVsZW1lbnQgPSBudWxsKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5wcmVwYXJlQ29udGVudCgpLFxuICAgICAgICAgICAgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKCk7XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBbXSxcbiAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnRzID0gdGhpcy5jb21wb25lbnRzLnNsaWNlKCksXG4gICAgICAgICAgICBuZXdDb21wb25lbnRzID0gY29udGVudCxcbiAgICAgICAgICAgIGVsZW1lbnRzID0gZWxlbWVudCA/IFtdLnNsaWNlLmNhbGwoZWxlbWVudC5jaGlsZE5vZGVzKSA6IFtdO1xuXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBCcm93c2VyIGdlbmVyYXRlIHRib2R5IGZvciB0YWJsZVxuICAgICAgICAgICAgLy8gaWYgd2UgaGF2ZSBvbmx5IGl0IC0gaWdub3JlXG4gICAgICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lICYmIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGFibGUnICYmIGVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gW10uc2xpY2UuY2FsbChlbGVtZW50c1swXS5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld0NvbXBvbmVudHMubGVuZ3RoICE9PSBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGVtcHR5IGVsZW1lbnQsIGp1c3QgcmVuZGVyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1Jlc3RvcmUgQ29tcG9uZW50cyBjb3VudCAlZCwgYnV0IHdlIGhhdmUgJWQgbm9kZXMnLCBuZXdDb21wb25lbnRzLmxlbmd0aCwgZWxlbWVudHMubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbiBjb21wb25lbnQgYW5kIHJlbmRlclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5jbGVhcih0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbmV3Q29tcG9uZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLnByZXBhcmVDb21wb25lbnQobmV3Q29tcG9uZW50c1tpbmRleF0pLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGN1cnJlbnRDb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnRzLnNwbGljZShjdXJyZW50SW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50LmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVudigpLnJlbmRlcihjb21wb25lbnQsIGVsZW1lbnQgJiYgZWxlbWVudHMuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50Q29tcG9uZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnRzW2luZGV4XS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXBvbmVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYXBwZW5kKHRoaXMuZWxlbWVudCwgY29tcG9uZW50c1tpbmRleF0uZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHsqW119XG4gICAgICovXG4gICAgcHJlcGFyZUNvbnRlbnQoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50LFxuICAgICAgICAgICAgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSB0ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgY29udGVudCA9IFtjb250ZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudHxWYWx1ZVByb3h5fHN0cmluZ3xudW1iZXJ8Ym9vbGVhbnxhcnJheX0gY29tcG9uZW50XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7QWJzdHJhY3RDb21wb25lbnR9XG4gICAgICovXG4gICAgcHJlcGFyZUNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIFZhbHVlUHJveHkgfHwgdHlwZW9mIGNvbXBvbmVudCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IG5ldyBUZXh0Q29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb21wb25lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBhdHRyaWJ1dGVzXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICovXG4gICAgc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzLCBlbGVtZW50ID0gbnVsbCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHt1cGRhdGU6ICFlbGVtZW50fTtcblxuICAgICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xWYWx1ZVByb3h5fSBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVwZGF0ZVxuICAgICAqL1xuICAgIHNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZSwge3VwZGF0ZSA9IHRydWV9ID0ge30pIHtcbiAgICAgICAgbGV0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZSBpbnN0YW5jZW9mIFZhbHVlUHJveHkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdGVuQXR0cmlidXRlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbkF0dHJpYnV0ZXNba2V5XSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuZ2V0UGxhbm5lcigpLmNvbW1pdFdyYXBwZXIoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudCwga2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5UbyhhdHRyaWJ1dGUsIGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbkF0dHJpYnV0ZXNba2V5XSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlLm9mZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQsIGtleSwgU3RyaW5nKGF0dHJpYnV0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIERPTSBldmVudHNcbiAgICAgKi9cbiAgICBsaXN0ZW5FdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50cykge1xuICAgICAgICAgICAgbGV0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmV2ZW50cykuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVsZW1lbnQsIGV2ZW50LCB0aGlzLmV2ZW50c1tldmVudF0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZVByb3h5fVxuICAgICAqL1xuICAgIHByb3h5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXG4gICAgICovXG4gICAgZW1pdEV2ZW50KG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzICYmIHRoaXMuZXZlbnRzW25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tuYW1lXSguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgY29tcG9uZW50XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMuZm9yRWFjaChjb21wb25lbnQgPT4gY29tcG9uZW50LmRlc3Ryb3koKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge01vZGVsfVxuICAgICAqL1xuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBuZXcgTW9kZWwodGhpcy5zdGF0ZURlZmF1bHRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge01vZGVsfSBzdGF0ZVxuICAgICAqL1xuICAgIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxufVxuIl19