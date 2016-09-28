import {expect} from 'chai';

import {TemplateNodeBlockHelper} from '../lib/Template/nodes/TemplateNodeBlockHelper';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';
import {TemplateCompiler} from "../lib/Template/TemplateCompiler";

describe('TemplateNodeBlockHelper', function () {
    let env, compiler;

    beforeEach(function () {
        env = new TemplateEnvironment({
            helpers: {}
        });

        compiler = new TemplateCompiler();
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

    it('compile short if', function () {
        let result = compiler.compileString('{{test ? 1 : 2}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.if.call(context,context.test,{"hash":{},"content":function(){return 1},"inverse":function(){return 2}})}');
    });

    it('compile short if without then', function () {
        let result = compiler.compileString('{{test ?: 2}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.if.call(context,context.test,{"hash":{},"content":function(){return context.test},"inverse":function(){return 2}})}');
    });

    it('compile short if without else', function () {
        let result = compiler.compileString('{{test ? 1}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.if.call(context,context.test,{"hash":{},"content":function(){return 1}})}');
    });

    it('compile short if inlined', function () {
        let result = compiler.compileString('{{test (param ? 1 : 2)}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.test.call(context,context.if.call(context,context.param,{"hash":{},"isString":true,"content":function(){return 1},"inverse":function(){return 2}}),{"hash":{}})}');
    });

    it('compile short if without then and watch variable', function () {
        let result = compiler.compileString('{{@test ?: 2}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.if.call(context,context.proxy("test"),{"hash":{},"content":function(){return context.proxy("test")},"inverse":function(){return 2}})}');
    });

    it('compile short if inlined with interpolation', function () {
        let result = compiler.compileString('{{test (param ? "test:{{param}}")}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.test.call(context,context.if.call(context,context.param,{"hash":{},"isString":true,"content":function(){return __join(__mergeStrings(["test:",context.param], context))}}),{"hash":{}})}');
    });
});
