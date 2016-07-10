import {Model, Mutator, Prototype} from '../../es5';

@Prototype({
    defaults: {
        a: 0,
        b: 0
    }
})
export class Calc extends Model {

    @Mutator(['a', 'b'])
    sum([a, b]) {
        return Number(a) + Number(b);
    }
    
}