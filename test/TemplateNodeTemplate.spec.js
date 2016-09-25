import {expect} from 'chai';

import {createCompiler} from './fixtures';
import {Collection} from '../lib/Data/Collection';
import {ValueProxy} from '../lib/Data/ValueProxy';

describe('TemplateNodeTemplate', function () {
    let compiler;

    beforeEach(function () {
        compiler = createCompiler({
        });
    });

    it('render template', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}}');

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return ""}');
    });

    it('render template variables', function () {
        let result = compiler.compileToString('{{#> tpl}}{{test}} {{tpl.test}}{{/tpl}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return __mergeStrings([context.test," ",tpl.test], context)};return ""}');
    });

    it('template usage', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{test tpl}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return context.test.call(context,v0,{"hash":{}})}');
    });

    it('template usage as helper', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{tpl {} }}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0({})}');
    });

    it('template usage as helper with several params ', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{tpl {a:1} {b:2} }}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0({"a":1,"b":2})}');
    });

    it('template usage as helper with several params and var', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{tpl {a:1} test {b:2} }}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0(Object.assign({"a":1},context.test,{"b":2}))}');
    });

    it('template usage as helper with several params and var', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{tpl test {b:2} }}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0(Object.assign({},context.test,{"b":2}))}');
    });

    it('template usage as helper with hash', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{tpl test=1}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0({"test":1})}');
    });

    it('template usage as helper with hash and param', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{tpl {a:1} test=1}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0({"a":1,"test":1})}');
    });

    it('template usage as block helper', function () {
        let result = compiler.compileToString('{{#> tpl}}test{{/tpl}} {{#tpl {a:1} }}test{{/tpl}}').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){var v0=function(tpl){return "test"};return v0({"a":1,"content":"test"})}');
    });

});
