'use strict';

exports.__esModule = true;
exports.Mutator = Mutator;

var _ValueProxy = require('../Data/ValueProxy');

function Mutator(params) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var before = _ref.before;
    var after = _ref.after;

    return function (Class, name, descriptor) {
        var mutate = descriptor.value;

        return {
            get: function get() {
                var _this = this;

                var proxy = void 0;

                var toProxy = function toProxy(str) {
                    var parts = str.split('.'),
                        proxy = _this.proxy(parts.shift());

                    for (var index = 0; index < parts.length; index++) {
                        var part = parts[index];

                        proxy = proxy.proxy(part);
                    }

                    return proxy;
                };

                if (Array.isArray(params)) {
                    proxy = _ValueProxy.ValueProxy.all(params.map(function (key) {
                        return toProxy(key);
                    }));
                } else {
                    proxy = toProxy(params);
                }

                if (before) {
                    proxy = before.call(this, proxy);
                }

                proxy = proxy.pipe(function (value) {
                    return mutate.call(_this, value);
                });

                if (after) {
                    proxy = after.call(this, proxy);
                }

                Object.defineProperty(this, name, {
                    value: proxy
                });

                return proxy;
            }
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EZWNvcmF0b3JzL011dGF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBRWdCLE8sR0FBQSxPOztBQUZoQjs7QUFFTyxTQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBK0M7QUFBQSxxRUFBSixFQUFJOztBQUFBLFFBQXJCLE1BQXFCLFFBQXJCLE1BQXFCO0FBQUEsUUFBYixLQUFhLFFBQWIsS0FBYTs7QUFDbEQsV0FBTyxVQUFTLEtBQVQsRUFBZ0IsSUFBaEIsRUFBc0IsVUFBdEIsRUFBa0M7QUFDckMsWUFBSSxTQUFTLFdBQVcsS0FBeEI7O0FBRUEsZUFBTztBQUNILGVBREcsaUJBQ0c7QUFBQTs7QUFDRixvQkFBSSxjQUFKOztBQUVBLG9CQUFJLFVBQVUsU0FBVixPQUFVLE1BQU87QUFDakIsd0JBQUksUUFBUSxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQVo7QUFBQSx3QkFDSSxRQUFRLE1BQUssS0FBTCxDQUFXLE1BQU0sS0FBTixFQUFYLENBRFo7O0FBR0EseUJBQUssSUFBSSxRQUFRLENBQWpCLEVBQW9CLFFBQVEsTUFBTSxNQUFsQyxFQUEwQyxPQUExQyxFQUFtRDtBQUMvQyw0QkFBSSxPQUFPLE1BQU0sS0FBTixDQUFYOztBQUVBLGdDQUFRLE1BQU0sS0FBTixDQUFZLElBQVosQ0FBUjtBQUNIOztBQUVELDJCQUFPLEtBQVA7QUFDSCxpQkFYRDs7QUFhQSxvQkFBSSxNQUFNLE9BQU4sQ0FBYyxNQUFkLENBQUosRUFBMkI7QUFDdkIsNEJBQVEsdUJBQVcsR0FBWCxDQUFlLE9BQU8sR0FBUCxDQUFXO0FBQUEsK0JBQU8sUUFBUSxHQUFSLENBQVA7QUFBQSxxQkFBWCxDQUFmLENBQVI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsNEJBQVEsUUFBUSxNQUFSLENBQVI7QUFDSDs7QUFFRCxvQkFBSSxNQUFKLEVBQVk7QUFDUiw0QkFBUSxPQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLENBQVI7QUFDSDs7QUFFRCx3QkFBUSxNQUFNLElBQU4sQ0FBVyxpQkFBUztBQUN4QiwyQkFBTyxPQUFPLElBQVAsUUFBa0IsS0FBbEIsQ0FBUDtBQUNILGlCQUZPLENBQVI7O0FBSUEsb0JBQUksS0FBSixFQUFXO0FBQ1AsNEJBQVEsTUFBTSxJQUFOLENBQVcsSUFBWCxFQUFpQixLQUFqQixDQUFSO0FBQ0g7O0FBRUQsdUJBQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUFrQztBQUM5QiwyQkFBTztBQUR1QixpQkFBbEM7O0FBSUEsdUJBQU8sS0FBUDtBQUNIO0FBeENFLFNBQVA7QUEwQ0gsS0E3Q0Q7QUE4Q0giLCJmaWxlIjoiTXV0YXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmFsdWVQcm94eX0gZnJvbSAnLi4vRGF0YS9WYWx1ZVByb3h5JztcblxuZXhwb3J0IGZ1bmN0aW9uIE11dGF0b3IocGFyYW1zLCB7YmVmb3JlLCBhZnRlcn0gPSB7fSkge1xuICAgIHJldHVybiBmdW5jdGlvbihDbGFzcywgbmFtZSwgZGVzY3JpcHRvcikge1xuICAgICAgICBsZXQgbXV0YXRlID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGxldCBwcm94eTtcblxuICAgICAgICAgICAgICAgIGxldCB0b1Byb3h5ID0gc3RyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gc3RyLnNwbGl0KCcuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm94eSA9IHRoaXMucHJveHkocGFydHMuc2hpZnQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHBhcnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5ID0gcHJveHkucHJveHkocGFydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHkgPSBWYWx1ZVByb3h5LmFsbChwYXJhbXMubWFwKGtleSA9PiB0b1Byb3h5KGtleSkpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcm94eSA9IHRvUHJveHkocGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5ID0gYmVmb3JlLmNhbGwodGhpcywgcHJveHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb3h5ID0gcHJveHkucGlwZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtdXRhdGUuY2FsbCh0aGlzLCB2YWx1ZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgICAgICAgICBwcm94eSA9IGFmdGVyLmNhbGwodGhpcywgcHJveHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcm94eVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0iXX0=