'use strict';

exports.__esModule = true;
exports.FetchRequest = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractRequest2 = require('./AbstractRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchRequest = exports.FetchRequest = function (_AbstractRequest) {
    (0, _inherits3.default)(FetchRequest, _AbstractRequest);

    function FetchRequest() {
        (0, _classCallCheck3.default)(this, FetchRequest);
        return (0, _possibleConstructorReturn3.default)(this, _AbstractRequest.apply(this, arguments));
    }

    /**
     * @param {string} url
     * @param {{}} query
     * @param {string} body
     * @param {FormData} data
     * @param {{}} headers
     * @param {string} method
     *
     * @returns {Promise<{}>}
     */
    FetchRequest.prototype.request = function request(_ref) {
        var url = _ref.url;
        var query = _ref.query;
        var body = _ref.body;
        var data = _ref.data;
        var _ref$headers = _ref.headers;
        var headers = _ref$headers === undefined ? {} : _ref$headers;
        var _ref$method = _ref.method;
        var method = _ref$method === undefined ? 'GET' : _ref$method;

        Object.assign(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        var options = {
            method: method,
            body: body,
            data: data,
            headers: headers
        };

        return fetch(this.buildUrl(url, query), options).then(function (response) {
            if (response.status >= 200 && response.status < 210) {
                return response.json();
            }

            throw new Error('Response status was ' + response.status);
        });
    };

    /**
     * @param {string} url
     * @param {{}} data
     *
     * @returns {Promise<{}>}
     */


    FetchRequest.prototype.post = function post(_ref2) {
        var url = _ref2.url;
        var data = _ref2.data;

        return this.request({
            method: 'post',
            url: url,
            body: JSON.stringify(data)
        });
    };

    /**
     * @param {string} url
     * @param {{}} data
     *
     * @returns {Promise<{}>}
     */


    FetchRequest.prototype.put = function put(_ref3) {
        var url = _ref3.url;
        var data = _ref3.data;

        return this.request({
            method: 'put',
            url: url,
            body: JSON.stringify(data)
        });
    };

    /**
     * @param {string} url
     *
     * @returns {Promise<{}>}
     */


    FetchRequest.prototype.del = function del(_ref4) {
        var url = _ref4.url;

        return this.request({
            method: 'delete',
            url: url,
            data: '{}'
        });
    };

    /**
     * @param {{}} deps
     * @returns {FetchRequest}
     */


    FetchRequest.factory = function factory(deps) {
        var _this2 = this;

        if (typeof fetch === 'undefined') {
            var polyfill = require('promise?global!whatwg-fetch');

            return polyfill().then(function () {
                return new _this2(deps);
            });
        }

        return new this(deps);
    };

    return FetchRequest;
}(_AbstractRequest2.AbstractRequest);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9SZXF1ZXN0L0ZldGNoUmVxdWVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRWEsWSxXQUFBLFk7Ozs7Ozs7O0FBRVQ7Ozs7Ozs7Ozs7MkJBVUEsTywwQkFBZ0U7QUFBQSxZQUF2RCxHQUF1RCxRQUF2RCxHQUF1RDtBQUFBLFlBQWxELEtBQWtELFFBQWxELEtBQWtEO0FBQUEsWUFBM0MsSUFBMkMsUUFBM0MsSUFBMkM7QUFBQSxZQUFyQyxJQUFxQyxRQUFyQyxJQUFxQztBQUFBLGdDQUEvQixPQUErQjtBQUFBLFlBQS9CLE9BQStCLGdDQUFyQixFQUFxQjtBQUFBLCtCQUFqQixNQUFpQjtBQUFBLFlBQWpCLE1BQWlCLCtCQUFSLEtBQVE7O0FBQzVELGVBQU8sTUFBUCxDQUFjLE9BQWQsRUFBdUI7QUFDbkIsc0JBQVUsa0JBRFM7QUFFbkIsNEJBQWdCO0FBRkcsU0FBdkI7O0FBS0EsWUFBSSxVQUFVO0FBQ1YsMEJBRFU7QUFFVixzQkFGVTtBQUdWLHNCQUhVO0FBSVYscUJBQVM7QUFKQyxTQUFkOztBQU9BLGVBQU8sTUFBTSxLQUFLLFFBQUwsQ0FBYyxHQUFkLEVBQW1CLEtBQW5CLENBQU4sRUFBaUMsT0FBakMsRUFDRixJQURFLENBQ0csVUFBQyxRQUFELEVBQWM7QUFDaEIsZ0JBQUksU0FBUyxNQUFULElBQW1CLEdBQW5CLElBQTBCLFNBQVMsTUFBVCxHQUFrQixHQUFoRCxFQUFxRDtBQUNqRCx1QkFBTyxTQUFTLElBQVQsRUFBUDtBQUNIOztBQUVELGtCQUFNLElBQUksS0FBSixDQUFVLHlCQUF5QixTQUFTLE1BQTVDLENBQU47QUFDSCxTQVBFLENBQVA7QUFRSCxLOztBQUVEOzs7Ozs7OzsyQkFNQSxJLHdCQUFrQjtBQUFBLFlBQVosR0FBWSxTQUFaLEdBQVk7QUFBQSxZQUFQLElBQU8sU0FBUCxJQUFPOztBQUNkLGVBQU8sS0FBSyxPQUFMLENBQWE7QUFDaEIsb0JBQVEsTUFEUTtBQUVoQixvQkFGZ0I7QUFHaEIsa0JBQU0sS0FBSyxTQUFMLENBQWUsSUFBZjtBQUhVLFNBQWIsQ0FBUDtBQUtILEs7O0FBRUQ7Ozs7Ozs7OzJCQU1BLEcsdUJBQWlCO0FBQUEsWUFBWixHQUFZLFNBQVosR0FBWTtBQUFBLFlBQVAsSUFBTyxTQUFQLElBQU87O0FBQ2IsZUFBTyxLQUFLLE9BQUwsQ0FBYTtBQUNoQixvQkFBUSxLQURRO0FBRWhCLG9CQUZnQjtBQUdoQixrQkFBTSxLQUFLLFNBQUwsQ0FBZSxJQUFmO0FBSFUsU0FBYixDQUFQO0FBS0gsSzs7QUFFRDs7Ozs7OzsyQkFLQSxHLHVCQUFXO0FBQUEsWUFBTixHQUFNLFNBQU4sR0FBTTs7QUFDUCxlQUFPLEtBQUssT0FBTCxDQUFhO0FBQ2hCLG9CQUFRLFFBRFE7QUFFaEIsb0JBRmdCO0FBR2hCLGtCQUFNO0FBSFUsU0FBYixDQUFQO0FBS0gsSzs7QUFFRDs7Ozs7O2lCQUlPLE8sb0JBQVEsSSxFQUFNO0FBQUE7O0FBQ2pCLFlBQUksT0FBTyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQzlCLGdCQUFJLFdBQVcsUUFBUSw2QkFBUixDQUFmOztBQUVBLG1CQUFPLFdBQVcsSUFBWCxDQUFnQixZQUFNO0FBQ3pCLHVCQUFPLFdBQVMsSUFBVCxDQUFQO0FBQ0gsYUFGTSxDQUFQO0FBR0g7O0FBRUQsZUFBTyxJQUFJLElBQUosQ0FBUyxJQUFULENBQVA7QUFDSCxLIiwiZmlsZSI6IkZldGNoUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWJzdHJhY3RSZXF1ZXN0fSBmcm9tICcuL0Fic3RyYWN0UmVxdWVzdCc7XG5cbmV4cG9ydCBjbGFzcyBGZXRjaFJlcXVlc3QgZXh0ZW5kcyBBYnN0cmFjdFJlcXVlc3Qge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7e319IHF1ZXJ5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJvZHlcbiAgICAgKiBAcGFyYW0ge0Zvcm1EYXRhfSBkYXRhXG4gICAgICogQHBhcmFtIHt7fX0gaGVhZGVyc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHt9Pn1cbiAgICAgKi9cbiAgICByZXF1ZXN0KHt1cmwsIHF1ZXJ5LCBib2R5LCBkYXRhLCBoZWFkZXJzID0ge30sIG1ldGhvZCA9ICdHRVQnfSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGhlYWRlcnMsIHtcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZldGNoKHRoaXMuYnVpbGRVcmwodXJsLCBxdWVyeSksIG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAyMTApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Jlc3BvbnNlIHN0YXR1cyB3YXMgJyArIHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHt7fX0gZGF0YVxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8e30+fVxuICAgICAqL1xuICAgIHBvc3Qoe3VybCwgZGF0YX0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge3t9fSBkYXRhXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7fT59XG4gICAgICovXG4gICAgcHV0KHt1cmwsIGRhdGF9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiAncHV0JyxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHt9Pn1cbiAgICAgKi9cbiAgICBkZWwoe3VybH0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgZGF0YTogJ3t9J1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBkZXBzXG4gICAgICogQHJldHVybnMge0ZldGNoUmVxdWVzdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZmFjdG9yeShkZXBzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBsZXQgcG9seWZpbGwgPSByZXF1aXJlKCdwcm9taXNlP2dsb2JhbCF3aGF0d2ctZmV0Y2gnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBvbHlmaWxsKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGRlcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IHRoaXMoZGVwcyk7XG4gICAgfVxuXG59Il19