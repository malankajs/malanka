'use strict';

exports.__esModule = true;
exports.GotRequest = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractRequest2 = require('./AbstractRequest');

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GotRequest = exports.GotRequest = function (_AbstractRequest) {
    (0, _inherits3.default)(GotRequest, _AbstractRequest);

    function GotRequest() {
        (0, _classCallCheck3.default)(this, GotRequest);
        return (0, _possibleConstructorReturn3.default)(this, _AbstractRequest.apply(this, arguments));
    }

    GotRequest.prototype.request = function request(_ref) {
        var url = _ref.url;
        var query = _ref.query;
        var _ref$headers = _ref.headers;
        var headers = _ref$headers === undefined ? {} : _ref$headers;

        Object.assign(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        var options = {
            headers: headers,
            json: true
        };

        return _got2.default.get(this.buildUrl(url, query), options).then(function (response) {
            if (response.statusCode >= 200 && response.statusCode < 210) {
                return response.body;
            }

            throw new Error('Response status was ' + response.statusCode);
        });
    };

    return GotRequest;
}(_AbstractRequest2.AbstractRequest);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SZXF1ZXN0L0dvdFJlcXVlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7O0lBRWEsVSxXQUFBLFU7Ozs7Ozs7O3lCQUVULE8sMEJBQW9DO0FBQUEsWUFBM0IsR0FBMkIsUUFBM0IsR0FBMkI7QUFBQSxZQUF0QixLQUFzQixRQUF0QixLQUFzQjtBQUFBLGdDQUFmLE9BQWU7QUFBQSxZQUFmLE9BQWUsZ0NBQUwsRUFBSzs7QUFDaEMsZUFBTyxNQUFQLENBQWMsT0FBZCxFQUF1QjtBQUNuQixzQkFBVSxrQkFEUztBQUVuQiw0QkFBZ0I7QUFGRyxTQUF2Qjs7QUFLQSxZQUFJLFVBQVU7QUFDViw0QkFEVTtBQUVWLGtCQUFNO0FBRkksU0FBZDs7QUFLQSxlQUFPLGNBQUksR0FBSixDQUFRLEtBQUssUUFBTCxDQUFjLEdBQWQsRUFBbUIsS0FBbkIsQ0FBUixFQUFtQyxPQUFuQyxFQUNGLElBREUsQ0FDRyxvQkFBWTtBQUNkLGdCQUFJLFNBQVMsVUFBVCxJQUF1QixHQUF2QixJQUE4QixTQUFTLFVBQVQsR0FBc0IsR0FBeEQsRUFBNkQ7QUFDekQsdUJBQU8sU0FBUyxJQUFoQjtBQUNIOztBQUVELGtCQUFNLElBQUksS0FBSixDQUFVLHlCQUF5QixTQUFTLFVBQTVDLENBQU47QUFDSCxTQVBFLENBQVA7QUFRSCxLIiwiZmlsZSI6IkdvdFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0UmVxdWVzdH0gZnJvbSAnLi9BYnN0cmFjdFJlcXVlc3QnO1xuXG5pbXBvcnQgZ290IGZyb20gJ2dvdCc7XG5cbmV4cG9ydCBjbGFzcyBHb3RSZXF1ZXN0IGV4dGVuZHMgQWJzdHJhY3RSZXF1ZXN0IHtcblxuICAgIHJlcXVlc3Qoe3VybCwgcXVlcnksIGhlYWRlcnMgPSB7fX0pIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCB7XG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBqc29uOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGdvdC5nZXQodGhpcy5idWlsZFVybCh1cmwsIHF1ZXJ5KSwgb3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzQ29kZSA8IDIxMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3BvbnNlIHN0YXR1cyB3YXMgJyArIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59Il19