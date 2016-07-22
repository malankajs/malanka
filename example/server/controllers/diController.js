import {createContainer, then} from 'di.js/build/di.es5'
import {config} from '../di.server.js';

let container = createContainer(config);

export function diController(req, res, next) {
    then(container('database'), () => {
        req.di = container.clone();
        next();
    });
}