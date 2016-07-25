import {TaskEntity} from '../Entity/TaskEntity';

export class TasksService {

    find(query) {
        return TaskEntity.find(query);
    }

    create(task) {
        return TaskEntity.create(task).save();
    }

    findOne(id) {
        return TaskEntity.findOne({_id: id});
    }

}