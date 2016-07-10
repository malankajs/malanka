import {staticResolver} from 'di.js/build/di.es5';

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

diConfig.resolvers.push(staticResolver({FetchRequest}));
diConfig.dependencies.request = 'FetchRequest';

let di = createContainer(diConfig);

di.put('renderer', new DomRenderer());

then(di({'env': 'env', router: 'router'}, {di}), ({env, router}) => {
    return router.start().then(event => {
        env.render(event.page, document.body.firstChild);
    });
});

