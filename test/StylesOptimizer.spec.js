import {expect} from 'chai';

import {TemplateCompiler} from '../lib/Template/TemplateCompiler';
import {StylesOptimizer} from '../lib/Template/optimizer/StylesOptimizer';

describe('StylesOptimizer', function () {
    let compiler;

    beforeEach(function () {
        compiler = new TemplateCompiler({
            optimize: {
                plugins: [new StylesOptimizer()]
            }
        });
    });

    it('transform simple class', function () {
        let result = compiler.compileString('<div class="test"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":context.styles.test}})}');
    });

    it('transform two classes', function () {
        let result = compiler.compileString('<div class="test1 test2"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__join(__mergeStrings([context.styles.test1," ",context.styles.test2], context))}})}');
    });

    it('transform class with interpolation', function () {
        let result = compiler.compileString('<div class="test1 {{test}} test2"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__join(__mergeStrings([context.styles.test1," ",context.test," ",context.styles.test2], context))}})}');
    });

    it('transform class with block helpers', function () {
        let result = compiler.compileString('<div class="test1 {{#if test}} test2{{/if}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__join(__mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __join(__mergeStrings([" ",context.styles.test2], context))}})], context))}})}');
    });

    it('transform class with block helpers and var', function () {
        let result = compiler.compileString('<div class="test1 {{#if test}} {{v1}}{{/if}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__join(__mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __join(__mergeStrings([" ",context.v1], context))}})], context))}})}');
    });

    it('transform class with block helpers and watch var', function () {
        let result = compiler.compileString('<div class="test1 {{#if test}} {{@v1}}{{/if}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":(function(v0){return v0.pipe(function(v0){return __join(__mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __join(__mergeStrings([" ",v0], context))}})], context))})})(context.proxy("v1"))}})}');
    });

    it('transform class with helper and string params', function () {
        let result = compiler.compileString('<div class="test1 {{test "abc"}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__join(__mergeStrings([context.styles.test1," ",context.test.call(context,"abc",{"hash":{},"isString":true})], context))}})}');
    });

    it('transform class in helpers', function () {
        let result = compiler.compileString('{{test class="abc"}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.test.call(context,{"hash":{"class":context.styles.abc}})}');
    });

    it('transform class in short if', function() {
        let result = compiler.compileString('<div class="test1 {{test ? "test2" : "test3"}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__join(__mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return context.styles.test2},"inverse":function(){return context.styles.test3}})], context))}})}');
    })

});
