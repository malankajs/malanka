import {AbstractRequest} from './AbstractRequest';

export class FetchRequest extends AbstractRequest {

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
    request({url, query, body, data, headers = {}, method = 'GET'}) {
        Object.assign(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        let options = {
            method,
            body,
            data,
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
     * @param {string} url
     * @param {{}} data
     *
     * @returns {Promise<{}>}
     */
    post({url, data}) {
        return this.request({
            method: 'post',
            url,
            body: JSON.stringify(data)
        });
    }

    /**
     * @param {string} url
     * @param {{}} data
     *
     * @returns {Promise<{}>}
     */
    put({url, data}) {
        return this.request({
            method: 'put',
            url,
            body: JSON.stringify(data)
        });
    }

    /**
     * @param {string} url
     *
     * @returns {Promise<{}>}
     */
    del({url}) {
        return this.request({
            method: 'delete',
            url,
            data: '{}'
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