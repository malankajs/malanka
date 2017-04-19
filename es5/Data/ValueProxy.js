'use strict';

exports.__esModule = true;
exports.ValueProxy = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Events2 = require('./Events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueProxy = exports.ValueProxy = function (_Events) {
    (0, _inherits3.default)(ValueProxy, _Events);

    /**
     * @param {function} set
     * @param {function} get
     * @param {function} subscribe
     * @param {function} unsubscribe
     * @param {ValueProxy[]} parents
     */
    function ValueProxy() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var set = _ref.set;
        var get = _ref.get;
        var subscribe = _ref.subscribe;
        var unsubscribe = _ref.unsubscribe;
        var parents = _ref.parents;
        (0, _classCallCheck3.default)(this, ValueProxy);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Events.call(this));

        _this.parents = parents || [];
        _this.setValue = set;
        _this.subscribe = subscribe;
        _this.unsubscribe = unsubscribe;
        _this.isActive = false;

        if (get) {
            _this.getValue = get;
        }
        return _this;
    }

    /**
     * @param {function} callback
     *
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.on = function on(callback) {
        _Events.prototype.on.call(this, callback);

        if (!this.isActive) {
            if (this.subscribe) {
                this.subscribe();
            }

            this.isActive = true;
        }

        return this;
    };

    /**
     * @param {function} callback
     *
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.off = function off(callback) {
        _Events.prototype.off.call(this, callback);

        if (!this._listeners.length) {
            if (this.unsubscribe) {
                this.unsubscribe();
            }

            this.isActive = false;

            this.stopListening();
        }

        return this;
    };

    /**
     * @param {*} value
     */


    ValueProxy.prototype.emitValue = function emitValue(value) {
        if (value !== this.value) {
            this.value = value;
            this.emit(value);
        }
    };

    /**
     * @returns {*}
     */


    ValueProxy.prototype.getValue = function getValue() {
        return this.value;
    };

    /**
     * @param {function} mutate
     *
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.pipe = function pipe(mutate) {
        return ValueProxy.pipe(this, mutate);
    };

    /**
     * @param {ValueProxy} args
     *
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.and = function and() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return ValueProxy.all([this].concat(args));
    };

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.proxy = function proxy(key) {
        var value = this.getValue();
        //
        // if (typeof value.proxy === 'function') {
        //     return value.proxy(key);
        // }

        return this.pipe(function (value) {
            return value && value[key];
        });
    };

    /**
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.then = function then() {
        return ValueProxy.then(this);
    };

    //noinspection ReservedWordAsName
    /**
     * @returns {ValueProxy}
     */


    ValueProxy.prototype.catch = function _catch() {
        return ValueProxy.catch(this);
    };

    /**
     * @returns {ValueProxy[]}
     */


    ValueProxy.prototype.getNestedParents = function getNestedParents() {
        var parents = this.parents.slice();

        parents.forEach(function (parent) {
            return parents.concat(parent.getNestedParents());
        });

        return parents;
    };

    /**
     * @returns {Promise[]}
     */


    ValueProxy.prototype.getNestedPromises = function getNestedPromises() {
        return this.getNestedParents().map(function (parent) {
            return parent._promise;
        }).filter(Boolean);
    };

    /**
     * @returns {string}
     */


    ValueProxy.prototype.toString = function toString() {
        return String(this.getValue());
    };

    /**
     * @returns {number}
     */


    ValueProxy.prototype.toNumber = function toNumber() {
        return Number(this.getValue());
    };

    /**
     * @param {*} obj
     *
     * @returns {ValueProxy}
     */


    ValueProxy.fromValue = function fromValue(obj) {
        if (obj instanceof ValueProxy) {
            return obj;
        }

        return new ValueProxy({
            get: function get() {
                return this.value = obj;
            }
        });
    };

    /**
     * @param {Model} obj
     * @param {string} key
     *
     * @returns {ValueProxy}
     */


    ValueProxy.fromModel = function fromModel(obj, key) {
        return new ValueProxy({
            get: function get() {
                return this.value = obj.get(key);
            },
            set: function set(value) {
                obj.set(key, value);
            },
            subscribe: function subscribe() {
                var _this2 = this;

                var change = obj.channel('change:' + key);

                this.listenTo(change, function (value) {
                    return _this2.emitValue(value);
                });

                this.getValue();
            }
        });
    };

    /**
     * @param proxy
     * @param mutate
     * @returns {ValueProxy}
     */


    ValueProxy.pipe = function pipe(proxy, mutate) {
        var valueProxy = new ValueProxy({
            parents: [proxy],
            get: function get() {
                if (!this.isActive) {
                    this.value = mutate(proxy.getValue());
                }

                return this.value;
            },
            set: function set(value) {
                return proxy.setValue(value);
            },
            subscribe: function subscribe() {
                var _this3 = this;

                //noinspection JSUnusedAssignment
                valueProxy.listenTo(proxy, function (args) {
                    _this3.emitValue(mutate(args));
                });

                this.getValue();
            }
        });

        return valueProxy;
    };

    /**
     * @param {ValueProxy[]} proxies
     *
     * @returns {ValueProxy}
     */


    ValueProxy.all = function all(proxies) {
        var valueProxy = new ValueProxy({
            parents: proxies,
            get: function get() {
                if (!this.isActive) {
                    this.values = proxies.map(function (proxy) {
                        return proxy.getValue();
                    });
                }

                return this.values;
            },
            subscribe: function subscribe() {
                var _this4 = this;

                proxies.forEach(function (proxy, index) {
                    valueProxy.listenTo(proxy, function (value) {
                        if (_this4.values[index] !== value) {
                            var newValues = _this4.values; //.slice();

                            newValues[index] = value;

                            valueProxy.emit(newValues);
                        }
                    });
                });

                // force get value to override cache
                this.getValue();
            }
        });

        return valueProxy;
    };

    /**
     * @param {ValueProxy} proxy
     *
     * @returns {ValueProxy}
     */


    ValueProxy.then = function then(proxy) {
        return this.fromPromise(proxy, 'then');
    };

    //noinspection ReservedWordAsName
    /**
     * @param {ValueProxy} proxy
     *
     * @returns {ValueProxy}
     */


    ValueProxy.catch = function _catch(proxy) {
        return this.fromPromise(proxy, 'catch');
    };

    /**
     * @param {ValueProxy} proxy
     * @param {string} method
     *
     * @returns {ValueProxy}
     */


    ValueProxy.fromPromise = function fromPromise(proxy, method) {
        var valueProxy = new ValueProxy({
            parents: [proxy],
            get: function get() {
                // If activated return current value
                if (!this.isActive) {
                    // If not activated force activate
                    this.emitPromise(proxy.getValue());
                }

                return this.value;
            },
            subscribe: function subscribe() {
                var _this5 = this;

                this.listenTo(proxy, function (promise) {
                    return _this5.emitPromise(promise);
                });

                // force get value to override cache
                this.getValue();
            }
        });

        /**
         * @param {Promise} promise
         */
        valueProxy.emitPromise = function (promise) {
            var _this6 = this;

            if (promise) {
                this._promise = Promise.resolve(this._promise).catch(function () {
                    // fix previous
                }).then(function () {
                    return promise[method](function (value) {
                        return _this6.emitValue(value);
                    });
                });
            }
        };

        return valueProxy;
    };

    return ValueProxy;
}(_Events2.Events);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EYXRhL1ZhbHVlUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUVhLFUsV0FBQSxVOzs7QUFFVDs7Ozs7OztBQU9BLDBCQUE4RDtBQUFBLHlFQUFKLEVBQUk7O0FBQUEsWUFBakQsR0FBaUQsUUFBakQsR0FBaUQ7QUFBQSxZQUE1QyxHQUE0QyxRQUE1QyxHQUE0QztBQUFBLFlBQXZDLFNBQXVDLFFBQXZDLFNBQXVDO0FBQUEsWUFBNUIsV0FBNEIsUUFBNUIsV0FBNEI7QUFBQSxZQUFmLE9BQWUsUUFBZixPQUFlO0FBQUE7O0FBQUEsbUVBQzFELGtCQUQwRDs7QUFHMUQsY0FBSyxPQUFMLEdBQWUsV0FBVyxFQUExQjtBQUNBLGNBQUssUUFBTCxHQUFnQixHQUFoQjtBQUNBLGNBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLGNBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNBLGNBQUssUUFBTCxHQUFnQixLQUFoQjs7QUFFQSxZQUFJLEdBQUosRUFBUztBQUNMLGtCQUFLLFFBQUwsR0FBZ0IsR0FBaEI7QUFDSDtBQVh5RDtBQVk3RDs7QUFFRDs7Ozs7Ozt5QkFLQSxFLGVBQUcsUSxFQUFVO0FBQ1QsMEJBQU0sRUFBTixZQUFTLFFBQVQ7O0FBRUEsWUFBSSxDQUFDLEtBQUssUUFBVixFQUFvQjtBQUNoQixnQkFBSSxLQUFLLFNBQVQsRUFBb0I7QUFDaEIscUJBQUssU0FBTDtBQUNIOztBQUVELGlCQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxLOztBQUVEOzs7Ozs7O3lCQUtBLEcsZ0JBQUksUSxFQUFVO0FBQ1YsMEJBQU0sR0FBTixZQUFVLFFBQVY7O0FBRUEsWUFBSSxDQUFDLEtBQUssVUFBTCxDQUFnQixNQUFyQixFQUE2QjtBQUN6QixnQkFBSSxLQUFLLFdBQVQsRUFBc0I7QUFDbEIscUJBQUssV0FBTDtBQUNIOztBQUVELGlCQUFLLFFBQUws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SyxRQUFyQixFQUNYLEtBRFcsQ0FDTCxZQUFNO0FBQ1Q7QUFDSCxpQkFIVyxFQUlYLElBSlcsQ0FJTixZQUFNO0FBQ1IsMkJBQU8sUUFBUSxNQUFSLEVBQWdCO0FBQUEsK0JBQVMsT0FBSyxTQUFMLENBQWUsS0FBZixDQUFUO0FBQUEscUJBQWhCLENBQVA7QUFDSCxpQkFOVyxDQUFoQjtBQU9IO0FBQ0osU0FWRDs7QUFZQSxlQUFPLFVBQVA7QUFDSCxLIiwiZmlsZSI6IlZhbHVlUHJveHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50c30gZnJvbSAnLi9FdmVudHMnO1xuXG5leHBvcnQgY2xhc3MgVmFsdWVQcm94eSBleHRlbmRzIEV2ZW50cyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzZXRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdWJzY3JpYmVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB1bnN1YnNjcmliZVxuICAgICAqIEBwYXJhbSB7VmFsdWVQcm94eVtdfSBwYXJlbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioe3NldCwgZ2V0LCBzdWJzY3JpYmUsIHVuc3Vic2NyaWJlLCBwYXJlbnRzfSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5wYXJlbnRzID0gcGFyZW50cyB8fCBbXTtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSA9IHNldDtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsdWUgPSBnZXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgb24oY2FsbGJhY2spIHtcbiAgICAgICAgc3VwZXIub24oY2FsbGJhY2spO1xuXG4gICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgb2ZmKGNhbGxiYWNrKSB7XG4gICAgICAgIHN1cGVyLm9mZihjYWxsYmFjayk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKi9cbiAgICBlbWl0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmVtaXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG11dGF0ZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgcGlwZShtdXRhdGUpIHtcbiAgICAgICAgcmV0dXJuIFZhbHVlUHJveHkucGlwZSh0aGlzLCBtdXRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VmFsdWVQcm94eX0gYXJnc1xuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgYW5kKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIFZhbHVlUHJveHkuYWxsKFt0aGlzLCAuLi5hcmdzXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgcHJveHkoa2V5KSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gaWYgKHR5cGVvZiB2YWx1ZS5wcm94eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHZhbHVlLnByb3h5KGtleSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5waXBlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlW2tleV07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZVByb3h5fVxuICAgICAqL1xuICAgIHRoZW4oKSB7XG4gICAgICAgIHJldHVybiBWYWx1ZVByb3h5LnRoZW4odGhpcyk7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gUmVzZXJ2ZWRXb3JkQXNOYW1lXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgY2F0Y2goKSB7XG4gICAgICAgIHJldHVybiBWYWx1ZVByb3h5LmNhdGNoKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZVByb3h5W119XG4gICAgICovXG4gICAgZ2V0TmVzdGVkUGFyZW50cygpIHtcbiAgICAgICAgbGV0IHBhcmVudHMgPSB0aGlzLnBhcmVudHMuc2xpY2UoKTtcblxuICAgICAgICBwYXJlbnRzLmZvckVhY2gocGFyZW50ID0+IHBhcmVudHMuY29uY2F0KHBhcmVudC5nZXROZXN0ZWRQYXJlbnRzKCkpKTtcblxuICAgICAgICByZXR1cm4gcGFyZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZVtdfVxuICAgICAqL1xuICAgIGdldE5lc3RlZFByb21pc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROZXN0ZWRQYXJlbnRzKClcbiAgICAgICAgICAgIC5tYXAocGFyZW50ID0+IHBhcmVudC5fcHJvbWlzZSlcbiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLmdldFZhbHVlKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgdG9OdW1iZXIoKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRWYWx1ZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyp9IG9ialxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgc3RhdGljIGZyb21WYWx1ZShvYmopIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFZhbHVlUHJveHkpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFZhbHVlUHJveHkoe1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlID0gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge01vZGVsfSBvYmpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWVQcm94eX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbU1vZGVsKG9iaiwga2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmFsdWVQcm94eSh7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPSBvYmouZ2V0KGtleSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb2JqLnNldChrZXksIHZhbHVlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlID0gb2JqLmNoYW5uZWwoJ2NoYW5nZTonICsga2V5KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG8oY2hhbmdlLCB2YWx1ZSA9PiB0aGlzLmVtaXRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJveHlcbiAgICAgKiBAcGFyYW0gbXV0YXRlXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgc3RhdGljIHBpcGUocHJveHksIG11dGF0ZSkge1xuICAgICAgICBsZXQgdmFsdWVQcm94eSA9IG5ldyBWYWx1ZVByb3h5KHtcbiAgICAgICAgICAgIHBhcmVudHM6IFtwcm94eV0sXG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBtdXRhdGUocHJveHkuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJveHkuc2V0VmFsdWUodmFsdWUpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICAgICAgLy9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG4gICAgICAgICAgICAgICAgdmFsdWVQcm94eS5saXN0ZW5Ubyhwcm94eSwgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0VmFsdWUobXV0YXRlKGFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlUHJveHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtWYWx1ZVByb3h5W119IHByb3hpZXNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWYWx1ZVByb3h5fVxuICAgICAqL1xuICAgIHN0YXRpYyBhbGwocHJveGllcykge1xuICAgICAgICBsZXQgdmFsdWVQcm94eSA9IG5ldyBWYWx1ZVByb3h5KHtcbiAgICAgICAgICAgIHBhcmVudHM6IHByb3hpZXMsXG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gcHJveGllcy5tYXAocHJveHkgPT4gcHJveHkuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICBwcm94aWVzLmZvckVhY2goKHByb3h5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZVByb3h5Lmxpc3RlblRvKHByb3h5LCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlc1tpbmRleF0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlcyA9IHRoaXMudmFsdWVzOyAvLy5zbGljZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVQcm94eS5lbWl0KG5ld1ZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yY2UgZ2V0IHZhbHVlIHRvIG92ZXJyaWRlIGNhY2hlXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWVQcm94eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1ZhbHVlUHJveHl9IHByb3h5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWVQcm94eX1cbiAgICAgKi9cbiAgICBzdGF0aWMgdGhlbihwcm94eSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcm9tUHJvbWlzZShwcm94eSwgJ3RoZW4nKTtcbiAgICB9XG5cbiAgICAvL25vaW5zcGVjdGlvbiBSZXNlcnZlZFdvcmRBc05hbWVcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1ZhbHVlUHJveHl9IHByb3h5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWVQcm94eX1cbiAgICAgKi9cbiAgICBzdGF0aWMgY2F0Y2gocHJveHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbVByb21pc2UocHJveHksICdjYXRjaCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VmFsdWVQcm94eX0gcHJveHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWVQcm94eX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVByb21pc2UocHJveHksIG1ldGhvZCkge1xuICAgICAgICB2YXIgdmFsdWVQcm94eSA9IG5ldyBWYWx1ZVByb3h5KHtcbiAgICAgICAgICAgIHBhcmVudHM6IFtwcm94eV0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhY3RpdmF0ZWQgcmV0dXJuIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90IGFjdGl2YXRlZCBmb3JjZSBhY3RpdmF0ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRQcm9taXNlKHByb3h5LmdldFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlblRvKHByb3h5LCBwcm9taXNlID0+IHRoaXMuZW1pdFByb21pc2UocHJvbWlzZSkpO1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yY2UgZ2V0IHZhbHVlIHRvIG92ZXJyaWRlIGNhY2hlXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtQcm9taXNlfSBwcm9taXNlXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZVByb3h5LmVtaXRQcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh0aGlzLl9wcm9taXNlKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZml4IHByZXZpb3VzXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlW21ldGhvZF0odmFsdWUgPT4gdGhpcy5lbWl0VmFsdWUodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdmFsdWVQcm94eTtcbiAgICB9XG5cbn0iXX0=