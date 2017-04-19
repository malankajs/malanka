'use strict';

exports.__esModule = true;
exports.AbstractRequest = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbstractRequest = exports.AbstractRequest = function () {
    function AbstractRequest() {
        (0, _classCallCheck3.default)(this, AbstractRequest);
    }

    /**
     * @param {string} url
     * @param {{}|null} query
     *
     * @returns {string}
     */
    AbstractRequest.prototype.buildUrl = function buildUrl(url, query) {
        if (query) {
            (function () {
                var result = [];

                Object.keys(query).forEach(function (key) {
                    if (query[key] != null && query[key] !== '') {
                        result.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
                    }
                });

                if (result.length) {
                    url += '?' + result.join('&');
                }
            })();
        }

        return url;
    };

    return AbstractRequest;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SZXF1ZXN0L0Fic3RyYWN0UmVxdWVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFhLGUsV0FBQSxlOzs7OztBQUVUOzs7Ozs7OEJBTUEsUSxxQkFBUyxHLEVBQUssSyxFQUFPO0FBQ2pCLFlBQUksS0FBSixFQUFXO0FBQUE7QUFDUCxvQkFBSSxTQUFTLEVBQWI7O0FBRUEsdUJBQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsZUFBTztBQUM5Qix3QkFBSSxNQUFNLEdBQU4sS0FBYyxJQUFkLElBQXNCLE1BQU0sR0FBTixNQUFlLEVBQXpDLEVBQTZDO0FBQ3pDLCtCQUFPLElBQVAsQ0FBZSxtQkFBbUIsR0FBbkIsQ0FBZixTQUEwQyxtQkFBbUIsTUFBTSxHQUFOLENBQW5CLENBQTFDO0FBQ0g7QUFDSixpQkFKRDs7QUFNQSxvQkFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDZiwyQkFBTyxNQUFNLE9BQU8sSUFBUCxDQUFZLEdBQVosQ0FBYjtBQUNIO0FBWE07QUFZVjs7QUFFRCxlQUFPLEdBQVA7QUFDSCxLIiwiZmlsZSI6IkFic3RyYWN0UmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBYnN0cmFjdFJlcXVlc3Qge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7e318bnVsbH0gcXVlcnlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgYnVpbGRVcmwodXJsLCBxdWVyeSkge1xuICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgT2JqZWN0LmtleXMocXVlcnkpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocXVlcnlba2V5XSAhPSBudWxsICYmIHF1ZXJ5W2tleV0gIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeVtrZXldKX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJz8nICsgcmVzdWx0LmpvaW4oJyYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG59Il19