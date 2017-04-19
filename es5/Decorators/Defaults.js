'use strict';

exports.__esModule = true;
exports.Defaults = Defaults;
/**
 * @param {{styles: {}}} options
 * @returns {Function}
 */
function Defaults(options) {
    return function (Class) {
        Object.keys(options).forEach(function (key) {
            Class.prototype[key] = options[key];

            if (key === 'styles' && !('className' in Class.prototype)) {
                Class.prototype.className = options[key].root;
            } else if (key === 'events') {
                var keys = Object.keys(options[key]);

                var _loop = function _loop(index) {
                    var eventName = keys[index],
                        method = options[key][eventName];

                    options[key][eventName] = function () {
                        return this[method].apply(this, arguments);
                    };
                };

                for (var index = 0; index < keys.length; index++) {
                    _loop(index);
                }
            }
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EZWNvcmF0b3JzL0RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztRQUlnQixRLEdBQUEsUTtBQUpoQjs7OztBQUlPLFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEyQjtBQUM5QixXQUFPLFVBQVUsS0FBVixFQUFpQjtBQUNwQixlQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLE9BQXJCLENBQTZCLGVBQU87QUFDaEMsa0JBQU0sU0FBTixDQUFnQixHQUFoQixJQUF1QixRQUFRLEdBQVIsQ0FBdkI7O0FBRUEsZ0JBQUksUUFBUSxRQUFSLElBQW9CLEVBQUUsZUFBZSxNQUFNLFNBQXZCLENBQXhCLEVBQTJEO0FBQ3ZELHNCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsR0FBNEIsUUFBUSxHQUFSLEVBQWEsSUFBekM7QUFDSCxhQUZELE1BRU8sSUFBSSxRQUFRLFFBQVosRUFBc0I7QUFDekIsb0JBQUksT0FBTyxPQUFPLElBQVAsQ0FBWSxRQUFRLEdBQVIsQ0FBWixDQUFYOztBQUR5QiwyQ0FHaEIsS0FIZ0I7QUFJckIsd0JBQUksWUFBWSxLQUFLLEtBQUwsQ0FBaEI7QUFBQSx3QkFDSSxTQUFTLFFBQVEsR0FBUixFQUFhLFNBQWIsQ0FEYjs7QUFHQSw0QkFBUSxHQUFSLEVBQWEsU0FBYixJQUEwQixZQUFrQjtBQUN4QywrQkFBTyxLQUFLLE1BQUwsd0JBQVA7QUFDSCxxQkFGRDtBQVBxQjs7QUFHekIscUJBQUssSUFBSSxRQUFRLENBQWpCLEVBQW9CLFFBQVEsS0FBSyxNQUFqQyxFQUF5QyxPQUF6QyxFQUFrRDtBQUFBLDBCQUF6QyxLQUF5QztBQU9qRDtBQUNKO0FBQ0osU0FqQkQ7QUFrQkgsS0FuQkQ7QUFvQkgiLCJmaWxlIjoiRGVmYXVsdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwYXJhbSB7e3N0eWxlczoge319fSBvcHRpb25zXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBEZWZhdWx0cyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChDbGFzcykge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBDbGFzcy5wcm90b3R5cGVba2V5XSA9IG9wdGlvbnNba2V5XTtcblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3N0eWxlcycgJiYgISgnY2xhc3NOYW1lJyBpbiBDbGFzcy5wcm90b3R5cGUpKSB7XG4gICAgICAgICAgICAgICAgQ2xhc3MucHJvdG90eXBlLmNsYXNzTmFtZSA9IG9wdGlvbnNba2V5XS5yb290O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdldmVudHMnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zW2tleV0pO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGtleXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBrZXlzW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCA9IG9wdGlvbnNba2V5XVtldmVudE5hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XVtldmVudE5hbWVdID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==