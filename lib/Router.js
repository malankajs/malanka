import {ValueProxy} from './Data/ValueProxy';

export class Router {

    /**
     * @param {{}} routes
     */
    constructor({routes}) {
        this._route = new ValueProxy({
            get: () => {
                return this._lastEvent && this._lastEvent.name;
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
    buildRoutes(routes) {
        Object.keys(routes).forEach(route => {
            this.addRoute(routes[route], route);
        });
    }

    /**
     * @param {string} name
     * @param {string} route
     */
    addRoute(name, route) {
        let names = [];

        this.index[name] = route;

        route = route.replace(/\(([^)]+)\)/g, (match, value) => {
            return '(?:' + value + ')?';
        });

        route = route.replace(/:([^/()]+)/g, (match, value) => {
            names.push(value);

            return '([^/]+)';
        });

        let regExp = new RegExp('^' + route + '$');

        this.routes.push((url, query, hash, state) => {
            let match = url.match(regExp),
                params = {};

            if (match) {
                names.forEach((name, index) => params[name] = this.normalizeParam(match[index + 1]));

                return {
                    name,
                    params,
                    query,
                    hash,
                    state
                };
            }
        });
    }

    /**
     * @param {string} input
     * @param {{}} [state]
     *
     * @returns {Promise<{name: string}>}
     */
    match(input, state) {
        let [baseUrl, hash = ''] = input.replace(/^https?:\/\/[^\/]+/, '').split('#'),
            [url, queryString = ''] = baseUrl.split('?'),
            queryParts = queryString.split('&'),
            query = {},
            event;

        if (queryString.length) {
            for (let index = 0; index < queryParts.length; index++) {
                let [key, value] = queryParts[index].split('=');

                key = decodeURIComponent(key);

                query[key] = this.normalizeParam(value);
            }
        }

        for (let index = 0; index < this.routes.length && !event; index++) {
            event = this.routes[index](url, query, hash, state);
        }

        let promise = event ?
            Promise.resolve(event) :
            Promise.reject(new Error('Cannot match url "' + url + '"'));

        if (!event) {
            event = {
                name: 'error',
                code: 404,
                state
            };
        }

        this._lastEvent = event;
        this._route.emit(event.name);

        return this.middlewares.reduce((promise, [success, error]) => {
            return promise.then(success, error ? error.bind(null, event) : null).then(() => event);
        }, promise);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} value
     * @returns {boolean|number|string}
     */
    normalizeParam(value) {
        if (typeof value != 'string') {
            return value;
        }

        value = decodeURIComponent(value);

        if (value === 'true' || value === 'false') {
            return value === 'true';
        } else {
            let num = Number(value);

            if (String(num) === value && num === num) {
                return num;
            }
        }

        return value;
    }

    /**
     * @param {string} routeName
     * @param {{}} params
     * 
     * @returns {string}
     */
    reverse(routeName, params = {}){
        var route = this.index[routeName],
            keys = Object.keys(params);

        let accept = (value) => value != null && value !== '';

        let interpolate = (str) => {
            return str.replace(/:([^)/]+)/g, (match, name) => {
                var index = keys.indexOf(name);
                if (index > -1 && accept(params[name])) {
                    keys.splice(index, 1);

                    return encodeURIComponent(String(params[name]));
                } else {
                    return match;
                }
            });
        };

        route = route.replace(/\(([^)]+)\)/g, (match, value) => {
            let str = interpolate(value);

            if (str !== value) {
                return str;
            } else {
                return '';
            }
        });

        route = interpolate(route);

        if (keys.length) {
            let query = [];

            keys.forEach(key => {
                if (accept(params[key])) {
                    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
                }
            });

            if (query.length) {
                route += '?' + query.join('&');
            }
        }

        return route;
    }

    /**
     * @param {{}} replaceQuery
     * @returns {string}
     */
    reverseReplace(replaceQuery) {
        let {name, params, query} = this._lastEvent;

        return this.reverse(name, Object.assign({}, params, query, replaceQuery));
    }

    /**
     * @param {function|null} success
     * @param {function} [error]
     */
    use(success, error) {
        this.middlewares.push([success, error]);
    }

    /**
     * @returns {Promise<{name: string}>}
     */
    start() {
        window.addEventListener('popstate', (event) => {
            this.matchCurrentUrl(event.state);
        });

        document.body.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'a') {
                event.preventDefault();
                this.navigate(event.target.href);
            }
        });

        return this.matchCurrentUrl();
    }

    /**
     * @returns {Promise<{name: string}>}
     */
    matchCurrentUrl(state = null) {
        return this.match(location.href, state);
    }

    /**
     * @param {string} url
     * @param {boolean} replace
     * @param {boolean} trigger
     * @param {{}} state
     */
    navigate(url, {replace = false, trigger = true, state = null} = {}) {
        if (typeof history === 'undefined') {
            return Promise.resolve();
        }

        let currentUrl = location.href;

        if (replace) {
            history.replaceState(state, '', url);
        } else {
            history.pushState(state, '', url);
        }

        if (trigger) {
            return this.match(url).catch(err => {
                history.replaceState(null, '', currentUrl);
                throw err;
            })
        } else {
            return Promise.resolve()
        }
    }

    /**
     * @param {{}} query
     * @param {{}} options
     *
     * @returns {Promise}
     */
    replace(query, options) {
        return this.navigate(this.reverseReplace(query), options);
    }

    /**
     * @param {string} name
     * 
     * @returns {ValueProxy}
     */
    isRoute(name) {
        return this._route.pipe(route => {
            return route === name;
        });
    }
}