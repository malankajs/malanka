import {Router} from 'express';

import {tasksController} from './tasksController';

export let apiController = new Router();
apiController.use('/api/tasks', tasksController);