import {expect} from 'chai';

import {createCompiler} from './fixtures';
import {Collection} from '../lib/Data/Collection';
import {ValueProxy} from '../lib/Data/ValueProxy';

describe('eachHelper', function () {
    let compiler;

    beforeEach(function () {
        compiler = createCompiler({
            helpers: {
                each: require.resolve('../lib/Runtime/eachHelper')
            }
        });
    });

    it('render array', function () {
        let data = [1, 2, 3];

        let result = compiler.render('{{#each data scope="d"}}<i>{{d}}</i>{{/each}}', {data});

        expect(result).to.equal('<i>1</i><i>2</i><i>3</i>');
    });

    it('render empty array', function () {
        let data = [];

        let result = compiler.render('{{#each data}}content{{else}}inverse{{/each}}', {data});

        expect(result).to.equal('inverse');
    });

    it('render value proxy', function () {
        let proxy = new ValueProxy();
        proxy.emitValue([1, 2, 3]);

        let result = compiler.render('{{#each proxy scope="d"}}{{d}}{{else}}inverse{{/each}}', {proxy});

        expect(result).to.equal('<div><div>1</div><div>2</div><div>3</div></div>');
    });

    it('render value proxy with inner data', function () {
        let proxy = new ValueProxy();
        proxy.emitValue([1, 2, 3]);

        let result = compiler.render('{{#each proxy scope="d"}}<i>{{d}}</i>{{else}}inverse{{/each}}', {proxy});

        expect(result).to.equal('<div><i>1</i><i>2</i><i>3</i></div>');
    });

    it('render value proxy with null data', function () {
        let proxy = new ValueProxy();
        proxy.emitValue([]);

        let result = compiler.render('{{#each proxy scope="d"}}{{d}}{{else}}inverse{{/each}}', {proxy});

        expect(result).to.equal('<div>inverse</div>');
    });

    it('render collection', function () {
        let collection = new Collection([
            {id: 1},
            {id: 2},
            {id: 3}
        ]);

        let result = compiler.render('{{#each collection scope="d"}}{{d.id}}{{else}}inverse{{/each}}', {collection});

        expect(result).to.equal('<div><div>1</div><div>2</div><div>3</div></div>');
    });
});
