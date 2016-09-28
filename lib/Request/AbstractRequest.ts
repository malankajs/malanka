import {AbstractRequestOptions} from '../declarations';

export class AbstractRequest {
    public del : (options : AbstractRequestOptions) => Promise<Object>;
    public put : (options : AbstractRequestOptions) => Promise<Object>;
    public post : (options : AbstractRequestOptions) => Promise<Object>;
    public request : (options : AbstractRequestOptions) => Promise<Object>;


    /**
     * @param {string} url
     * @param {{}|null} query
     *
     * @returns {string}
     */
    public buildUrl(url, query) {
        if (query) {
            let result = [];

            Object.keys(query).forEach(key => {
                if (query[key] != null && query[key] !== '') {
                    result.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
                }
            });

            if (result.length) {
                url += '?' + result.join('&');
            }
        }

        return url;
    }

}
