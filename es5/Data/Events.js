"use strict";

exports.__esModule = true;
exports.Events = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = exports.Events = function () {
    function Events() {
        (0, _classCallCheck3.default)(this, Events);

        this._listeners = [];
        this._listenings = [];
        this._channels = {};
    }

    /**
     * @param {function} callback
     *
     * @returns {Events}
     */


    Events.prototype.on = function on(callback) {
        this._listeners.push(callback);

        return this;
    };

    /**
     * @param {function} [callback]
     *
     * @returns {Events}
     */


    Events.prototype.off = function off(callback) {
        if (callback) {
            this._listeners = this._listeners.filter(function (_callback) {
                return _callback !== callback;
            });
        } else {
            this._listeners = [];
        }

        return this;
    };

    /**
     * @param {*} value
     * @param {*} [value1]
     * @param {*} [value2]
     * @param {*} [value3]
     *
     * @returns {Events}
     */


    Events.prototype.emit = function emit(value, value1, value2, value3) {
        for (var index = 0; index < this._listeners.length; index++) {
            this._listeners[index](value, value1, value2, value3);
        }

        return this;
    };

    /**
     * @param {string} channel
     * @param {*} value
     * @param {*} [value1]
     * @param {*} [value2]
     * @param {*} [value3]
     */


    Events.prototype.emitToChannel = function emitToChannel(channel, value, value1, value2, value3) {
        if (this._channels[channel]) {
            this._channels[channel].emit(value, value1, value2, value3);
        }
    };

    /**
     * @param {Events} obj
     * @param {function} callback
     *
     * @returns {Events}
     */


    Events.prototype.listenTo = function listenTo(obj, callback) {
        this._listenings.push({ obj: obj, callback: callback });

        obj.on(callback);

        return this;
    };

    /**
     * Stop listening's
     *
     * @param {{}} [listenObject]
     *
     * @returns {Events}
     */


    Events.prototype.stopListening = function stopListening(listenObject) {
        this._listenings.forEach(function (_ref) {
            var obj = _ref.obj;
            var callback = _ref.callback;

            if (!listenObject || obj === listenObject) {
                obj.off(callback);
            }
        });

        return this;
    };

    /**
     * @param {string} name
     * 
     * @returns {Events}
     */


    Events.prototype.channel = function channel(name) {
        if (!this._channels[name]) {
            this._channels[name] = new Events();
        }

        return this._channels[name];
    };

    return Events;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EYXRhL0V2ZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFhLE0sV0FBQSxNO0FBRVQsc0JBQWM7QUFBQTs7QUFDVixhQUFLLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxhQUFLLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsRUFBakI7QUFDSDs7QUFFRDs7Ozs7OztxQkFLQSxFLGVBQUcsUSxFQUFVO0FBQ1QsYUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLFFBQXJCOztBQUVBLGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7cUJBS0EsRyxnQkFBSSxRLEVBQVU7QUFDVixZQUFJLFFBQUosRUFBYztBQUNWLGlCQUFLLFVBQUwsR0FBa0IsS0FBSyxVQUFMLENBQWdCLE1BQWhCLENBQXVCO0FBQUEsdUJBQWEsY0FBYyxRQUEzQjtBQUFBLGFBQXZCLENBQWxCO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsaUJBQUssVUFBTCxHQUFrQixFQUFsQjtBQUNIOztBQUVELGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7Ozs7cUJBUUEsSSxpQkFBSyxLLEVBQU8sTSxFQUFRLE0sRUFBUSxNLEVBQVE7QUFDaEMsYUFBSyxJQUFJLFFBQVEsQ0FBakIsRUFBb0IsUUFBUSxLQUFLLFVBQUwsQ0FBZ0IsTUFBNUMsRUFBb0QsT0FBcEQsRUFBNkQ7QUFDekQsaUJBQUssVUFBTCxDQUFnQixLQUFoQixFQUF1QixLQUF2QixFQUE4QixNQUE5QixFQUFzQyxNQUF0QyxFQUE4QyxNQUE5QztBQUNIOztBQUVELGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7OztxQkFPQSxhLDBCQUFjLE8sRUFBUyxLLEVBQU8sTSxFQUFRLE0sRUFBUSxNLEVBQVE7QUFDbEQsWUFBSSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQUosRUFBNkI7QUFDekIsaUJBQUssU0FBTCxDQUFlLE9BQWYsRUFBd0IsSUFBeEIsQ0FBNkIsS0FBN0IsRUFBb0MsTUFBcEMsRUFBNEMsTUFBNUMsRUFBb0QsTUFBcEQ7QUFDSDtBQUNKLEs7O0FBRUQ7Ozs7Ozs7O3FCQU1BLFEscUJBQVMsRyxFQUFLLFEsRUFBVTtBQUNwQixhQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0IsRUFBQyxRQUFELEVBQU0sa0JBQU4sRUFBdEI7O0FBRUEsWUFBSSxFQUFKLENBQU8sUUFBUDs7QUFFQSxlQUFPLElBQVA7QUFDSCxLOztBQUVEOzs7Ozs7Ozs7cUJBT0EsYSwwQkFBYyxZLEVBQWM7QUFDeEIsYUFBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLGdCQUFxQjtBQUFBLGdCQUFuQixHQUFtQixRQUFuQixHQUFtQjtBQUFBLGdCQUFkLFFBQWMsUUFBZCxRQUFjOztBQUMxQyxnQkFBSSxDQUFDLFlBQUQsSUFBaUIsUUFBUSxZQUE3QixFQUEyQztBQUN2QyxvQkFBSSxHQUFKLENBQVEsUUFBUjtBQUNIO0FBQ0osU0FKRDs7QUFNQSxlQUFPLElBQVA7QUFDSCxLOztBQUVEOzs7Ozs7O3FCQUtBLE8sb0JBQVEsSSxFQUFNO0FBQ1YsWUFBSSxDQUFDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBTCxFQUEyQjtBQUN2QixpQkFBSyxTQUFMLENBQWUsSUFBZixJQUF1QixJQUFJLE1BQUosRUFBdkI7QUFDSDs7QUFFRCxlQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBUDtBQUNILEsiLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEV2ZW50cyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuX2xpc3RlbmluZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5fY2hhbm5lbHMgPSB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqXG4gICAgICogQHJldHVybnMge0V2ZW50c31cbiAgICAgKi9cbiAgICBvbihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRzfVxuICAgICAqL1xuICAgIG9mZihjYWxsYmFjaykge1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5maWx0ZXIoX2NhbGxiYWNrID0+IF9jYWxsYmFjayAhPT0gY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBbdmFsdWUxXVxuICAgICAqIEBwYXJhbSB7Kn0gW3ZhbHVlMl1cbiAgICAgKiBAcGFyYW0geyp9IFt2YWx1ZTNdXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRzfVxuICAgICAqL1xuICAgIGVtaXQodmFsdWUsIHZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tpbmRleF0odmFsdWUsIHZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IFt2YWx1ZTFdXG4gICAgICogQHBhcmFtIHsqfSBbdmFsdWUyXVxuICAgICAqIEBwYXJhbSB7Kn0gW3ZhbHVlM11cbiAgICAgKi9cbiAgICBlbWl0VG9DaGFubmVsKGNoYW5uZWwsIHZhbHVlLCB2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFubmVsc1tjaGFubmVsXSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uZW1pdCh2YWx1ZSwgdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0V2ZW50c30gb2JqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtFdmVudHN9XG4gICAgICovXG4gICAgbGlzdGVuVG8ob2JqLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9saXN0ZW5pbmdzLnB1c2goe29iaiwgY2FsbGJhY2t9KTtcblxuICAgICAgICBvYmoub24oY2FsbGJhY2spO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCBsaXN0ZW5pbmcnc1xuICAgICAqXG4gICAgICogQHBhcmFtIHt7fX0gW2xpc3Rlbk9iamVjdF1cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtFdmVudHN9XG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZyhsaXN0ZW5PYmplY3QpIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuaW5ncy5mb3JFYWNoKCh7b2JqLCBjYWxsYmFja30pID0+IHtcbiAgICAgICAgICAgIGlmICghbGlzdGVuT2JqZWN0IHx8IG9iaiA9PT0gbGlzdGVuT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb2JqLm9mZihjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogXG4gICAgICogQHJldHVybnMge0V2ZW50c31cbiAgICAgKi9cbiAgICBjaGFubmVsKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jaGFubmVsc1tuYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5fY2hhbm5lbHNbbmFtZV0gPSBuZXcgRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tuYW1lXTtcbiAgICB9XG4gICAgXG59Il19