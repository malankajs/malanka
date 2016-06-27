import {Model} from '../lib/Model';
import {Environment} from '../lib/Environment';
import {DomRenderer} from '../lib/Renderer/DomRenderer';

import {Repositories} from './collections/Repositories';
import {SearchState} from './models/SearchState';

import {Page} from './components/Page/Page';

let env = new Environment({
    renderer: new DomRenderer()
});

let searchState = new SearchState({
    query: 'injectify'
});
let repositories = new Repositories(null, {
    query: searchState.proxy('query')
});

let page = new Page({searchState, repositories});
console.log(page);

env.render(page, document.body.firstChild);

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
