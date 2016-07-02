import {DomRenderer} from '../es5/Renderer/DomRenderer';
import {FetchRequest} from '../es5/Request/FetchRequest';

import {diConfig} from './di.config';
import {then, createContainer, createMethodFactory, createInstanceFactory} from 'di.js/build/di.es5';

let createRestoreFactory = (data) => {
    return ({id, Module}, dependencies) => {
        if (data[id]) {
            return Module.restore(data[id], dependencies);
        }
    }
};

diConfig.factories = [
    createRestoreFactory(diData),
    createMethodFactory(),
    createInstanceFactory()
];

let di = createContainer(diConfig);

di.put('renderer', new DomRenderer());
di.put('request', new FetchRequest());

let event = {
    query: {
        query: ''
    }
};

then(di({page: 'page', 'env': 'env'}, {event}), ({page, env}) => {
    console.time('Client render');
    env.render(page, document.body.firstChild);
    console.timeEnd('Client render');
});

