import {Router} from 'express';

import {tasksController} from './tasksController';
import {listsController} from './listsController';

export let apiController = new Router();

apiController.use('/api/tasks', tasksController);
apiController.use('/api/lists', listsController);