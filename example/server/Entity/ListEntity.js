import {Document} from 'camo';

export class ListEntity extends Document {

    constructor() {
        super();

        this.title = String;
        this.weight = Number;
    }

    static collectionName() {
        return 'listentitys';
    }

}