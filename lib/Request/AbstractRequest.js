export class AbstractRequest {

    /**
     * @param {string} url
     * @param {{}|null} query
     * 
     * @returns {string}
     */
    buildUrl(url, query) {
        if (query) {
            let arr = Object.keys(query).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
            });

            if (arr.length) {
                url += '?' + arr.join('&');
            }
        }

        return url;
    }

}