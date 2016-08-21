'use strict';

exports.__esModule = true;
exports.Model = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _ValueProxy = require('./ValueProxy');

var _Prototype = require('../Decorators/Prototype');

var _Events2 = require('./Events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = exports.Model = (_dec = (0, _Prototype.Prototype)({
    idAttribute: 'id'
}), _dec(_class = function (_Events) {
    (0, _inherits3.default)(Model, _Events);

    /**
     * @param {{}} attrs
     * @param {{}} options
     */
    function Model(attrs) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        (0, _classCallCheck3.default)(this, Model);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Events.call(this));

        _this._proxies = {};

        if (_this.defaults) {
            Object.assign(_this, _this.defaults);
        }

        if (attrs) {
            Object.assign(_this, attrs);
        }

        _this._options = options;

        if (_this.initialize) {
            _this.initialize(attrs, options);
        }
        return _this;
    }

    /**
     * @param {string} key
     * @param {*} value
     * @param {boolean} trigger
     */


    Model.prototype.set = function set(key, value) {
        var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var _ref$trigger = _ref.trigger;
        var trigger = _ref$trigger === undefined ? true : _ref$trigger;

        if (this[key] !== value) {
            this[key] = value;

            if (trigger) {
                this.emitToChannel('change:' + key, value);
            }

            this.emit(this, key);
        }
    };

    /**
     * @param {{}} attrs
     */


    Model.prototype.setAttrs = function setAttrs(attrs) {
        var _this2 = this;

        Object.keys(attrs).forEach(function (key) {
            return _this2.set(key, attrs[key]);
        });
    };

    /**
     * @param {string} key
     *
     * @returns {*}
     */


    Model.prototype.get = function get(key) {
        return this[key];
    };

    /**
     * @param {string} key
     *
     * @returns {ValueProxy}
     */


    Model.prototype.proxy = function proxy(key) {
        if (!this._proxies[key]) {
            var value = this.get(key);

            if (value instanceof _ValueProxy.ValueProxy) {
                this._proxies[key] = value;
            } else {
                this._proxies[key] = _ValueProxy.ValueProxy.fromModel(this, key);
            }
        }

        return this._proxies[key];
    };

    /**
     * @param {{}} options
     */


    Model.prototype.remove = function remove(options) {
        var _this3 = this;

        var promise = this.getRequest().del({
            url: this._prepareUrl()
        });

        return promise.then(function () {
            _this3.set(_this3.idAttribute, null);

            _this3.channel('remove').emit(_this3);
        });
    };

    /**
     * @returns {Promise}
     */


    Model.prototype.save = function save() {
        var _this4 = this;

        var data = this.toJSON(),
            idAttribute = this.idAttribute,
            request = this.getRequest(),
            promise = void 0;

        if (data[idAttribute]) {
            promise = request.put({
                url: this._prepareUrl(),
                data: data
            });
        } else {
            promise = request.post({
                url: this._prepareUrl(),
                data: data
            });
        }

        return promise.then(function (attrs) {
            _this4.setAttrs(attrs);

            return _this4;
        });
    };

    /**
     * @returns {string}
     * @private
     */


    Model.prototype._prepareUrl = function _prepareUrl() {
        var id = this[this.idAttribute];

        if (id) {
            return this.url + '/' + id;
        } else {
            return this.url;
        }
    };

    /**
     * @returns {AbstractRequest}
     */


    Model.prototype.getRequest = function getRequest() {
        return this._options.request;
    };

    /**
     * @returns {{}}
     */


    Model.prototype.toJSON = function toJSON() {
        var _this5 = this;

        var result = {};

        Object.keys(this).filter(function (key) {
            return key[0] !== '_' || key === _this5.idAttribute;
        }).forEach(function (key) {
            var value = _this5[key];

            if (value && value.serialize) {
                result[key] = value.serialize();
            } else {
                result[key] = value;
            }
        });

        return result;
    };

    /**
     * @returns {{}}
     */


    Model.prototype.serialize = function serialize() {
        return this.toJSON();
    };

    /**
     * @param {{}} data
     * @param {{}} dependencies
     *
     * @returns {Model}
     */


    Model.restore = function restore(data, dependencies) {
        return this.dataFactory(data, dependencies);
    };

    /**
     * @param {{}} options
     * @returns {Model}
     */


    Model.factory = function factory(options) {
        return this.dataFactory(null, options);
    };

    /**
     * @param {{}|null} data
     * @param {{}} [options]
     *
     * @returns {Model}
     */


    Model.dataFactory = function dataFactory(data, options) {
        return new this(data, options);
    };

    return Model;
}(_Events2.Events)) || _class);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EYXRhL01vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztJQUthLEssV0FBQSxLLFdBSFosMEJBQVU7QUFDUCxpQkFBYTtBQUROLENBQVYsQzs7O0FBS0c7Ozs7QUFJQSxtQkFBWSxLQUFaLEVBQWlDO0FBQUEsWUFBZCxPQUFjLHlEQUFKLEVBQUk7QUFBQTs7QUFBQSxtRUFDN0Isa0JBRDZCOztBQUc3QixjQUFLLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsWUFBSSxNQUFLLFFBQVQsRUFBbUI7QUFDZixtQkFBTyxNQUFQLFFBQW9CLE1BQUssUUFBekI7QUFDSDs7QUFFRCxZQUFJLEtBQUosRUFBVztBQUNQLG1CQUFPLE1BQVAsUUFBb0IsS0FBcEI7QUFDSDs7QUFFRCxjQUFLLFFBQUwsR0FBZ0IsT0FBaEI7O0FBRUEsWUFBSSxNQUFLLFVBQVQsRUFBcUI7QUFDakIsa0JBQUssVUFBTCxDQUFnQixLQUFoQixFQUF1QixPQUF2QjtBQUNIO0FBakI0QjtBQWtCaEM7O0FBRUQ7Ozs7Ozs7b0JBS0EsRyxnQkFBSSxHLEVBQUssSyxFQUE4QjtBQUFBLHlFQUFKLEVBQUk7O0FBQUEsZ0NBQXRCLE9BQXNCO0FBQUEsWUFBdEIsT0FBc0IsZ0NBQVosSUFBWTs7QUFDbkMsWUFBSSxLQUFLLEdBQUwsTUFBYyxLQUFsQixFQUF5QjtBQUNyQixpQkFBSyxHQUFMLElBQVksS0FBWjs7QUFFQSxnQkFBSSxPQUFKLEVBQWE7QUFDVCxxQkFBSyxhQUFMLENBQW1CLFlBQVksR0FBL0IsRUFBb0MsS0FBcEM7QUFDSDs7QUFFRCxpQkFBSyxJQUFMLENBQVUsSUFBVixFQUFnQixHQUFoQjtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7b0JBR0EsUSxxQkFBUyxLLEVBQU87QUFBQTs7QUFDWixlQUFPLElBQVAsQ0FBWSxLQUFaLEVBQW1CLE9BQW5CLENBQTJCO0FBQUEsbUJBQU8sT0FBSyxHQUFM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LEVBQWM7QUFDL0IsZUFBTyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsWUFBdkIsQ0FBUDtBQUNILEs7O0FBRUQ7Ozs7OztVQUlPLE8sb0JBQVEsTyxFQUFTO0FBQ3BCLGVBQU8sS0FBSyxXQUFMLENBQWlCLElBQWpCLEVBQXVCLE9BQXZCLENBQVA7QUFDSCxLOztBQUVEOzs7Ozs7OztVQU1PLFcsd0JBQVksSSxFQUFNLE8sRUFBUztBQUM5QixlQUFPLElBQUksSUFBSixDQUFTLElBQVQsRUFBZSxPQUFmLENBQVA7QUFDSCxLIiwiZmlsZSI6Ik1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWYWx1ZVByb3h5fSBmcm9tICcuL1ZhbHVlUHJveHknO1xuaW1wb3J0IHtQcm90b3R5cGV9IGZyb20gJy4uL0RlY29yYXRvcnMvUHJvdG90eXBlJztcbmltcG9ydCB7RXZlbnRzfSBmcm9tICcuL0V2ZW50cyc7XG5cbkBQcm90b3R5cGUoe1xuICAgIGlkQXR0cmlidXRlOiAnaWQnXG59KVxuZXhwb3J0IGNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IGF0dHJzXG4gICAgICogQHBhcmFtIHt7fX0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9wcm94aWVzID0ge307XG5cbiAgICAgICAgaWYgKHRoaXMuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5kZWZhdWx0cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXR0cnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXR0cnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKGF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHtib29sZWFufSB0cmlnZ2VyXG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUsIHt0cmlnZ2VyID0gdHJ1ZX0gPSB7fSkge1xuICAgICAgICBpZiAodGhpc1trZXldICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0VG9DaGFubmVsKCdjaGFuZ2U6JyArIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQodGhpcywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IGF0dHJzXG4gICAgICovXG4gICAgc2V0QXR0cnMoYXR0cnMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goa2V5ID0+IHRoaXMuc2V0KGtleSwgYXR0cnNba2V5XSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWVQcm94eX1cbiAgICAgKi9cbiAgICBwcm94eShrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcm94aWVzW2tleV0pIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFZhbHVlUHJveHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm94aWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJveGllc1trZXldID0gVmFsdWVQcm94eS5mcm9tTW9kZWwodGhpcywga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm94aWVzW2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gb3B0aW9uc1xuICAgICAqL1xuICAgIHJlbW92ZShvcHRpb25zKSB7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5nZXRSZXF1ZXN0KCkuZGVsKHtcbiAgICAgICAgICAgIHVybDogdGhpcy5fcHJlcGFyZVVybCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXQodGhpcy5pZEF0dHJpYnV0ZSwgbnVsbCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbCgncmVtb3ZlJykuZW1pdCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnRvSlNPTigpLFxuICAgICAgICAgICAgaWRBdHRyaWJ1dGUgPSB0aGlzLmlkQXR0cmlidXRlLFxuICAgICAgICAgICAgcmVxdWVzdCA9IHRoaXMuZ2V0UmVxdWVzdCgpLFxuICAgICAgICAgICAgcHJvbWlzZTtcblxuICAgICAgICBpZiAoZGF0YVtpZEF0dHJpYnV0ZV0pIHtcbiAgICAgICAgICAgIHByb21pc2UgPSByZXF1ZXN0LnB1dCh7XG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLl9wcmVwYXJlVXJsKCksXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlID0gcmVxdWVzdC5wb3N0KHtcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuX3ByZXBhcmVVcmwoKSxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oYXR0cnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRycyhhdHRycyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3ByZXBhcmVVcmwoKSB7XG4gICAgICAgIGxldCBpZCA9IHRoaXNbdGhpcy5pZEF0dHJpYnV0ZV07XG5cbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy51cmx9LyR7aWR9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtBYnN0cmFjdFJlcXVlc3R9XG4gICAgICovXG4gICAgZ2V0UmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnMucmVxdWVzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcylcbiAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleVswXSAhPT0gJ18nIHx8IGtleSA9PT0gdGhpcy5pZEF0dHJpYnV0ZSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLnNlcmlhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlLnNlcmlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7e319XG4gICAgICovXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b0pTT04oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBkYXRhXG4gICAgICogQHBhcmFtIHt7fX0gZGVwZW5kZW5jaWVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TW9kZWx9XG4gICAgICovXG4gICAgc3RhdGljIHJlc3RvcmUoZGF0YSwgZGVwZW5kZW5jaWVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFGYWN0b3J5KGRhdGEsIGRlcGVuZGVuY2llcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNb2RlbH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZmFjdG9yeShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFGYWN0b3J5KG51bGwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e318bnVsbH0gZGF0YVxuICAgICAqIEBwYXJhbSB7e319IFtvcHRpb25zXVxuICAgICAqXG4gICAgICogQHJldHVybnMge01vZGVsfVxuICAgICAqL1xuICAgIHN0YXRpYyBkYXRhRmFjdG9yeShkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhkYXRhLCBvcHRpb25zKTtcbiAgICB9XG5cbn0iXX0=