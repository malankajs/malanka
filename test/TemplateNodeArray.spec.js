import {expect} from 'chai';

import {createCompiler} from './fixtures';

describe('TemplateNodeArray', function() {
    let compiler;

    beforeEach(function() {
        compiler = createCompiler();
    });

    it('compile empty array', function() {
        let data = compiler.compileToString('<div a=[]>').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return new Component({"attributes":{"a":[]}})}')
    });

    it('compile array as attribute', function() {
        let data = compiler.compileToString('<div a=[1,2,3]>').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return new Component({"attributes":{"a":[1,2,3]}})}')
    });

    it('compile array as helper param', function() {
        let data = compiler.compileToString('{{test [1,2,3]}}').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return context.test.call(context,[1,2,3],{"hash":{}})}')
    });

    it('compile array as helper hash attribute', function() {
        let data = compiler.compileToString('{{test a=[1,2,3]}}').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return context.test.call(context,{"hash":{"a":[1,2,3]}})}')
    });
});
