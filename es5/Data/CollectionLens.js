'use strict';

exports.__esModule = true;
exports.CollectionLens = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Collection2 = require('./Collection');

var _ValueProxy = require('./ValueProxy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollectionLens = exports.CollectionLens = function (_Collection) {
    (0, _inherits3.default)(CollectionLens, _Collection);

    function CollectionLens(baseCollection, filter) {
        (0, _classCallCheck3.default)(this, CollectionLens);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, _Collection.call(this, null, {}));

        _this2._baseCollection = baseCollection;
        _this2._filter = filter;

        _this2.comparator = baseCollection.comparator.bind(baseCollection);
        return _this2;
    }

    CollectionLens.prototype.subscribe = function subscribe() {
        var _this3 = this;

        this.listenTo(this._baseCollection.channel('add'), function (model) {
            return _this3._add(model);
        });
        this.listenTo(this._baseCollection.channel('remove'), function (model) {
            return _this3._remove(model);
        });

        this._baseCollection.forEach(function (model) {
            return _this3._add(model);
        });
    };

    CollectionLens.prototype.constructValueProxy = function constructValueProxy() {
        var _this = this;

        return new _ValueProxy.ValueProxy({
            get: function get() {
                return _this;
            },
            subscribe: function subscribe() {
                _this.subscribe();
            },
            unsubscribe: function unsubscribe() {
                _this.stopListening();
            }
        });
    };

    CollectionLens.prototype._add = function _add(model) {
        var _this4 = this;

        var proxy = this._getProxy(model);

        this.listenTo(proxy, function (accept) {
            if (accept) {
                _this4.add(model);
            } else {
                _this4.remove(model);
            }
        });

        if (proxy.getValue()) {
            this.add(model);
        }
    };

    CollectionLens.prototype._remove = function _remove(model) {
        this.remove(model);
    };

    CollectionLens.prototype._getProxy = function _getProxy(model) {
        return this._filter.call(this._baseCollection, model);
    };

    CollectionLens.lens = function lens() {
        return function (proto, name, desc) {
            var filter = desc.value;

            return {
                get: function get() {
                    var collection = new CollectionLens(this, filter),
                        proxy = collection.constructValueProxy();

                    Object.defineProperty(this, name, { value: proxy });

                    return proxy;
                }
            };
        };
    };

    return CollectionLens;
}(_Collection2.Collection);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EYXRhL0NvbGxlY3Rpb25MZW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFYSxjLFdBQUEsYzs7O0FBRVQsNEJBQVksY0FBWixFQUE0QixNQUE1QixFQUFvQztBQUFBOztBQUFBLG9FQUNoQyx1QkFBTSxJQUFOLEVBQVksRUFBWixDQURnQzs7QUFHaEMsZUFBSyxlQUFMLEdBQXVCLGNBQXZCO0FBQ0EsZUFBSyxPQUFMLEdBQWUsTUFBZjs7QUFFQSxlQUFLLFVBQUwsR0FBa0IsZUFBZSxVQUFmLENBQTBCLElBQTFCLENBQStCLGNBQS9CLENBQWxCO0FBTmdDO0FBT25DOzs2QkFFRCxTLHdCQUFZO0FBQUE7O0FBQ1IsYUFBSyxRQUFMLENBQWMsS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLEtBQTdCLENBQWQsRUFBbUQ7QUFBQSxtQkFBUyxPQUFLLElBQUwsQ0FBVSxLQUFWLENBQVQ7QUFBQSxTQUFuRDtBQUNBLGFBQUssUUFBTCxDQUFjLEtBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixRQUE3QixDQUFkLEVBQXNEO0FBQUEsbUJBQVMsT0FBSyxPQUFMLENBQWEsS0FBYixDQUFUO0FBQUEsU0FBdEQ7O0FBRUEsYUFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCO0FBQUEsbUJBQVMsT0FBSyxJQUFMLENBQVUsS0FBVixDQUFUO0FBQUEsU0FBN0I7QUFDSCxLOzs2QkFFRCxtQixrQ0FBc0I7QUFDbEIsWUFBSSxRQUFRLElBQVo7O0FBRUEsZUFBTywyQkFBZTtBQUNsQixlQURrQixpQkFDWjtBQUNGLHVCQUFPLEtBQVA7QUFDSCxhQUhpQjtBQUlsQixxQkFKa0IsdUJBSU47QUFDUixzQkFBTSxTQUFOO0FBQ0gsYUFOaUI7QUFPbEIsdUJBUGtCLHlCQU9KO0FBQ1Ysc0JBQU0sYUFBTjtBQUNIO0FBVGlCLFNBQWYsQ0FBUDtBQVdILEs7OzZCQUVELEksaUJBQUssSyxFQUFPO0FBQUE7O0FBQ1IsWUFBSSxRQUFRLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBWjs7QUFFQSxhQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLGtCQUFVO0FBQzNCLGdCQUFJLE1BQUosRUFBWTtBQUNKLHVCQUFLLEdBQUwsQ0FBUyxLQUFUO0FBQ1AsYUFGRCxNQUVPO0FBQ0gsdUJBQUssTUFBTCxDQUFZLEtBQVo7QUFDSDtBQUNKLFNBTkQ7O0FBUUEsWUFBSSxNQUFNLFFBQU4sRUFBSixFQUFzQjtBQUNsQixpQkFBSyxHQUFMLENBQVMsS0FBVDtBQUNIO0FBQ0osSzs7NkJBRUQsTyxvQkFBUSxLLEVBQU87QUFDWCxhQUFLLE1BQUwsQ0FBWSxLQUFaO0FBQ0gsSzs7NkJBRUQsUyxzQkFBVSxLLEVBQU87QUFDYixlQUFPLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBSyxlQUF2QixFQUF3QyxLQUF4QyxDQUFQO0FBQ0gsSzs7bUJBRU0sSSxtQkFBTztBQUNWLGVBQU8sVUFBQyxLQUFELEVBQVEsSUFBUixFQUFjLElBQWQsRUFBdUI7QUFDMUIsZ0JBQUksU0FBUyxLQUFLLEtBQWxCOztBQUVBLG1CQUFPO0FBQ0gsbUJBREcsaUJBQ0c7QUFDRix3QkFBSSxhQUFhLElBQUksY0FBSixDQUFtQixJQUFuQixFQUF5QixNQUF6QixDQUFqQjtBQUFBLHdCQUNJLFFBQVEsV0FBVyxtQkFBWCxFQURaOztBQUdBLDJCQUFPLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFBa0MsRUFBQyxPQUFPLEtBQVIsRUFBbEM7O0FBRUEsMkJBQU8sS0FBUDtBQUNIO0FBUkUsYUFBUDtBQVVILFNBYkQ7QUFjSCxLIiwiZmlsZSI6IkNvbGxlY3Rpb25MZW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2xsZWN0aW9ufSBmcm9tICcuL0NvbGxlY3Rpb24nO1xuaW1wb3J0IHtWYWx1ZVByb3h5fSBmcm9tICcuL1ZhbHVlUHJveHknO1xuXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkxlbnMgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGJhc2VDb2xsZWN0aW9uLCBmaWx0ZXIpIHtcbiAgICAgICAgc3VwZXIobnVsbCwge30pO1xuXG4gICAgICAgIHRoaXMuX2Jhc2VDb2xsZWN0aW9uID0gYmFzZUNvbGxlY3Rpb247XG4gICAgICAgIHRoaXMuX2ZpbHRlciA9IGZpbHRlcjtcblxuICAgICAgICB0aGlzLmNvbXBhcmF0b3IgPSBiYXNlQ29sbGVjdGlvbi5jb21wYXJhdG9yLmJpbmQoYmFzZUNvbGxlY3Rpb24pO1xuICAgIH1cblxuICAgIHN1YnNjcmliZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLl9iYXNlQ29sbGVjdGlvbi5jaGFubmVsKCdhZGQnKSwgbW9kZWwgPT4gdGhpcy5fYWRkKG1vZGVsKSk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5fYmFzZUNvbGxlY3Rpb24uY2hhbm5lbCgncmVtb3ZlJyksIG1vZGVsID0+IHRoaXMuX3JlbW92ZShtb2RlbCkpO1xuXG4gICAgICAgIHRoaXMuX2Jhc2VDb2xsZWN0aW9uLmZvckVhY2gobW9kZWwgPT4gdGhpcy5fYWRkKG1vZGVsKSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0VmFsdWVQcm94eSgpIHtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlUHJveHkoe1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3RvcExpc3RlbmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfYWRkKG1vZGVsKSB7XG4gICAgICAgIGxldCBwcm94eSA9IHRoaXMuX2dldFByb3h5KG1vZGVsKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKHByb3h5LCBhY2NlcHQgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZChtb2RlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByb3h5LmdldFZhbHVlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKG1vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZW1vdmUobW9kZWwpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUobW9kZWwpO1xuICAgIH1cblxuICAgIF9nZXRQcm94eShtb2RlbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyLmNhbGwodGhpcy5fYmFzZUNvbGxlY3Rpb24sIG1vZGVsKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbGVucygpIHtcbiAgICAgICAgcmV0dXJuIChwcm90bywgbmFtZSwgZGVzYykgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbHRlciA9IGRlc2MudmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uTGVucyh0aGlzLCBmaWx0ZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkgPSBjb2xsZWN0aW9uLmNvbnN0cnVjdFZhbHVlUHJveHkoKTtcblxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge3ZhbHVlOiBwcm94eX0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cblxufSJdfQ==