import './config';
import {expect} from 'chai';

import {ValueProxy} from '../lib/Data/ValueProxy';
import {Model} from '../lib/Data/Model';

describe('ValueProxy', function () {
    let model;

    beforeEach(function () {
        model = new Model({value: 123, test: 321});
    });

    it('get correct value for model proxy', function () {
        expect(model.proxy('value').getValue()).to.equal(123);
        expect(model.proxy('value').toNumber()).to.equal(123);
        expect(model.proxy('value').toString()).to.equal('123');
    });

    it('return same proxy for model', function () {
        expect(model.proxy('value')).to.equal(model.proxy('value'));
        expect(model.proxy('value')).not.to.equal(model.proxy('value2'));
    });

    it('proxy model changes', function () {
        expect(model.proxy('value').getValue()).to.equal(123);
        model.set('value', 321);
        expect(model.proxy('value').getValue()).to.equal(321);
    });

    it('can mutate value', function () {
        var proxy = model.proxy('value').pipe(value => value + '!');
        expect(proxy.getValue()).to.equal('123!');
        model.set('value', 321);
        expect(proxy.getValue()).to.equal('321!');
    });

    it('can handle several proxies', function () {
        var proxy = ValueProxy.all([
            model.proxy('value'),
            model.proxy('test')
        ]);

        expect(proxy.getValue()).to.eql([123, 321]);
        model.set('value', 1);
        expect(proxy.getValue()).to.eql([1, 321]);
        model.set('test', 2);
        expect(proxy.getValue()).to.eql([1, 2]);
    });

    it('fire event when model change', function () {
        let calledValue;

        model.proxy('value').on((value) => calledValue = value);
        model.set('value', 321);

        expect(calledValue).to.equal(321);
    });

    it('not fire event when model not changed', function () {
        let calledValue;

        model.proxy('value').on((value) => calledValue = value);
        model.set('value', 123);

        expect(calledValue).to.equal(undefined);
    });

    it('fire event when model change on mutate', function () {
        let calledValue;

        model.proxy('value').pipe(value => value + '!').on(value => calledValue = value);
        model.set('value', 321);

        expect(calledValue).to.equal('321!');
    });

    it('not fire event when model not change with mutate', function () {
        let calledValue;

        model.proxy('value').pipe(value => value + '!').on(value => calledValue = value);
        model.set('value', 123);

        expect(calledValue).to.equal(undefined);
    });

    it('not fire event when model change but mutate not change', function () {
        let calledCount = 0;

        let proxy = model.proxy('value').pipe(value => 'test').on(value => calledCount++);
        model.set('value', 321);

        expect(proxy.getValue()).to.equal('test');
        expect(calledCount).to.equal(0);
    });

    it('fire event when model change with array ', function () {
        let calledValue;

        ValueProxy.all([model.proxy('value'), model.proxy('test')]).on(value => calledValue = value);
        model.set('value', 321);

        expect(calledValue).to.eql([321, 321]);
    });

    it('not fire event when model not change with array ', function () {
        let calledValue;

        ValueProxy.all([model.proxy('value'), model.proxy('test')]).on(value => calledValue = value);
        model.set('value', 123);

        expect(calledValue).to.eql(undefined);
    });

    it('fire event when model change with array with mutate', function () {
        let calledValue;

        ValueProxy.all([model.proxy('value'), model.proxy('test')])
            .pipe(value => value.join(' '))
            .on(value => calledValue = value);

        model.set('value', 321);

        expect(calledValue).to.eql('321 321');
    });

    it('handle promises then with no watch', function () {
        let proxy = new ValueProxy(),
            thenProxy = proxy.then(),
            promise = Promise.resolve(123);

        expect(thenProxy.getValue()).to.equal(undefined);
        proxy.emitValue(promise);
        expect(thenProxy.getValue()).to.equal(undefined);

        return thenProxy._promise.then(() => {
            expect(thenProxy.getValue()).to.equal(123);
        });
    });

    it('handle promises then with watch', function () {
        let proxy = new ValueProxy(),
            thenProxy = proxy.then(),
            promise = Promise.resolve(123),
            calledValue;

        thenProxy.on(value => calledValue = value);
        proxy.emitValue(promise);

        return thenProxy._promise.then(() => {
            expect(calledValue).to.equal(123);
        });
    });

});