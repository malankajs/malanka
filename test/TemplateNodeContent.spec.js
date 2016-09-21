import {expect} from 'chai';

import {pathFixture} from './fixtures';
import {TemplateNodeContent} from '../lib/Template/nodes/TemplateNodeContent';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';

describe('TemplateNodeContent', function () {
    let env;

    beforeEach(function () {
        env = new TemplateEnvironment({})
    });

    it('transform string literals', function () {
        let ast = [
            'test',
            'test2'
        ];

        let node = TemplateNodeContent.factory(ast, env);

        expect(node.compile()).to.equal('"testtest2"');
    });

    it('strip comments', function () {
        let ast = [
            'test',
            {type: 'Comment', content: '123'},
            'test2'
        ];

        let node = TemplateNodeContent.factory(ast, env);

        expect(node.compile()).to.equal('"testtest2"');
    });

});
