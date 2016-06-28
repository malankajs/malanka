import {expect} from 'chai';

import {TemplateNodeBlockHelper} from '../lib/Template/nodes/TemplateNodeBlockHelper';
import {TemplateNodePath} from '../lib/Template/nodes/TemplateNodePath';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';
import {TemplateCompiler} from "../lib/Template/TemplateCompiler";

describe('TemplateNodeBlockHelper', function () {
    let env, compiler;

    beforeEach(function () {
        env = new TemplateEnvironment({
            helpers: {}
        });

        compiler = new TemplateCompiler({
            optimize: {
                plugins: []
            }
        });
    });

    it('compile with context', function () {
        let result = compiler.compileString('{{#test scope="test"}}{{test.abc}}{{/test}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.test.call(context,{"hash":{},"content":function(test){return test.abc}})}');
    });

    it('compile with context several scopes', function () {
        let result = compiler.compileString('{{#test scope="v0"}}{{#test scope="v1"}}{{v0.test}}{{v1.test}}{{/test}}{{/test}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.test.call(context,{"hash":{},"content":function(v0){return context.test.call(context,{"hash":{},"content":function(v1){return __mergeStrings([v0.test,v1.test], context)}})}})}');
    });

    it('compile this', function () {
        let result = compiler.compileString('{{#test scope="v0"}}{{v0}}{{/test}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.test.call(context,{"hash":{},"content":function(v0){return v0}})}');
    });

});