'use strict';

exports.__esModule = true;
exports.toProxy = toProxy;
exports.mergeStrings = mergeStrings;
exports.join = join;

var _ValueProxy = require('../Data/ValueProxy');

/**
 * @param {[]} parts
 * @returns {ValueProxy|string}
 */
function toProxy(parts) {
    var watchers = parts.filter(function (node) {
        return node instanceof _ValueProxy.ValueProxy;
    });

    if (!watchers.length) {
        return parts.join('');
    }

    return _ValueProxy.ValueProxy.all(watchers).pipe(function (args) {
        var index = 0;

        return parts.map(function (value) {
            if (value instanceof _ValueProxy.ValueProxy) {
                return args[index++];
            } else {
                return value;
            }
        }).join('');
    });
}

/**
 * @param {{}[]} arr
 *
 * @returns {[]}
 */
function mergeStrings(arr) {
    var result = [],
        buffer = [];

    if (!Array.isArray(arr)) {
        return arr;
    }

    var pushBuffer = function pushBuffer(value) {
        if (buffer.length && typeof value !== 'object' && typeof buffer[buffer.length - 1] === 'string') {
            buffer.push(String(buffer.pop()) + value);
        } else {
            buffer.push(value);
        }
    };

    var flushBuffer = function flushBuffer() {
        if (buffer.length === 1) {
            if (!(typeof buffer[0] === 'string' && buffer[0].trim() === '')) {
                result.push(buffer[0]);
            }
        } else if (buffer.length > 1) {
            result.push(toProxy(buffer));
        }

        buffer = [];
    };

    var push = function push(value) {
        // skip null values
        if (value == null) {
            return;
        }

        // strings, booleans, numbers and ValueProxies
        if (typeof value !== 'object' || value instanceof _ValueProxy.ValueProxy) {
            pushBuffer(value);
        } else if (Array.isArray(value)) {
            mergeStrings(value).forEach(push);
        } else {
            flushBuffer();
            result.push(value);
        }
    };

    arr.forEach(push);

    flushBuffer();

    return result;
}

/**
 * @param {[]} arr
 * @returns {ValueProxy|string}
 */
function join(arr) {
    if (arr.length === 1) {
        return arr[0];
    } else if (arr.length === 0) {
        return '';
    }

    return toProxy(arr);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SdW50aW1lL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBTWdCLE8sR0FBQSxPO1FBMkJBLFksR0FBQSxZO1FBdURBLEksR0FBQSxJOztBQXhGaEI7O0FBRUE7Ozs7QUFJTyxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0I7QUFDM0IsUUFBSSxXQUFXLE1BQU0sTUFBTixDQUFhO0FBQUEsZUFBUSxzQ0FBUjtBQUFBLEtBQWIsQ0FBZjs7QUFFQSxRQUFJLENBQUMsU0FBUyxNQUFkLEVBQXNCO0FBQ2xCLGVBQU8sTUFBTSxJQUFOLENBQVcsRUFBWCxDQUFQO0FBQ0g7O0FBRUQsV0FBTyx1QkFBVyxHQUFYLENBQWUsUUFBZixFQUF5QixJQUF6QixDQUE4QixVQUFDLElBQUQsRUFBVTtBQUMzQyxZQUFJLFFBQVEsQ0FBWjs7QUFFQSxlQUFPLE1BQ0YsR0FERSxDQUNFLGlCQUFTO0FBQ1YsZ0JBQUksdUNBQUosRUFBaUM7QUFDN0IsdUJBQU8sS0FBSyxPQUFMLENBQVA7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxLQUFQO0FBQ0g7QUFDSixTQVBFLEVBUUYsSUFSRSxDQVFHLEVBUkgsQ0FBUDtBQVNILEtBWk0sQ0FBUDtBQWFIOztBQUVEOzs7OztBQUtPLFNBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUM5QixRQUFJLFNBQVMsRUFBYjtBQUFBLFFBQWlCLFNBQVMsRUFBMUI7O0FBRUEsUUFBSSxDQUFDLE1BQU0sT0FBTixDQUFjLEdBQWQsQ0FBTCxFQUF5QjtBQUNyQixlQUFPLEdBQVA7QUFDSDs7QUFFRCxRQUFJLGFBQWEsU0FBYixVQUFhLFFBQVM7QUFDdEIsWUFBSSxPQUFPLE1BQVAsSUFBaUIsT0FBTyxLQUFQLEtBQWlCLFFBQWxDLElBQThDLE9BQU8sT0FBTyxPQUFPLE1BQVAsR0FBZ0IsQ0FBdkIsQ0FBUCxLQUFxQyxRQUF2RixFQUFpRztBQUM3RixtQkFBTyxJQUFQLENBQVksT0FBTyxPQUFPLEdBQVAsRUFBUCxJQUF1QixLQUFuQztBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPLElBQVAsQ0FBWSxLQUFaO0FBQ0g7QUFDSixLQU5EOztBQVFBLFFBQUksY0FBYyxTQUFkLFdBQWMsR0FBTTtBQUNwQixZQUFJLE9BQU8sTUFBUCxLQUFrQixDQUF0QixFQUF5QjtBQUNyQixnQkFBSSxFQUFFLE9BQU8sT0FBTyxDQUFQLENBQVAsS0FBcUIsUUFBckIsSUFBaUMsT0FBTyxDQUFQLEVBQVUsSUFBVixPQUFxQixFQUF4RCxDQUFKLEVBQWlFO0FBQzdELHVCQUFPLElBQVAsQ0FBWSxPQUFPLENBQVAsQ0FBWjtBQUNIO0FBQ0osU0FKRCxNQUlPLElBQUksT0FBTyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQzFCLG1CQUFPLElBQVAsQ0FBWSxRQUFRLE1BQVIsQ0FBWjtBQUNIOztBQUVELGlCQUFTLEVBQVQ7QUFDSCxLQVZEOztBQVlBLFFBQUksT0FBTyxTQUFQLElBQU8sQ0FBQyxLQUFELEVBQVc7QUFDbEI7QUFDQSxZQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNmO0FBQ0g7O0FBRUQ7QUFDQSxZQUFJLE9BQU8sS0FBUCxLQUFpQixRQUFqQixJQUE2Qix1Q0FBakMsRUFBOEQ7QUFDMUQsdUJBQVcsS0FBWDtBQUNILFNBRkQsTUFFTyxJQUFJLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FBSixFQUEwQjtBQUM3Qix5QkFBYSxLQUFiLEVBQW9CLE9BQXBCLENBQTRCLElBQTVCO0FBQ0gsU0FGTSxNQUVBO0FBQ0g7QUFDQSxtQkFBTyxJQUFQLENBQVksS0FBWjtBQUNIO0FBQ0osS0FmRDs7QUFpQkEsUUFBSSxPQUFKLENBQVksSUFBWjs7QUFFQTs7QUFFQSxXQUFPLE1BQVA7QUFDSDs7QUFFRDs7OztBQUlPLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDdEIsUUFBSSxJQUFJLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNsQixlQUFPLElBQUksQ0FBSixDQUFQO0FBQ0gsS0FGRCxNQUVPLElBQUksSUFBSSxNQUFKLEtBQWUsQ0FBbkIsRUFBc0I7QUFDekIsZUFBTyxFQUFQO0FBQ0g7O0FBRUQsV0FBTyxRQUFRLEdBQVIsQ0FBUDtBQUNIIiwiZmlsZSI6InJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZhbHVlUHJveHl9IGZyb20gJy4uL0RhdGEvVmFsdWVQcm94eSc7XG5cbi8qKlxuICogQHBhcmFtIHtbXX0gcGFydHNcbiAqIEByZXR1cm5zIHtWYWx1ZVByb3h5fHN0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvUHJveHkocGFydHMpIHtcbiAgICBsZXQgd2F0Y2hlcnMgPSBwYXJ0cy5maWx0ZXIobm9kZSA9PiBub2RlIGluc3RhbmNlb2YgVmFsdWVQcm94eSk7XG5cbiAgICBpZiAoIXdhdGNoZXJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFZhbHVlUHJveHkuYWxsKHdhdGNoZXJzKS5waXBlKChhcmdzKSA9PiB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzXG4gICAgICAgICAgICAubWFwKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBWYWx1ZVByb3h5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmdzW2luZGV4KytdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7e31bXX0gYXJyXG4gKlxuICogQHJldHVybnMge1tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VTdHJpbmdzKGFycikge1xuICAgIGxldCByZXN1bHQgPSBbXSwgYnVmZmVyID0gW107XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIGxldCBwdXNoQnVmZmVyID0gdmFsdWUgPT4ge1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCAmJiB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHR5cGVvZiBidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYnVmZmVyLnB1c2goU3RyaW5nKGJ1ZmZlci5wb3AoKSkgKyB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IGZsdXNoQnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKCEodHlwZW9mIGJ1ZmZlclswXSA9PT0gJ3N0cmluZycgJiYgYnVmZmVyWzBdLnRyaW0oKSA9PT0gJycpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYnVmZmVyWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChidWZmZXIubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godG9Qcm94eShidWZmZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgIH07XG5cbiAgICBsZXQgcHVzaCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyBza2lwIG51bGwgdmFsdWVzXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdHJpbmdzLCBib29sZWFucywgbnVtYmVycyBhbmQgVmFsdWVQcm94aWVzXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IHZhbHVlIGluc3RhbmNlb2YgVmFsdWVQcm94eSkge1xuICAgICAgICAgICAgcHVzaEJ1ZmZlcih2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIG1lcmdlU3RyaW5ncyh2YWx1ZSkuZm9yRWFjaChwdXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZsdXNoQnVmZmVyKCk7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGFyci5mb3JFYWNoKHB1c2gpO1xuXG4gICAgZmx1c2hCdWZmZXIoKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtbXX0gYXJyXG4gKiBAcmV0dXJucyB7VmFsdWVQcm94eXxzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luKGFycikge1xuICAgIGlmIChhcnIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBhcnJbMF07XG4gICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gdG9Qcm94eShhcnIpO1xufSJdfQ==