import {Collection, Prototype, Mutator} from '../../es5';
import {List} from '../models/List';

@Prototype({
    Model: List,
    url: 'http://localhost:8080/api/lists'
})
export class Lists extends Collection {

    updateDependencies() {
        return this.fetch();
    }

}