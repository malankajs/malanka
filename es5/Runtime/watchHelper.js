'use strict';

exports.__esModule = true;
exports.default = watchHelper;

var _ValueProxy = require('../Data/ValueProxy');

var _WatchComponent = require('../Components/WatchComponent');

function watchHelper() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var options = args.pop(),
        content = options.content,
        value = args.length === 1 ? args[0] : _ValueProxy.ValueProxy.all(args);

    if (options.hash.notEmpty) {
        (function () {
            var previous = '';

            content = function content(context) {
                if (value.getValue()) {
                    return previous = options.content.call(context, context);
                } else {
                    return previous;
                }
            };
        })();
    }

    return new _WatchComponent.WatchComponent(Object.assign({}, options.hash, { value: value, content: content }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SdW50aW1lL3dhdGNoSGVscGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFHd0IsVzs7QUFIeEI7O0FBQ0E7O0FBRWUsU0FBUyxXQUFULEdBQThCO0FBQUEsc0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDekMsUUFBSSxVQUFVLEtBQUssR0FBTCxFQUFkO0FBQUEsUUFDSSxVQUFVLFFBQVEsT0FEdEI7QUFBQSxRQUVJLFFBQVEsS0FBSyxNQUFMLEtBQWdCLENBQWhCLEdBQW9CLEtBQUssQ0FBTCxDQUFwQixHQUE4Qix1QkFBVyxHQUFYLENBQWUsSUFBZixDQUYxQzs7QUFJQSxRQUFJLFFBQVEsSUFBUixDQUFhLFFBQWpCLEVBQTJCO0FBQUE7QUFDdkIsZ0JBQUksV0FBVyxFQUFmOztBQUVBLHNCQUFVLGlCQUFTLE9BQVQsRUFBa0I7QUFDeEIsb0JBQUksTUFBTSxRQUFOLEVBQUosRUFBc0I7QUFDbEIsMkJBQU8sV0FBVyxRQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBcUIsT0FBckIsRUFBOEIsT0FBOUIsQ0FBbEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsMkJBQU8sUUFBUDtBQUNIO0FBQ0osYUFORDtBQUh1QjtBQVUxQjs7QUFFRCxXQUFPLG1DQUFtQixPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLFFBQVEsSUFBMUIsRUFBZ0MsRUFBQyxZQUFELEVBQVMsZ0JBQVQsRUFBaEMsQ0FBbkIsQ0FBUDtBQUNIIiwiZmlsZSI6IndhdGNoSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWYWx1ZVByb3h5fSBmcm9tICcuLi9EYXRhL1ZhbHVlUHJveHknO1xuaW1wb3J0IHtXYXRjaENvbXBvbmVudH0gZnJvbSAnLi4vQ29tcG9uZW50cy9XYXRjaENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhdGNoSGVscGVyKC4uLmFyZ3MpIHtcbiAgICBsZXQgb3B0aW9ucyA9IGFyZ3MucG9wKCksXG4gICAgICAgIGNvbnRlbnQgPSBvcHRpb25zLmNvbnRlbnQsXG4gICAgICAgIHZhbHVlID0gYXJncy5sZW5ndGggPT09IDEgPyBhcmdzWzBdIDogVmFsdWVQcm94eS5hbGwoYXJncyk7XG5cbiAgICBpZiAob3B0aW9ucy5oYXNoLm5vdEVtcHR5KSB7XG4gICAgICAgIGxldCBwcmV2aW91cyA9ICcnO1xuXG4gICAgICAgIGNvbnRlbnQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91cyA9IG9wdGlvbnMuY29udGVudC5jYWxsKGNvbnRleHQsIGNvbnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdhdGNoQ29tcG9uZW50KE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMuaGFzaCwge3ZhbHVlLCAgY29udGVudH0pKTtcbn0iXX0=