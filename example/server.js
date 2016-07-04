import 'source-map-support/register';

import {StringRenderer} from '../es5/Renderer/StringRenderer';
import {GotRequest} from '../es5/Request/GotRequest';

import {diConfig} from './di.config';
import {createContainer, then} from 'di.js/build/di.es5';


export default function (req, res, next) {
    let di = createContainer(diConfig);

    di.put('renderer', new StringRenderer());
    di.put('request', new GotRequest());

    let event = {
        query: {
            query: ''
        }
    };

    then(di({page: 'page', 'env': 'env'}, {event}), ({page, env}) => {
        console.time('Server render');
        var body = env.render(page).toString();
        console.timeEnd('Server render');

        let diData = JSON.stringify(di.serialize()).replace(/</gi, '&lt;');
        // <link rel="stylesheet" href="styles.css"/>
        let html = `<head></head><body>${body}<script>var diData=${diData};</script><script type="text/javascript" src="/assets/bundle.js"></script></body>`;

        res.send(html);
        
        di.destroy();
    }, (err) => {
        next(err);
    });
}