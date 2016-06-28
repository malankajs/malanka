import {AbstractRequest} from './AbstractRequest';

export class FetchRequest extends AbstractRequest {

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

}