import {expect} from 'chai';

import {TemplateNodeComponent} from '../lib/Template/nodes/TemplateNodeComponent';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';
import {TemplateCompiler} from '../lib/Template/TemplateCompiler';

describe('TemplateNodeComponent', function () {
    let env;

    beforeEach(function () {
        env = new TemplateEnvironment({})
    });

    it('compile simple component', function () {
        let node = TemplateNodeComponent.factory({name: 'div'}, env);

        expect(node.compile()).to.equal('new Component({})');
    });

    it('compile simple component with attributes', function () {
        let node = TemplateNodeComponent.factory({name: 'div', attributes: [{name: 'class', value: 'test'}]}, env);

        expect(node.compile()).to.equal('new Component({"attributes":{"class":"test"}})');
    });

    it('compile `as` statement', function () {
        let node = TemplateNodeComponent.factory({name: 'div', attributes: [{name: 'as', value: {type: 'Path', path: 'test'}}]}, env);

        expect(node.compile()).to.equal('context.test=new Component({})');
    });

    describe('with compiler', function() {
        let compiler;

        beforeEach(function(){
            compiler = new TemplateCompiler({
                optimize: {
                    plugins: []
                }
            });
        });

        it('compile scope', function() {
            let result = compiler.compileString('<div scope="scope"><div>{{scope.test}}</div></div>').split('\n').pop();

            expect(result).to.equal('module.exports = function(context){return new Component({"content":function(scope){return new Component({"content":scope.test})}})}');
        });

        it('compile scope region', function() {
            let result = compiler.compileString('<div scope="scope"><div as=scope.test></div></div>').split('\n').pop();

            expect(result).to.equal('module.exports = function(context){return new Component({"content":function(scope){return scope.test=new Component({})}})}');
        });

    });

});