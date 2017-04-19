'use strict';

exports.__esModule = true;
exports.escape = escape;
exports.escapeAttribute = escapeAttribute;
exports.result = result;
var hasOwn = Object.hasOwnProperty;

/**
 * @param {string|*} value
 * @returns {string}
 */
function escape(value) {
    return String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * @param {string|*} value
 * @returns {string}
 */
function escapeAttribute(value) {
    return escape(value).replace(/"/g, '&#34;');
}

/**
 * @param {object} obj
 * @param {string} key
 *
 * @returns {*}
 */
function result(obj, key) {
    var value = void 0;

    if (hasOwn.call(obj.options, key)) {
        value = obj.options[key];
    } else {
        value = obj[key];
    }

    if (typeof value === 'function') {
        return value.call(obj);
    } else {
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFNZ0IsTSxHQUFBLE07UUFVQSxlLEdBQUEsZTtRQVVBLE0sR0FBQSxNO0FBMUJoQixJQUFJLFNBQVMsT0FBTyxjQUFwQjs7QUFFQTs7OztBQUlPLFNBQVMsTUFBVCxDQUFnQixLQUFoQixFQUF1QjtBQUMxQixXQUFPLE9BQU8sS0FBUCxFQUNGLE9BREUsQ0FDTSxJQUROLEVBQ1ksTUFEWixFQUVGLE9BRkUsQ0FFTSxJQUZOLEVBRVksTUFGWixDQUFQO0FBR0g7O0FBRUQ7Ozs7QUFJTyxTQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0M7QUFDbkMsV0FBTyxPQUFPLEtBQVAsRUFBYyxPQUFkLENBQXNCLElBQXRCLEVBQTRCLE9BQTVCLENBQVA7QUFDSDs7QUFFRDs7Ozs7O0FBTU8sU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCO0FBQzdCLFFBQUksY0FBSjs7QUFFQSxRQUFJLE9BQU8sSUFBUCxDQUFZLElBQUksT0FBaEIsRUFBeUIsR0FBekIsQ0FBSixFQUFtQztBQUMvQixnQkFBUSxJQUFJLE9BQUosQ0FBWSxHQUFaLENBQVI7QUFDSCxLQUZELE1BRU87QUFDSCxnQkFBUSxJQUFJLEdBQUosQ0FBUjtBQUNIOztBQUVELFFBQUksT0FBTyxLQUFQLEtBQWlCLFVBQXJCLEVBQWlDO0FBQzdCLGVBQU8sTUFBTSxJQUFOLENBQVcsR0FBWCxDQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsZUFBTyxLQUFQO0FBQ0g7QUFDSiIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBoYXNPd24gPSBPYmplY3QuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUodmFsdWUpIHtcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd8Kn0gdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVBdHRyaWJ1dGUodmFsdWUpIHtcbiAgICByZXR1cm4gZXNjYXBlKHZhbHVlKS5yZXBsYWNlKC9cIi9nLCAnJiMzNDsnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKlxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXN1bHQob2JqLCBrZXkpIHtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLm9wdGlvbnMsIGtleSkpIHtcbiAgICAgICAgdmFsdWUgPSBvYmoub3B0aW9uc1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWUuY2FsbChvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59Il19