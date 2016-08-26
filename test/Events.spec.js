import {Events} from '../lib/Data/Events';
import {expect} from 'chai';

describe('Events', function() {
    let channel, anotherChannel;
    let count = 0, anotherCount = 0;
    let cb = () => --count, anotherCb = () => --anotherCount;

    beforeEach(function () {
        channel = new Events();
        anotherChannel = new Events();
    });

    it('supports `once(cb)`', function() {
        count = 1; anotherCount = 2;
        channel.on(anotherCb).once(cb).emit().emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports multiple `once(cb)`', function() {
        count = 1; anotherCount = 1;
        channel.once(cb).once(anotherCb).emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports multiple `once(cb)` with the same cb', function() {
        count = 2;
        channel.once(cb).once(cb).emit();
        expect(count).to.eql(0);
    });

    it('supports recursive `emit` on the same channel with emit-time `off` calls', function() {
        count = 1; anotherCount = 2;
        let cb = () => {
            --count;
            channel.off(cb);
            channel.emit();
        };
        channel.on(cb).on(anotherCb).emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports `listenToOnce(obj, cb)`', function() {
        count = 1; anotherCount = 2;
        channel.listenTo(channel, anotherCb).listenToOnce(channel, cb).emit().emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports multiple `listenToOnce(obj, cb)`', function() {
        count = 1; anotherCount = 1;
        channel.listenToOnce(channel, cb).listenToOnce(channel, anotherCb).emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports `stopListening()`', function() {
        count = 0; anotherCount = 0;
        channel.listenTo(channel, cb).listenToOnce(channel, anotherCb).stopListening().emit().emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports `stopListening(obj)`', function() {
        count = 0; anotherCount = 2;
        channel.listenTo(anotherChannel, cb).listenTo(channel, anotherCb)
            .stopListening(anotherChannel).emit().emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

    it('supports `stopListening(obj, cb)`', function() {
        count = 0; anotherCount = 2;
        channel.listenTo(channel, cb).listenTo(channel, anotherCb)
            .stopListening(channel, cb).emit().emit();
        expect([count, anotherCount]).to.eql([0, 0]);
    });

});
