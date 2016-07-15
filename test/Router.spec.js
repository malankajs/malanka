import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {expect} from 'chai';
import {AbstractRouter} from '../example/lib/AbstractRouter';

chai.use(chaiAsPromised);

describe('Router', function () {
    let router;

    beforeEach(function () {
        router = new AbstractRouter({
            routes: {
                '/': 'home',
                '/param/:name/:name2': 'param',
                '/cond/:name(/:cond)': 'cond'
            }
        });
    });
    
    it('can match home', function() {
        return router.match('/').then(event => {
            expect(event).to.eql({
                name: 'home',
                params: {},
                query: {},
                hash: '',
                state: undefined
            });
        });
    });

    it('can match home with hash', function() {
        return router.match('/#abc').then(event => {
            expect(event).to.eql({
                name: 'home',
                params: {},
                query: {},
                hash: 'abc',
                state: undefined
            });
        });
    });

    it('can match home with query', function() {
        return router.match('/?num=1&bool=true&str=test').then(event => {
            expect(event).to.eql({
                name: 'home',
                params: {},
                query: {
                    num: 1,
                    bool: true,
                    str: 'test'
                },
                hash: '',
                state: undefined
            });
        });
    });

    it('can match home with query and hash', function() {
        return router.match('/?str=test#abc').then(event => {
            expect(event).to.eql({
                name: 'home',
                params: {},
                query: {
                    str: 'test'
                },
                hash: 'abc',
                state: undefined
            });
        });
    });
    
    it('support middlewares', function() {
        router.use((event) => event.test1 = true);
        router.use((event) => event.test2 = true);

        return router.match('/?str=test#abc').then(event => {
            expect(event.test1).to.be.true;
            expect(event.test2).to.be.true;
        });
    });

    it('can match params', function() {
        return router.match('/param/1/2').then(event => {
            expect(event).to.eql({
                name: 'param',
                params: {
                    name: 1,
                    name2: 2
                },
                query: {},
                hash: '',
                state: undefined
            });
        });
    });

    it('can match conditional', function() {
        return router.match('/cond/1/2').then(event => {
            expect(event).to.eql({
                name: 'cond',
                params: {
                    name: 1,
                    cond: 2
                },
                query: {},
                hash: '',
                state: undefined
            });
        });
    });

    it('can match miss conditional', function() {
        return router.match('/cond/1').then(event => {
            expect(event).to.eql({
                name: 'cond',
                params: {
                    name: 1,
                    cond: undefined
                },
                query: {},
                hash: '',
                state: undefined
            });
        });
    });

    it('reverse with params and condition', function() {
        let url = router.reverse('cond', {
            name: 'test',
            cond: 'abc',
            q: 'cde'
        });

        expect(url).to.equal('/cond/test/abc?q=cde');
    });

    it('reverse with params and without condition', function() {
        let url = router.reverse('cond', {
            name: 'test',
            q: 'cde'
        });

        expect(url).to.equal('/cond/test?q=cde');
    });

    it('reverse with empty params and without condition', function() {
        let url = router.reverse('cond', {
            name: 'test',
            q: 'cde',
            q1: '',
            q3: undefined,
            q4: null
        });

        expect(url).to.equal('/cond/test?q=cde');
    });

    it('reverse with params and empty condition', function() {
        let url = router.reverse('cond', {
            name: 'test',
            cond: null,
            q: 'cde'
        });

        expect(url).to.equal('/cond/test?q=cde');
    });

});