import 'source-map-support/register';

import {Router} from 'express';
import bodyParser from 'body-parser';

import {diController} from './server/controllers/diController';
import {apiController} from './server/controllers/apiController';
import {serverRender} from './server/controllers/serverRender';

export let app = new Router();

app.use(bodyParser.json());
app.use(diController);
app.use(apiController);
app.use(serverRender);