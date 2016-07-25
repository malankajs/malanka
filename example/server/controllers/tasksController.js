import {crudFactory} from './crudFactory';
import {TaskEntity} from '../Entity/TaskEntity';

export let tasksController = crudFactory(TaskEntity);