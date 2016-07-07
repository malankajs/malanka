export class AbstractRouter {

    /**
     * @param {{}} routes
     */
    constructor({routes}) {
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

        route = route.replace(/\(([^)]+)\)/g, (match, value) => {
            return '(?:' + value + ')?';
        });

        route = route.replace(/:([^/()]+)/g, (match, value) => {
            names.push(value);

            return '([^/]+)';
        });

        let regExp = new RegExp('^' + route + '$');

        this.routes.push((url, query, hash) => {
            let match = url.match(regExp),
                params = {};

            if (match) {
                names.forEach((name, index) => params[name] = this.normalizeParam(match[index + 1]));

                return {
                    name,
                    params,
                    query,
                    hash
                };
            }
        });
    }

    /**
     * @param {string} input
     *
     * @returns {Promise<{name: string}>}
     */
    match(input) {
        let [baseUrl, hash = ''] = input.split('#'),
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
            event = this.routes[index](url, query, hash);
        }

        if (event) {
            return this.middlewares.reduce((promise, middleware) => {
                return promise.then(middleware).then(() => event);
            }, Promise.resolve(event));
        } else {
            return Promise.reject(new Error('Cannot match url "' + url + '"'));
        }
    }

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
            return  value === 'true';
        } else {
            let num = Number(value);

            if (String(num) === value && num === num) {
                return num;
            }
        }

        return value;
    }

    /**
     * @param {function} middleware
     */
    use(middleware) {
        this.middlewares.push(middleware);
    }

    /**
     * @returns {Promise<{name: string}>}
     */
    start() {
        window.addEventListener('popstate', () => {
            this.matchCurrentUrl();
        });
        
        return this.matchCurrentUrl();
    }

    /**
     * @returns {Promise<{name: string}>}
     */
    matchCurrentUrl() {
        let url = location.href.replace(/^https?:\/\/[^\/]+/, '');

        return this.match(url);
    }
    
}