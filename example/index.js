import {Environment} from '../es5';
import {DomRenderer} from '../es5/Renderer/DomRenderer';

import {Repositories} from './collections/Repositories';
import {SearchState} from './models/SearchState';

import {Page} from './components/Page/Page';

let env = new Environment({
    renderer: new DomRenderer()
});

let searchState = new SearchState();
let repositories = new Repositories(null, {
    query: searchState.proxy('query')
});

let page = new Page({searchState, repositories});

env.render(page, document.body.firstChild);
searchState.set('query', 'injectify');

// document.body.appendChild(env.render(page));

// var link = document.createElement('link');
// document.appendChild(link)

// let model = new Model();
// model.set('count', 0);
// model.set('flag', false);
//
// setInterval(() => {
//     model.set('count', model.get('count') + 1);
// }, 1000);
//
// setInterval(() => {
//     model.set('flag', !model.get('flag'));
// }, 2000);
//
// let env = new Environment({
//     renderer: new DomRenderer()
// });
//
// var counter = new Counter({
//     model: model
// });
// console.log(counter);
