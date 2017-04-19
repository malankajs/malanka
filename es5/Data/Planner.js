'use strict';

exports.__esModule = true;
exports.Planner = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Planner = exports.Planner = function () {
    function Planner() {
        (0, _classCallCheck3.default)(this, Planner);

        this._commitQueue = [];
    }

    /**
     * @returns {{commit: function(function)}}
     */


    Planner.prototype.atom = function atom() {
        var _this = this,
            _callback = undefined;

        return {
            commit: function commit(callback) {
                var hasTask = Boolean(_callback);

                _callback = callback;

                if (!hasTask) {
                    _this.commit(function () {
                        _callback();
                        _callback = undefined;
                    });
                }

                return this;
            }
        };
    };

    /**
     * Create commit wrapper
     *
     * @param {function(...[*])} callback
     *
     * @returns {function(...[*])}
     */


    Planner.prototype.commitWrapper = function commitWrapper(callback) {
        var atom = this.atom();

        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            atom.commit(function () {
                return callback.apply(undefined, args);
            });
        };
    };

    /**
     * @param {function} callback
     */


    Planner.prototype.commit = function commit(callback) {
        var _this2 = this;

        this._commitQueue.push(callback);

        if (typeof requestAnimationFrame === 'function') {
            if (!this._timer) {
                this._timer = requestAnimationFrame(function () {
                    return _this2._flush();
                });
            }
        } else {
            this._flush();
        }
    };

    /**
     * Flush changes
     *
     * @private
     */


    Planner.prototype._flush = function _flush() {
        this._timer = null;

        for (var index = 0; index < this._commitQueue.length; index++) {
            this._commitQueue[index]();
        }

        this._commitQueue = [];
    };

    return Planner;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EYXRhL1BsYW5uZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBYSxPLFdBQUEsTztBQUVULHVCQUFjO0FBQUE7O0FBQ1YsYUFBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0g7O0FBRUQ7Ozs7O3NCQUdBLEksbUJBQU87QUFDSCxZQUFJLFFBQVEsSUFBWjtBQUFBLFlBQ0ksWUFBWSxTQURoQjs7QUFHQSxlQUFPO0FBQ0gsa0JBREcsa0JBQ0ksUUFESixFQUNjO0FBQ2Isb0JBQUksVUFBVSxRQUFRLFNBQVIsQ0FBZDs7QUFFQSw0QkFBWSxRQUFaOztBQUVBLG9CQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1YsMEJBQU0sTUFBTixDQUFhLFlBQU07QUFDZjtBQUNBLG9DQUFZLFNBQVo7QUFDSCxxQkFIRDtBQUlIOztBQUVELHVCQUFPLElBQVA7QUFDSDtBQWRFLFNBQVA7QUFnQkgsSzs7QUFFRDs7Ozs7Ozs7O3NCQU9BLGEsMEJBQWMsUSxFQUFVO0FBQ3BCLFlBQUksT0FBTyxLQUFLLElBQUwsRUFBWDs7QUFFQSxlQUFPLFlBQWE7QUFBQSw4Q0FBVCxJQUFTO0FBQVQsb0JBQVM7QUFBQTs7QUFDaEIsaUJBQUssTUFBTCxDQUFZO0FBQUEsdUJBQU0sMEJBQVksSUFBWixDQUFOO0FBQUEsYUFBWjtBQUNILFNBRkQ7QUFHSCxLOztBQUVEOzs7OztzQkFHQSxNLG1CQUFPLFEsRUFBVTtBQUFBOztBQUNiLGFBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixRQUF2Qjs7QUFFQSxZQUFJLE9BQU8scUJBQVAsS0FBaUMsVUFBckMsRUFBaUQ7QUFDN0MsZ0JBQUksQ0FBQyxLQUFLLE1BQVYsRUFBa0I7QUFDZCxxQkFBSyxNQUFMLEdBQWMsc0JBQXNCO0FBQUEsMkJBQU0sT0FBSyxNQUFMLEVBQU47QUFBQSxpQkFBdEIsQ0FBZDtBQUNIO0FBQ0osU0FKRCxNQUlPO0FBQ0gsaUJBQUssTUFBTDtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7OztzQkFLQSxNLHFCQUFTO0FBQ0wsYUFBSyxNQUFMLEdBQWMsSUFBZDs7QUFFQSxhQUFLLElBQUksUUFBUSxDQUFqQixFQUFvQixRQUFRLEtBQUssWUFBTCxDQUFrQixNQUE5QyxFQUFzRCxPQUF0RCxFQUErRDtBQUMzRCxpQkFBSyxZQUFMLENBQWtCLEtBQWxCO0FBQ0g7O0FBRUQsYUFBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0gsSyIsImZpbGUiOiJQbGFubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFBsYW5uZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2NvbW1pdFF1ZXVlID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3tjb21taXQ6IGZ1bmN0aW9uKGZ1bmN0aW9uKX19XG4gICAgICovXG4gICAgYXRvbSgpIHtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgIF9jYWxsYmFjayA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29tbWl0KGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhhc1Rhc2sgPSBCb29sZWFuKF9jYWxsYmFjayk7XG5cbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICAgICAgICAgIGlmICghaGFzVGFzaykge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb21taXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBjb21taXQgd3JhcHBlclxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbiguLi5bKl0pfSBjYWxsYmFja1xuICAgICAqXG4gICAgICogQHJldHVybnMge2Z1bmN0aW9uKC4uLlsqXSl9XG4gICAgICovXG4gICAgY29tbWl0V3JhcHBlcihjYWxsYmFjaykge1xuICAgICAgICBsZXQgYXRvbSA9IHRoaXMuYXRvbSgpO1xuXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgYXRvbS5jb21taXQoKCkgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBjb21taXQoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY29tbWl0UXVldWUucHVzaChjYWxsYmFjayk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdGltZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9mbHVzaCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGbHVzaCBjaGFuZ2VzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9mbHVzaCgpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9jb21taXRRdWV1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1pdFF1ZXVlW2luZGV4XSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY29tbWl0UXVldWUgPSBbXTtcbiAgICB9XG5cbn0iXX0=