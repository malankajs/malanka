import 'source-map-support/register';

import {Environment} from '../lib/Environment';
import {StringRenderer} from '../lib/Renderer/StringRenderer';

import {Repositories} from './collections/Repositories';
import {SearchState} from './models/SearchState';

import {Page} from './components/Page/Page';

let env = new Environment({
    renderer: new StringRenderer()
});

let searchState = new SearchState();
let repositories = new Repositories(null, {
    query: searchState.proxy('query')
});

let page = new Page({searchState, repositories});

export default function (req, res, next) {
    var body = env.render(page).toString();

    let html = `<head><link rel="stylesheet" href="styles.css"/></head><body>${body}<script type="text/javascript" src="bundle.js"></script></body>`;

    res.send(html);
}