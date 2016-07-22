import {Document} from 'camo';

export class Task extends Document {

    constructor() {
        super();

        this.title = String;
        this.done = Boolean;
    }

}