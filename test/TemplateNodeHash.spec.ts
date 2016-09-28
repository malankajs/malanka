import {expect} from 'chai';

import {createCompiler} from './fixtures';

describe('TemplateNodeHash', function() {
    let compiler;

    beforeEach(function() {
        compiler = createCompiler();
    });

    it('compile empty hash', function() {
        let data = compiler.compileToString('<div a={}>').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return new Component({"attributes":{"a":{}}})}')
    });

    it('compile hash as attribute', function() {
        let data = compiler.compileToString('<div a={a:1,b:2}>').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return new Component({"attributes":{"a":{"a":1,"b":2}}})}')
    });

    it('compile hash as helper param', function() {
        let data = compiler.compileToString('{{test {a:1,b:2} }}').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return context.test.call(context,{"a":1,"b":2},{"hash":{}})}')
    });

    it('compile hash as helper hash attribute', function() {
        let data = compiler.compileToString('{{test a={a:1,b:2} }}').split('\n').pop();

        expect(data).to.equal('module.exports = function(context){return context.test.call(context,{"hash":{"a":{"a":1,"b":2}}})}')
    });
});
