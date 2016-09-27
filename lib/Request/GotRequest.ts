import {AbstractRequest, AbstractRequestOptions} from './AbstractRequest';
import got from 'got';

export class GotRequest extends AbstractRequest {
    protected baseUrl:string;

    constructor(options) {
        super();

        this.baseUrl = options.baseUrl || '';
    }

    public request({url, query, headers = {}} = ({} as AbstractRequestOptions)): Promise<Object> {
        if (!url.match(/^https?:/)) {
            url = this.baseUrl + url;
        }

        Object.assign(headers, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        let options = {
            headers,
            json: true
        };

        return got.get(this.buildUrl(url, query), options)
            .then(response => {
                if (response.statusCode >= 200 && response.statusCode < 210) {
                    return response.body;
                }

                throw new Error('Response status was ' + response.statusCode);
            });
    }

}
