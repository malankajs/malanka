"use strict";

exports.__esModule = true;
exports.PlannerWrite = PlannerWrite;
function PlannerWrite() {
    return function (proto, name, desc) {
        return {
            value: function value() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var func = desc.value.bind(this),
                    atom = this.env.planner.atom();

                var value = function value() {
                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    atom.commit(function () {
                        return func.apply(undefined, args);
                    });
                };

                Object.defineProperty(this, name, { value: value });

                return value.apply(this, args);
            }
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9EZWNvcmF0b3JzL1BsYW5uZXJXcml0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFBZ0IsWSxHQUFBLFk7QUFBVCxTQUFTLFlBQVQsR0FBd0I7QUFDM0IsV0FBTyxVQUFTLEtBQVQsRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBNEI7QUFDL0IsZUFBTztBQUNILGlCQURHLG1CQUNZO0FBQUEsa0RBQU4sSUFBTTtBQUFOLHdCQUFNO0FBQUE7O0FBQ1gsb0JBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBQVg7QUFBQSxvQkFDSSxPQUFPLEtBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsSUFBakIsRUFEWDs7QUFHQSxvQkFBSSxRQUFRLFNBQVIsS0FBUSxHQUFhO0FBQUEsdURBQVQsSUFBUztBQUFULDRCQUFTO0FBQUE7O0FBQ3JCLHlCQUFLLE1BQUwsQ0FBWTtBQUFBLCtCQUFNLHNCQUFRLElBQVIsQ0FBTjtBQUFBLHFCQUFaO0FBQ0gsaUJBRkQ7O0FBSUEsdUJBQU8sY0FBUCxDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUFrQyxFQUFDLFlBQUQsRUFBbEM7O0FBRUEsdUJBQU8sTUFBTSxLQUFOLENBQVksSUFBWixFQUFrQixJQUFsQixDQUFQO0FBQ0g7QUFaRSxTQUFQO0FBY0gsS0FmRDtBQWdCSCIsImZpbGUiOiJQbGFubmVyV3JpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gUGxhbm5lcldyaXRlKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihwcm90bywgbmFtZSwgZGVzYykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWUoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIGxldCBmdW5jID0gZGVzYy52YWx1ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBhdG9tID0gdGhpcy5lbnYucGxhbm5lci5hdG9tKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhdG9tLmNvbW1pdCgoKSA9PiBmdW5jKC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHt2YWx1ZX0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSJdfQ==