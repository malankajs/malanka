import {crudFactory} from './crudFactory';
import {Task} from '../Entity/Task';

export let tasksController = crudFactory(Task);