'use strict';

exports.__esModule = true;
exports.Router = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ValueProxy = require('./Data/ValueProxy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = exports.Router = function () {

    /**
     * @param {{}} routes
     */
    function Router(_ref) {
        var _this = this;

        var routes = _ref.routes;
        (0, _classCallCheck3.default)(this, Router);

        this._route = new _ValueProxy.ValueProxy({
            get: function get() {
                return _this._lastEvent && _this._lastEvent.name;
            }
        });

        this.routes = [];
        this.index = {};
        this.middlewares = [];

        this.buildRoutes(routes);
    }

    /**
     * @param {{}} routes
     */


    Router.prototype.buildRoutes = function buildRoutes(routes) {
        var _this2 = this;

        Object.keys(routes).forEach(function (route) {
            _this2.addRoute(routes[route], route);
        });
    };

    /**
     * @param {string} name
     * @param {string} route
     */


    Router.prototype.addRoute = function addRoute(name, route) {
        var _this3 = this;

        var names = [];

        this.index[name] = route;

        route = route.replace(/\(([^)]+)\)/g, function (match, value) {
            return '(?:' + value + ')?';
        });

        route = route.replace(/:([^/()]+)/g, function (match, value) {
            names.push(value);

            return '([^/]+)';
        });

        var regExp = new RegExp('^' + route + '$');

        this.routes.push(function (url, query, hash, state) {
            var match = url.match(regExp),
                params = {};

            if (match) {
                names.forEach(function (name, index) {
                    return params[name] = _this3.normalizeParam(match[index + 1]);
                });

                return {
                    name: name,
                    params: params,
                    query: query,
                    hash: hash,
                    state: state
                };
            }
        });
    };

    /**
     * @param {string} input
     * @param {{}} [state]
     *
     * @returns {Promise<{name: string}>}
     */


    Router.prototype.match = function match(input, state) {
        var _input$replace$split = input.replace(/^https?:\/\/[^\/]+/, '').split('#');

        var baseUrl = _input$replace$split[0];
        var _input$replace$split$ = _input$replace$split[1];
        var hash = _input$replace$split$ === undefined ? '' : _input$replace$split$;

        var _baseUrl$split = baseUrl.split('?');

        var url = _baseUrl$split[0];
        var _baseUrl$split$ = _baseUrl$split[1];
        var queryString = _baseUrl$split$ === undefined ? '' : _baseUrl$split$;
        var queryParts = queryString.split('&');
        var query = {};
        var event = void 0;

        if (queryString.length) {
            for (var index = 0; index < queryParts.length; index++) {
                var _queryParts$index$spl = queryParts[index].split('=');

                var key = _queryParts$index$spl[0];
                var value = _queryParts$index$spl[1];


                key = decodeURIComponent(key);

                query[key] = this.normalizeParam(value);
            }
        }

        for (var _index = 0; _index < this.routes.length && !event; _index++) {
            event = this.routes[_index](url, query, hash, state);
        }

        var promise = event ? Promise.resolve(event) : Promise.reject(new Error('Cannot match url "' + url + '"'));

        if (!event) {
            event = {
                name: 'error',
                code: 404,
                state: state
            };
        }

        this._lastEvent = event;
        this._route.emit(event.name);

        return this.middlewares.reduce(function (promise, _ref2) {
            var success = _ref2[0];
            var error = _ref2[1];

            return promise.then(success, error ? error.bind(null, event) : null).then(function () {
                return event;
            });
        }, promise);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} value
     * @returns {boolean|number|string}
     */


    Router.prototype.normalizeParam = function normalizeParam(value) {
        if (typeof value != 'string') {
            return value;
        }

        value = decodeURIComponent(value);

        if (value === 'true' || value === 'false') {
            return value === 'true';
        } else {
            var num = Number(value);

            if (String(num) === value && num === num) {
                return num;
            }
        }

        return value;
    };

    /**
     * @param {string} routeName
     * @param {{}} params
     * 
     * @returns {string}
     */


    Router.prototype.reverse = function reverse(routeName) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var route = this.index[routeName],
            keys = Object.keys(params);

        var accept = function accept(value) {
            return value != null && value !== '';
        };

        var interpolate = function interpolate(str) {
            return str.replace(/:([^)/]+)/g, function (match, name) {
                var index = keys.indexOf(name);
                if (index > -1 && accept(params[name])) {
                    keys.splice(index, 1);

                    return encodeURIComponent(String(params[name]));
                } else {
                    return match;
                }
            });
        };

        route = route.replace(/\(([^)]+)\)/g, function (match, value) {
            var str = interpolate(value);

            if (str !== value) {
                return str;
            } else {
                return '';
            }
        });

        route = interpolate(route);

        if (keys.length) {
            (function () {
                var query = [];

                keys.forEach(function (key) {
                    if (accept(params[key])) {
                        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
                    }
                });

                if (query.length) {
                    route += '?' + query.join('&');
                }
            })();
        }

        return route;
    };

    /**
     * @param {{}} replaceQuery
     * @returns {string}
     */


    Router.prototype.reverseReplace = function reverseReplace(replaceQuery) {
        var _lastEvent = this._lastEvent;
        var name = _lastEvent.name;
        var params = _lastEvent.params;
        var query = _lastEvent.query;


        return this.reverse(name, Object.assign({}, params, query, replaceQuery));
    };

    /**
     * @param {function|null} success
     * @param {function} [error]
     */


    Router.prototype.use = function use(success, error) {
        this.middlewares.push([success, error]);
    };

    /**
     * @returns {Promise<{name: string}>}
     */


    Router.prototype.start = function start() {
        var _this4 = this;

        window.addEventListener('popstate', function (event) {
            _this4.matchCurrentUrl(event.state);
        });

        document.body.addEventListener('click', function (event) {
            var link = event.target;

            if (link.tagName.toLowerCase() === 'a') {
                if (link.getAttribute('target')) {
                    return;
                }

                event.preventDefault();
                _this4.navigate(link.href);
            }
        });

        return this.matchCurrentUrl();
    };

    /**
     * @returns {Promise<{name: string}>}
     */


    Router.prototype.matchCurrentUrl = function matchCurrentUrl() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        return this.match(location.href, state);
    };

    /**
     * @param {string} url
     * @param {boolean} replace
     * @param {boolean} trigger
     * @param {{}} state
     */


    Router.prototype.navigate = function navigate(url) {
        var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _ref3$replace = _ref3.replace;
        var replace = _ref3$replace === undefined ? false : _ref3$replace;
        var _ref3$trigger = _ref3.trigger;
        var trigger = _ref3$trigger === undefined ? true : _ref3$trigger;
        var _ref3$state = _ref3.state;
        var state = _ref3$state === undefined ? null : _ref3$state;

        if (typeof history === 'undefined') {
            return Promise.resolve();
        }

        var currentUrl = location.href;

        if (replace) {
            history.replaceState(state, '', url);
        } else {
            history.pushState(state, '', url);
        }

        if (trigger) {
            return this.match(url).catch(function (err) {
                history.replaceState(null, '', currentUrl);
                throw err;
            });
        } else {
            return Promise.resolve();
        }
    };

    /**
     * @param {{}} query
     * @param {{}} options
     *
     * @returns {Promise}
     */


    Router.prototype.replace = function replace(query, options) {
        return this.navigate(this.reverseReplace(query), options);
    };

    /**
     * @param {string} name
     * 
     * @returns {ValueProxy}
     */


    Router.prototype.isRoute = function isRoute(name) {
        return this._route.pipe(function (route) {
            return route === name;
        });
    };

    return Router;
}();
//# sourceMappingURL=data:application/json;base64,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NkIsR0FBN0I7QUFDSDs7QUFFRCxZQUFJLE9BQUosRUFBYTtBQUNULG1CQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsS0FBaEIsQ0FBc0IsZUFBTztBQUNoQyx3QkFBUSxZQUFSLENBQXFCLElBQXJCLEVBQTJCLEVBQTNCLEVBQStCLFVBQS9CO0FBQ0Esc0JBQU0sR0FBTjtBQUNILGFBSE0sQ0FBUDtBQUlILFNBTEQsTUFLTztBQUNILG1CQUFPLFFBQVEsT0FBUixFQUFQO0FBQ0g7QUFDSixLOztBQUVEOzs7Ozs7OztxQkFNQSxPLG9CQUFRLEssRUFBTyxPLEVBQVM7QUFDcEIsZUFBTyxLQUFLLFFBQUwsQ0FBYyxLQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBZCxFQUEwQyxPQUExQyxDQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7OztxQkFLQSxPLG9CQUFRLEksRUFBTTtBQUNWLGVBQU8sS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixpQkFBUztBQUM3QixtQkFBTyxVQUFVLElBQWpCO0FBQ0gsU0FGTSxDQUFQO0FBR0gsSyIsImZpbGUiOiJSb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZhbHVlUHJveHl9IGZyb20gJy4vRGF0YS9WYWx1ZVByb3h5JztcblxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSByb3V0ZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7cm91dGVzfSkge1xuICAgICAgICB0aGlzLl9yb3V0ZSA9IG5ldyBWYWx1ZVByb3h5KHtcbiAgICAgICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYXN0RXZlbnQgJiYgdGhpcy5fbGFzdEV2ZW50Lm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pbmRleCA9IHt9O1xuICAgICAgICB0aGlzLm1pZGRsZXdhcmVzID0gW107XG5cbiAgICAgICAgdGhpcy5idWlsZFJvdXRlcyhyb3V0ZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IHJvdXRlc1xuICAgICAqL1xuICAgIGJ1aWxkUm91dGVzKHJvdXRlcykge1xuICAgICAgICBPYmplY3Qua2V5cyhyb3V0ZXMpLmZvckVhY2gocm91dGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRSb3V0ZShyb3V0ZXNbcm91dGVdLCByb3V0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlXG4gICAgICovXG4gICAgYWRkUm91dGUobmFtZSwgcm91dGUpIHtcbiAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgdGhpcy5pbmRleFtuYW1lXSA9IHJvdXRlO1xuXG4gICAgICAgIHJvdXRlID0gcm91dGUucmVwbGFjZSgvXFwoKFteKV0rKVxcKS9nLCAobWF0Y2gsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJyg/OicgKyB2YWx1ZSArICcpPyc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlID0gcm91dGUucmVwbGFjZSgvOihbXi8oKV0rKS9nLCAobWF0Y2gsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBuYW1lcy5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuICcoW14vXSspJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgcm91dGUgKyAnJCcpO1xuXG4gICAgICAgIHRoaXMucm91dGVzLnB1c2goKHVybCwgcXVlcnksIGhhc2gsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSB1cmwubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSwgaW5kZXgpID0+IHBhcmFtc1tuYW1lXSA9IHRoaXMubm9ybWFsaXplUGFyYW0obWF0Y2hbaW5kZXggKyAxXSkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgaGFzaCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRcbiAgICAgKiBAcGFyYW0ge3t9fSBbc3RhdGVdXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7bmFtZTogc3RyaW5nfT59XG4gICAgICovXG4gICAgbWF0Y2goaW5wdXQsIHN0YXRlKSB7XG4gICAgICAgIGxldCBbYmFzZVVybCwgaGFzaCA9ICcnXSA9IGlucHV0LnJlcGxhY2UoL15odHRwcz86XFwvXFwvW15cXC9dKy8sICcnKS5zcGxpdCgnIycpLFxuICAgICAgICAgICAgW3VybCwgcXVlcnlTdHJpbmcgPSAnJ10gPSBiYXNlVXJsLnNwbGl0KCc/JyksXG4gICAgICAgICAgICBxdWVyeVBhcnRzID0gcXVlcnlTdHJpbmcuc3BsaXQoJyYnKSxcbiAgICAgICAgICAgIHF1ZXJ5ID0ge30sXG4gICAgICAgICAgICBldmVudDtcblxuICAgICAgICBpZiAocXVlcnlTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcXVlcnlQYXJ0cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgW2tleSwgdmFsdWVdID0gcXVlcnlQYXJ0c1tpbmRleF0uc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuXG4gICAgICAgICAgICAgICAgcXVlcnlba2V5XSA9IHRoaXMubm9ybWFsaXplUGFyYW0odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucm91dGVzLmxlbmd0aCAmJiAhZXZlbnQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGV2ZW50ID0gdGhpcy5yb3V0ZXNbaW5kZXhdKHVybCwgcXVlcnksIGhhc2gsIHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9taXNlID0gZXZlbnQgP1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGV2ZW50KSA6XG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0Nhbm5vdCBtYXRjaCB1cmwgXCInICsgdXJsICsgJ1wiJykpO1xuXG4gICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgY29kZTogNDA0LFxuICAgICAgICAgICAgICAgIHN0YXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuX3JvdXRlLmVtaXQoZXZlbnQubmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWlkZGxld2FyZXMucmVkdWNlKChwcm9taXNlLCBbc3VjY2VzcywgZXJyb3JdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKHN1Y2Nlc3MsIGVycm9yID8gZXJyb3IuYmluZChudWxsLCBldmVudCkgOiBudWxsKS50aGVuKCgpID0+IGV2ZW50KTtcbiAgICAgICAgfSwgcHJvbWlzZSk7XG4gICAgfVxuXG4gICAgLy9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufG51bWJlcnxzdHJpbmd9XG4gICAgICovXG4gICAgbm9ybWFsaXplUGFyYW0odmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoU3RyaW5nKG51bSkgPT09IHZhbHVlICYmIG51bSA9PT0gbnVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcm91dGVOYW1lXG4gICAgICogQHBhcmFtIHt7fX0gcGFyYW1zXG4gICAgICogXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICByZXZlcnNlKHJvdXRlTmFtZSwgcGFyYW1zID0ge30pe1xuICAgICAgICB2YXIgcm91dGUgPSB0aGlzLmluZGV4W3JvdXRlTmFtZV0sXG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMocGFyYW1zKTtcblxuICAgICAgICBsZXQgYWNjZXB0ID0gKHZhbHVlKSA9PiB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAnJztcblxuICAgICAgICBsZXQgaW50ZXJwb2xhdGUgPSAoc3RyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzooW14pL10rKS9nLCAobWF0Y2gsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBrZXlzLmluZGV4T2YobmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEgJiYgYWNjZXB0KHBhcmFtc1tuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHBhcmFtc1tuYW1lXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoL1xcKChbXildKylcXCkvZywgKG1hdGNoLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ciA9IGludGVycG9sYXRlKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHN0ciAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvdXRlID0gaW50ZXJwb2xhdGUocm91dGUpO1xuXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gW107XG5cbiAgICAgICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhY2NlcHQocGFyYW1zW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trZXldKX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJvdXRlICs9ICc/JyArIHF1ZXJ5LmpvaW4oJyYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb3V0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSByZXBsYWNlUXVlcnlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHJldmVyc2VSZXBsYWNlKHJlcGxhY2VRdWVyeSkge1xuICAgICAgICBsZXQge25hbWUsIHBhcmFtcywgcXVlcnl9ID0gdGhpcy5fbGFzdEV2ZW50O1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJldmVyc2UobmFtZSwgT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zLCBxdWVyeSwgcmVwbGFjZVF1ZXJ5KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbnxudWxsfSBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2Vycm9yXVxuICAgICAqL1xuICAgIHVzZShzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICB0aGlzLm1pZGRsZXdhcmVzLnB1c2goW3N1Y2Nlc3MsIGVycm9yXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8e25hbWU6IHN0cmluZ30+fVxuICAgICAqL1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hDdXJyZW50VXJsKGV2ZW50LnN0YXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIGxpbmsgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICAgIGlmIChsaW5rLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKGxpbmsuaHJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoQ3VycmVudFVybCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHtuYW1lOiBzdHJpbmd9Pn1cbiAgICAgKi9cbiAgICBtYXRjaEN1cnJlbnRVcmwoc3RhdGUgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKGxvY2F0aW9uLmhyZWYsIHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtib29sZWFufSByZXBsYWNlXG4gICAgICogQHBhcmFtIHtib29sZWFufSB0cmlnZ2VyXG4gICAgICogQHBhcmFtIHt7fX0gc3RhdGVcbiAgICAgKi9cbiAgICBuYXZpZ2F0ZSh1cmwsIHtyZXBsYWNlID0gZmFsc2UsIHRyaWdnZXIgPSB0cnVlLCBzdGF0ZSA9IG51bGx9ID0ge30pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBoaXN0b3J5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1cnJlbnRVcmwgPSBsb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShzdGF0ZSwgJycsIHVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgJycsIHVybCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHJpZ2dlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2godXJsKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCBjdXJyZW50VXJsKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBxdWVyeVxuICAgICAqIEBwYXJhbSB7e319IG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIHJlcGxhY2UocXVlcnksIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGUodGhpcy5yZXZlcnNlUmVwbGFjZShxdWVyeSksIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogXG4gICAgICogQHJldHVybnMge1ZhbHVlUHJveHl9XG4gICAgICovXG4gICAgaXNSb3V0ZShuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZS5waXBlKHJvdXRlID0+IHtcbiAgICAgICAgICAgIHJldHVybiByb3V0ZSA9PT0gbmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==