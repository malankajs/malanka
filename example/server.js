import 'source-map-support/register';

import {StringRenderer} from '../es5/Renderer/StringRenderer';
import {GotRequest} from '../es5/Request/GotRequest';

import {diConfig} from './di.config';
import {createContainer} from 'di.js/build/di.es5';

export default function (req, res, next) {
    let di = createContainer(diConfig);

    di.put('renderer', new StringRenderer());
    Promise.resolve(di({router: 'router', 'env': 'env'}, {di}))
        .then(({router, env}) => {
            return router.match(req.url).then(({page}) => {
                return env.render(page).toString();
            });
        })
        .then(body => {
            let diData = JSON.stringify(di.serialize()).replace(/</gi, '&lt;');
            return `<head></head><body>${body}<script>var diData=${diData};</script><script type="text/javascript" src="/assets/bundle.js"></script></body>`;
        })
        .then(content => {
            res.send(content);
        })
        .catch(err => {
            res.json({
                err: err && err.message,
                stack: err && err.stack && err.stack.split('\n')
            })
        })
        .then(() => {
            di.destroy();
        });

    di.put('request', new GotRequest());
}