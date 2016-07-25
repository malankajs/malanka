import {Document} from 'camo';

export class TaskEntity extends Document {

    constructor() {
        super();

        this.title = String;
        this.list = String;
        this.done = Boolean;
        this.weight = Number;
    }

}