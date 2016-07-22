import {Task} from '../Entity/Task';

export class TasksService {

    find(query) {
        return Task.find(query);
    }

    create(task) {
        return Task.create(task).save();
    }

    findOne(id) {
        return Task.findOne({_id: id});
    }

}