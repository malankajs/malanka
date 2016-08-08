export class AbstractRequest {

    /**
     * @param {string} url
     * @param {{}|null} query
     *
     * @returns {string}
     */
    buildUrl(url, query) {
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