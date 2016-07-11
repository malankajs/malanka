import {expect} from 'chai';

import {pathFixture} from './fixtures';
import {TemplateNodeCallExpression} from '../lib/Template/nodes/TemplateNodeCallExpression';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';

describe('TemplateNodeCallExpression', function () {
    let env;

    beforeEach(function () {
        env = new TemplateEnvironment({})
    });

    it('compile empty call', function () {
        let node = TemplateNodeCallExpression.factory({
            "params": [],
            "path": "onClick",
            "type": "CallExpression"
        }, env);

        expect(node.compile()).to.eql('context.onClick.bind(context)');
    });

    it('compile call with params', function () {
        let node = TemplateNodeCallExpression.factory({
            "params": [{
                "path": "test",
                "type": "Path"
            }],
            "path": "onClick",
            "type": "CallExpression"
        }, env);

        expect(node.compile()).to.eql('context.onClick.bind(context,context.test)');
    });

});