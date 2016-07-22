import {connect} from 'camo';

export class Database {

    constructor({db}) {
        this.db = db;
    }

    /**
     * @returns {Promise<Database>}
     */
    static factory() {
        return connect('nedb://' + process.cwd() + '/data').then(db => {
            return new Database({db});
        });
    }

}