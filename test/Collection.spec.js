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

    it('supports length proxy', function () {
        expect(collection.proxy('length').getValue()).to.equal(3);
    });

    it('supports length proxy emit', function () {
        let len;

        collection.proxy('length').on(length => len = length);
        collection.add({id: 4});

        expect(len).to.equal(4);
    });

});
