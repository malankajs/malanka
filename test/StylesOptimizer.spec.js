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

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":[context.styles.test1," ",context.styles.test2].join(\'\')}})}');
    });

    it('transform class with interpolation', function () {
        let result = compiler.compileString('<div class="test1 {{test}} test2"></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"attributes":{"class":[context.styles.test1,"  ",context.test,"  ",context.styles.test2].join(\'\')}})}');
    });

});