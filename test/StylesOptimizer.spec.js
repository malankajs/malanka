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

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__mergeStrings([context.styles.test1," ",context.styles.test2], context).join(\'\')}})}');
    });

    it('transform class with interpolation', function () {
        let result = compiler.compileString('<div class="test1 {{test}} test2"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__mergeStrings([context.styles.test1," ",context.test," ",context.styles.test2], context).join(\'\')}})}');
    });

    it('transform class with block helpers', function () {
        let result = compiler.compileString('<div class="test1 {{#if test}} test2{{/if}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __mergeStrings([" ",context.styles.test2], context).join(\'\')}})], context).join(\'\')}})}');
    });

    it('transform class with block helpers', function () {
        let result = compiler.compileString('<div class="test1 {{#if test}} {{v1}}{{/if}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":__mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __mergeStrings([" ",context.v1], context)}})], context).join(\'\')}})}');
    });

    it('transform class with block helpers', function () {
        let result = compiler.compileString('<div class="test1 {{#if test}} {{@v1}}{{/if}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":(function(v0){return v0.mutate(function(){return __mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __mergeStrings([" ",v0], context)}})], context).join(\'\')})})(context.proxy("v1"))}})}');
    });

    it('transform class with helper and string params', function () {
        let result = compiler.compileString('<div class="test1 {{test "abc"}}"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":(function(v0){return v0.mutate(function(){return __mergeStrings([context.styles.test1," ",context.if.call(context,context.test,{"hash":{},"isString":true,"content":function(){return __mergeStrings([" ",v0], context)}})], context).join(\'\')})})(context.proxy("v1"))}})}');
    });

});