'use strict';

exports.__esModule = true;
exports.default = ifHelper;

var _ValueProxy = require('../Data/ValueProxy');

var _IfComponent = require('../Components/IfComponent');

function ifHelper(param, options) {
    var _this = this;

    var isProxy = param instanceof _ValueProxy.ValueProxy;

    var getComponent = function getComponent(value) {
        if (value && options.content) {
            return options.content.call(_this);
        } else if (options.inverse) {
            return options.inverse.call(_this);
        }

        return '';
    };

    if (isProxy) {
        var contentProxy = param.pipe(Boolean).pipe(getComponent);

        if (options.isString) {
            return contentProxy;
        } else {
            return new _IfComponent.IfComponent(Object.assign({}, options.hash, {
                contentProxy: contentProxy
            }));
        }
    }

    return getComponent(param);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SdW50aW1lL2lmSGVscGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztrQkFHd0IsUTs7QUFIeEI7O0FBQ0E7O0FBRWUsU0FBUyxRQUFULENBQWtCLEtBQWxCLEVBQXlCLE9BQXpCLEVBQWtDO0FBQUE7O0FBQzdDLFFBQUksVUFBVyx1Q0FBZjs7QUFFQSxRQUFJLGVBQWUsU0FBZixZQUFlLENBQUMsS0FBRCxFQUFXO0FBQzFCLFlBQUksU0FBUyxRQUFRLE9BQXJCLEVBQThCO0FBQzFCLG1CQUFPLFFBQVEsT0FBUixDQUFnQixJQUFoQixPQUFQO0FBQ0gsU0FGRCxNQUVPLElBQUksUUFBUSxPQUFaLEVBQXFCO0FBQ3hCLG1CQUFPLFFBQVEsT0FBUixDQUFnQixJQUFoQixPQUFQO0FBQ0g7O0FBRUQsZUFBTyxFQUFQO0FBQ0gsS0FSRDs7QUFVQSxRQUFJLE9BQUosRUFBYTtBQUNULFlBQUksZUFBZSxNQUFNLElBQU4sQ0FBVyxPQUFYLEVBQW9CLElBQXBCLENBQXlCLFlBQXpCLENBQW5COztBQUVBLFlBQUksUUFBUSxRQUFaLEVBQXNCO0FBQ2xCLG1CQUFPLFlBQVA7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBTyw2QkFBZ0IsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixRQUFRLElBQTFCLEVBQWdDO0FBQ25ELDhCQUFjO0FBRHFDLGFBQWhDLENBQWhCLENBQVA7QUFHSDtBQUNKOztBQUVELFdBQU8sYUFBYSxLQUFiLENBQVA7QUFDSCIsImZpbGUiOiJpZkhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmFsdWVQcm94eX0gZnJvbSAnLi4vRGF0YS9WYWx1ZVByb3h5JztcbmltcG9ydCB7SWZDb21wb25lbnR9IGZyb20gJy4uL0NvbXBvbmVudHMvSWZDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZkhlbHBlcihwYXJhbSwgb3B0aW9ucykge1xuICAgIGxldCBpc1Byb3h5ID0gKHBhcmFtIGluc3RhbmNlb2YgVmFsdWVQcm94eSk7XG5cbiAgICBsZXQgZ2V0Q29tcG9uZW50ID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBvcHRpb25zLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmNvbnRlbnQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmludmVyc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuXG4gICAgaWYgKGlzUHJveHkpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRQcm94eSA9IHBhcmFtLnBpcGUoQm9vbGVhbikucGlwZShnZXRDb21wb25lbnQpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudFByb3h5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJZkNvbXBvbmVudChPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLmhhc2gsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50UHJveHk6IGNvbnRlbnRQcm94eVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldENvbXBvbmVudChwYXJhbSk7XG59Il19