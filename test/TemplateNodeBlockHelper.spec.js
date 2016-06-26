import {expect} from 'chai';

import {pathFixture} from './fixtures';
import {TemplateNodeBlockHelper} from '../lib/Template/nodes/TemplateNodeBlockHelper';
import {TemplateNodePath} from '../lib/Template/nodes/TemplateNodePath';
import {TemplateNodeVar} from '../lib/Template/nodes/TemplateNodeVar';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';

describe('TemplateNodeBlockHelper', function () {
    let env;

    beforeEach(function () {
        env = new TemplateEnvironment({
            helpers: {}
        })
    });

    it('compile with context', function () {
        let ast = {
            path: new TemplateNodePath('test', env),
            content: [
                {
                    type: 'path',
                    value: 'this.test'
                }
            ]
        };

        let node = TemplateNodeBlockHelper.factory(ast, env);

        expect(node.compile()).to.equal('context.test.call(context,{"hash":{},"content":function(v0){return v0.test;}})');
    });

    it('compile with context several scopes', function () {
        let ast = {
            path: new TemplateNodePath('test', env),
            content: [
                {
                    type: 'BlockExpression',
                    path: 'test',
                    content: [
                        {
                            type: 'path',
                            value: 'this.test'
                        },
                        {
                            type: 'path',
                            value: 'this.this.test'
                        }
                    ]
                }
            ]
        };

        let node = TemplateNodeBlockHelper.factory(ast, env);

        expect(node.compile()).to.equal('context.test.call(context,{"hash":{},"content":function(v0){return context.test.call(context,{"hash":{},"content":function(v1){return [v1.test,v0.test];}});}})');
    });

    it('compile this', function () {
        let ast = {
            path: new TemplateNodePath('test', env),
            content: [
                {
                    type: 'BlockExpression',
                    path: 'test',
                    content: [
                        {
                            type: 'path',
                            value: 'this'
                        },
                        {
                            type: 'path',
                            value: 'this.this'
                        }
                    ]
                }
            ]
        };

        let node = TemplateNodeBlockHelper.factory(ast, env);

        expect(node.compile()).to.equal('context.test.call(context,{"hash":{},"content":function(v0){return context.test.call(context,{"hash":{},"content":function(v1){return [v1,v0];}});}})');
    });

});