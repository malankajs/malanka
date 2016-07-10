import {AbstractRequest} from './AbstractRequest';

export class FetchRequest extends AbstractRequest {

    /**
     * @param {string} url
     * @param {{}} query
     * @param {{}} headers
     * n
     * @returns {Promise<{}>}
     */
    request({url, query, headers = {}}) {
        Object.assign(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        let options = {
            headers: headers
        };

        return fetch(this.buildUrl(url, query), options)
            .then((response) => {
                if (response.status >= 200 && response.status < 210) {
                    return response.json();
                }

                throw new Error('Response status was ' + response.status);
            });
    }

    /**
     * @param {{}} deps
     * @returns {FetchRequest}
     */
    static factory(deps) {
        if (typeof fetch === 'undefined') {
            let polyfill = require('promise?global!whatwg-fetch');

            return polyfill().then(() => {
                return new this(deps);
            });
        }

        return new this(deps);
    }

}