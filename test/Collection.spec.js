import {expect} from 'chai';
import {Collection} from '../lib/Data/Collection';

describe('Collection', function() {

    let collection;

    beforeEach(function() {
        collection = new Collection([{id: 1}, {id: 2}, {id: 3}]);
    });

    it('supports pluck(name)', function() {
        expect(collection.pluck('id')).to.eql([1, 2, 3]);
    });

});
