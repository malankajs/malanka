import {expect} from 'chai';

import {TemplateNodeHelper} from '../lib/Template/nodes/TemplateNodeHelper';

import {createCompiler} from './fixtures';

describe('TemplateNodeHelper', function() {
    let compiler;

    beforeEach(function() {
        compiler = createCompiler();
    });

    it('compile helper with param interpolation', function() {
        let template = compiler.compileToString('{{test "test1:{{test1}}"}}').split('\n').pop();

        expect(template).to.eql('module.exports = function(context){return context.test.call(context,__join(__mergeStrings(["test1:",context.test1], context)),{"hash":{}})}');
    });

    it('compile helper with hash interpolation', function() {
        let template = compiler.compileToString('{{test abc="test1:{{test1}}"}}').split('\n').pop();

        expect(template).to.eql('module.exports = function(context){return context.test.call(context,{"hash":{"abc":__join(__mergeStrings(["test1:",context.test1], context))}})}');
    });
});
