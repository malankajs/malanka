'use strict';

exports.__esModule = true;
exports.CollectionComponent = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _Component2 = require('./Component');

var _Collection = require('../Data/Collection');

var _ValueProxy = require('../Data/ValueProxy');

var _Defaults = require('../Decorators/Defaults');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionComponent = exports.CollectionComponent = (_dec = (0, _Defaults.Defaults)({
    modelName: 'model'
}), _dec(_class = function (_Component) {
    (0, _inherits3.default)(CollectionComponent, _Component);

    function CollectionComponent(options) {
        (0, _classCallCheck3.default)(this, CollectionComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, options));

        _this._children = new WeakMap();
        _this._originalCollection = _this.collection;
        return _this;
    }

    /**
     * @param {Element|null} [element]
     *
     * @returns {*}
     */


    CollectionComponent.prototype.render = function render() {
        var _this2 = this;

        var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        // first render, we need check type
        if (!this.isRendered()) {
            var value;

            var _ret = function () {
                var collection = _this2.collection;

                if (collection instanceof _ValueProxy.ValueProxy) {
                    var _ret2 = function () {
                        var _element = void 0;

                        _this2.listenTo(collection, function (value) {
                            if (value instanceof _Collection.Collection && collection !== value) {
                                _this2.stopListening(collection);
                                _this2._listenCollection(collection);
                            }

                            _this2.render(_element);
                            _element = null;
                        });

                        value = collection.getValue();


                        if (value instanceof _Collection.Collection) {
                            _this2.collection = value;
                            _this2._listenCollection(value);
                        } else {
                            _this2.prepareContent = _this2._prepareValueProxyContent;

                            // we wait something awesome, schedule restore
                            if (element && !value.length && collection.getNestedPromises().length) {
                                _this2.element = _element = element;
                                _this2._isRendered = true;

                                return {
                                    v: {
                                        v: void 0
                                    }
                                };
                            }
                        }
                    }();

                    if (typeof _ret2 === "object") return _ret2.v;
                } else if (collection instanceof _Collection.Collection) {
                    _this2._listenCollection(collection);

                    _this2.prepareContent = _this2._prepareArrayContent;
                } else if (Array.isArray(collection)) {
                    _this2.prepareContent = _this2._prepareArrayContent;
                } else {
                    return {
                        v: console.error('Cannot render collection. Unsupported type', collection)
                    };
                }
            }();

            if (typeof _ret === "object") return _ret.v;
        }

        return _Component.prototype.render.call(this, element);
    };

    /**
     * @param {Collection} collection
     * @private
     */


    CollectionComponent.prototype._listenCollection = function _listenCollection(collection) {
        var _this3 = this;

        collection.channel('add').on(function (model) {
            return _this3.addChild(model);
        });
        collection.channel('remove').on(function (model) {
            return _this3.removeChild(model);
        });
        collection.channel('reset').on(function () {
            return _this3.render();
        });

        this.prepareContent = this._prepareArrayContent;
    };

    /**
     * @returns {Component[]}
     *
     * @private
     */


    CollectionComponent.prototype._prepareArrayContent = function _prepareArrayContent() {
        var _this4 = this;

        return this._defaultPrepare(this.collection.map(function (model) {
            return _this4.prepareChild(model);
        }));
    };

    /**
     * @returns {Component[]}
     *
     * @private
     */


    CollectionComponent.prototype._prepareValueProxyContent = function _prepareValueProxyContent() {
        var _this5 = this;

        return this._defaultPrepare(this.collection.getValue().map(function (model) {
            return _this5.prepareChild(model);
        }));
    };

    /**
     * @params {Component[]} content
     *
     * @returns {Component[]}
     *
     * @private
     */


    CollectionComponent.prototype._defaultPrepare = function _defaultPrepare(content) {
        if (this.emptyTemplate && !content.length) {
            content = this.emptyTemplate(this) || [];

            if (!Array.isArray(content)) {
                content = [content];
            }

            this._isEmpty = true;
        } else {
            if (this.template) {
                this.childComponents = content;

                content = _Component.prototype.prepareContent.call(this);
            }

            this._isEmpty = false;
        }

        return content;
    };

    /**
     * @param {*} model
     *
     * @returns {Component}
     */


    CollectionComponent.prototype.prepareChild = function prepareChild(model) {
        var template = this.childTemplate,
            ChildComponent = this.ChildComponent,
            component = typeof model === 'object' ? this._children.get(model) : null;

        if (component) {
            return component;
        }

        var options = Object.assign({}, this.componentOptions());

        if (ChildComponent) {
            var _Object$assign;

            component = new ChildComponent(Object.assign(options, (_Object$assign = {}, _Object$assign[this.modelName] = model, _Object$assign)));
        } else {
            component = template(model);

            if (!(component instanceof _Component2.Component)) {
                component = new _Component2.Component(Object.assign(options, {
                    content: component
                }));
            }
        }

        if (typeof model === 'object') {
            this._children.set(model, component);
        }

        return component;
    };

    /**
     * @param {*} model
     */


    CollectionComponent.prototype.addChild = function addChild(model) {
        if (this.isRendered()) {
            if (this._isEmpty) {
                return this.render();
            }

            var component = this.prepareChild(model),
                index = this.collection.indexOf(model);

            this.components.push(component);

            if (!component.isRendered()) {
                this.getEnv().render(component);
            }

            if (index > -1 || index !== this.collection.length) {
                this.getRenderer().appendAt(this.element, component.getElement(), index);
            } else {
                this.getRenderer().append(this.element, component.getElement());
            }
        }
    };

    /**
     * @param {*} model
     */


    CollectionComponent.prototype.removeChild = function removeChild(model) {
        if (this.isRendered()) {
            var component = this._children.get(model),
                index = this.components.indexOf(component);

            if (component && index > -1) {
                this.components.splice(index, 1);

                if (component.isRendered()) {
                    this.getRenderer().removeChild(this.element, component.getElement());
                    component.destroy();
                }
            }

            if (!this.collection.length) {
                this.render();
            }
        }
    };

    /**
     * @param {Element} element
     * @returns {Component}
     */


    CollectionComponent.prototype.getComponentForElement = function getComponentForElement(element) {
        return this.components.find(function (component) {
            return component.getElement() === element;
        });
    };

    /**
     * @returns {{}}
     */


    CollectionComponent.prototype.componentOptions = function componentOptions() {
        return {};
    };

    CollectionComponent.prototype.destroy = function destroy() {
        _Component.prototype.destroy.call(this);

        this.collection = this._originalCollection;
    };

    return CollectionComponent;
}(_Component2.Component)) || _class);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9Db21wb25lbnRzL0NvbGxlY3Rpb25Db21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0lBS2EsbUIsV0FBQSxtQixXQUhaLHdCQUFTO0FBQ04sZUFBVztBQURMLENBQVQsQzs7O0FBS0csaUNBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBLG1FQUNqQixzQkFBTSxPQUFOLENBRGlCOztBQUdqQixjQUFLLFNBQUwsR0FBaUIsSUFBSSxPQUFKLEVBQWpCO0FBQ0EsY0FBSyxtQkFBTCxHQUEyQixNQUFLLFVBQWhDO0FBSmlCO0FBS3BCOztBQUVEOzs7Ozs7O2tDQUtBLE0scUJBQXVCO0FBQUE7O0FBQUEsWUFBaEIsT0FBZ0IseURBQU4sSUFBTTs7QUFDbkI7QUFDQSxZQUFJLENBQUMsS0FBSyxVQUFMLEVBQUwsRUFBd0I7QUFBQSxnQkFnQlosS0FoQlk7O0FBQUE7QUFDcEIsb0JBQUksYUFBYSxPQUFLLFVBQXRCOztBQUVBLG9CQUFJLDRDQUFKLEVBQXNDO0FBQUE7QUFDbEMsNEJBQUksaUJBQUo7O0FBRUEsK0JBQUssUUFBTCxDQUFjLFVBQWQsRUFBMEIsVUFBQyxLQUFELEVBQVc7QUFDakMsZ0NBQUksMkNBQStCLGVBQWUsS0FBbEQsRUFBeUQ7QUFDckQsdUNBQUssYUFBTCxDQUFtQixVQUFuQjtBQUNBLHVDQUFLLGlCQUFMLENBQXVCLFVBQXZCO0FBQ0g7O0FBRUQsbUNBQUssTUFBTCxDQUFZLFFBQVo7QUFDQSx1Q0FBVyxJQUFYO0FBQ0gseUJBUkQ7O0FBVUksZ0NBQVEsV0FBVyxRQUFYLEVBYnNCOzs7QUFlbEMsNEJBQUksdUNBQUosRUFBaUM7QUFDN0IsbUNBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBLG1DQUFLLGlCQUFMLENBQXVCLEtBQXZCO0FBQ0gseUJBSEQsTUFHTztBQUNILG1DQUFLLGNBQUwsR0FBc0IsT0FBSyx5QkFBM0I7O0FB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LEsiLCJmaWxlIjoiQ29sbGVjdGlvbkNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQge0NvbGxlY3Rpb259IGZyb20gJy4uL0RhdGEvQ29sbGVjdGlvbic7XG5pbXBvcnQge1ZhbHVlUHJveHl9IGZyb20gXCIuLi9EYXRhL1ZhbHVlUHJveHlcIjtcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gXCIuLi9EZWNvcmF0b3JzL0RlZmF1bHRzXCI7XG5cbkBEZWZhdWx0cyh7XG4gICAgbW9kZWxOYW1lOiAnbW9kZWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25Db21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcblxuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsQ29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR8bnVsbH0gW2VsZW1lbnRdXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICByZW5kZXIoZWxlbWVudCA9IG51bGwpIHtcbiAgICAgICAgLy8gZmlyc3QgcmVuZGVyLCB3ZSBuZWVkIGNoZWNrIHR5cGVcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgbGV0IGNvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb247XG5cbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uIGluc3RhbmNlb2YgVmFsdWVQcm94eSkge1xuICAgICAgICAgICAgICAgIGxldCBfZWxlbWVudDtcblxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG8oY29sbGVjdGlvbiwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24gJiYgY29sbGVjdGlvbiAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcExpc3RlbmluZyhjb2xsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbkNvbGxlY3Rpb24oY29sbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihfZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIF9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbGxlY3Rpb24uZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbkNvbGxlY3Rpb24odmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUNvbnRlbnQgPSB0aGlzLl9wcmVwYXJlVmFsdWVQcm94eUNvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2FpdCBzb21ldGhpbmcgYXdlc29tZSwgc2NoZWR1bGUgcmVzdG9yZVxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAmJiAhdmFsdWUubGVuZ3RoICYmIGNvbGxlY3Rpb24uZ2V0TmVzdGVkUHJvbWlzZXMoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IF9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzUmVuZGVyZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuQ29sbGVjdGlvbihjb2xsZWN0aW9uKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJlcGFyZUNvbnRlbnQgPSB0aGlzLl9wcmVwYXJlQXJyYXlDb250ZW50O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlQ29udGVudCA9IHRoaXMuX3ByZXBhcmVBcnJheUNvbnRlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdDYW5ub3QgcmVuZGVyIGNvbGxlY3Rpb24uIFVuc3VwcG9ydGVkIHR5cGUnLCBjb2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5yZW5kZXIoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb2xsZWN0aW9ufSBjb2xsZWN0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbGlzdGVuQ29sbGVjdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24uY2hhbm5lbCgnYWRkJykub24oKG1vZGVsKSA9PiB0aGlzLmFkZENoaWxkKG1vZGVsKSk7XG4gICAgICAgIGNvbGxlY3Rpb24uY2hhbm5lbCgncmVtb3ZlJykub24oKG1vZGVsKSA9PiB0aGlzLnJlbW92ZUNoaWxkKG1vZGVsKSk7XG4gICAgICAgIGNvbGxlY3Rpb24uY2hhbm5lbCgncmVzZXQnKS5vbigoKSA9PiB0aGlzLnJlbmRlcigpKTtcblxuICAgICAgICB0aGlzLnByZXBhcmVDb250ZW50ID0gdGhpcy5fcHJlcGFyZUFycmF5Q29udGVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50W119XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wcmVwYXJlQXJyYXlDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFByZXBhcmUodGhpcy5jb2xsZWN0aW9uLm1hcChtb2RlbCA9PiB0aGlzLnByZXBhcmVDaGlsZChtb2RlbCkpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50W119XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wcmVwYXJlVmFsdWVQcm94eUNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0UHJlcGFyZSh0aGlzLmNvbGxlY3Rpb24uZ2V0VmFsdWUoKS5tYXAobW9kZWwgPT4gdGhpcy5wcmVwYXJlQ2hpbGQobW9kZWwpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtcyB7Q29tcG9uZW50W119IGNvbnRlbnRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnRbXX1cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2RlZmF1bHRQcmVwYXJlKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZW1wdHlUZW1wbGF0ZSAmJiAhY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmVtcHR5VGVtcGxhdGUodGhpcykgfHwgW107XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBbY29udGVudF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lzRW1wdHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkQ29tcG9uZW50cyA9IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50ID0gc3VwZXIucHJlcGFyZUNvbnRlbnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsqfSBtb2RlbFxuICAgICAqXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBwcmVwYXJlQ2hpbGQobW9kZWwpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy5jaGlsZFRlbXBsYXRlLFxuICAgICAgICAgICAgQ2hpbGRDb21wb25lbnQgPSB0aGlzLkNoaWxkQ29tcG9uZW50LFxuICAgICAgICAgICAgY29tcG9uZW50ID0gdHlwZW9mIG1vZGVsID09PSAnb2JqZWN0JyA/IHRoaXMuX2NoaWxkcmVuLmdldChtb2RlbCkgOiBudWxsO1xuXG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29tcG9uZW50T3B0aW9ucygpKTtcblxuICAgICAgICBpZiAoQ2hpbGRDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IG5ldyBDaGlsZENvbXBvbmVudChPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgICBbdGhpcy5tb2RlbE5hbWVdOiBtb2RlbFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcG9uZW50ID0gdGVtcGxhdGUobW9kZWwpO1xuXG4gICAgICAgICAgICBpZiAoIShjb21wb25lbnQgaW5zdGFuY2VvZiBDb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gbmV3IENvbXBvbmVudChPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogY29tcG9uZW50XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnNldChtb2RlbCwgY29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsqfSBtb2RlbFxuICAgICAqL1xuICAgIGFkZENoaWxkKG1vZGVsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMucHJlcGFyZUNoaWxkKG1vZGVsKSxcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuY29sbGVjdGlvbi5pbmRleE9mKG1vZGVsKTtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcblxuICAgICAgICAgICAgaWYgKCFjb21wb25lbnQuaXNSZW5kZXJlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbnYoKS5yZW5kZXIoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEgfHwgaW5kZXggIT09IHRoaXMuY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuYXBwZW5kQXQodGhpcy5lbGVtZW50LCBjb21wb25lbnQuZ2V0RWxlbWVudCgpLCBpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5hcHBlbmQodGhpcy5lbGVtZW50LCBjb21wb25lbnQuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Kn0gbW9kZWxcbiAgICAgKi9cbiAgICByZW1vdmVDaGlsZChtb2RlbCkge1xuICAgICAgICBpZiAodGhpcy5pc1JlbmRlcmVkKCkpIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLl9jaGlsZHJlbi5nZXQobW9kZWwpLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCAmJiBpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmlzUmVuZGVyZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50LCBjb21wb25lbnQuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5jb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIGdldENvbXBvbmVudEZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzLmZpbmQoY29tcG9uZW50ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQuZ2V0RWxlbWVudCgpID09PSBlbGVtZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgY29tcG9uZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSB0aGlzLl9vcmlnaW5hbENvbGxlY3Rpb247XG4gICAgfVxuXG59Il19