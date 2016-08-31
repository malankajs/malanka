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
                components: {
                    Test: './Test',
                    Test2: './Test2',
                    AsyncComponent: './AsyncComponent'
                },
                optimize: {
                    plugins: []
                },
                define: {
                    is_server: true,
                    is_client: false
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

        describe('events', function() {
            it('compile events', function() {
                let result = compiler.compileString('<div onclick=onClick()></div>').split('\n').pop();

                expect(result).to.equal('module.exports = function(context){return new Component({"events":{"click":context.onClick.bind(context)}})}');
            });

            it('compile events as param', function() {
                let result = compiler.compileString('<div events=events></div>').split('\n').pop();

                expect(result).to.equal('module.exports = function(context){return new Component({"events":context.events})}');
            });

            it('compile events as param and as on event', function() {
                let result = compiler.compileString('<div events=events onclick=onClick()></div>').split('\n').pop();

                expect(result).to.equal('module.exports = function(context){return new Component({"events":Object.assign({},context.events,{"click":context.onClick.bind(context)})})}');
            });

            it('compile events as proxy', function() {
                let result = compiler.compileString('<div onclick=@state.value></div>').split('\n').pop();

                expect(result).to.equal('module.exports = function(context){return new Component({"events":{"click":(function(v0){return v0.emitValue.bind(v0)})(context.proxy("state").proxy("value"))}})}');
            });
        });

        describe('pragma', function() {
            describe('bundle', function() {
                it('compile bundle components', function() {
                    let result = compiler.compileString('<Test #bundle=true></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent({"promise":require("promise?global!./Test")().then(function(bundle){var Test=bundle.Test;return new Test({})})})}');
                });

                it('compile nested bundle components', function() {
                    let result = compiler.compileString('<Test #bundle=true><Test #bundle=true></Test></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent({"promise":require("promise?global!./Test")().then(function(bundle){var Test=bundle.Test;return new Test({"content":new Test({})})})})}');
                });

                it('compile bundle component with nested', function() {
                    let result = compiler.compileString('<Test #bundle=true><Test2></Test2></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent({"promise":require("promise?global!./Test")().then(function(bundle){var Test=bundle.Test;var Test2 = require("./Test2").Test2;return new Test({"content":new Test2({})})})})}');
                });
            });

            describe('async', function() {
                it('compile async components', function() {
                    let result = compiler.compileString('<Test #async="promise"></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent({"promise":function(v0){return Promise.resolve(v0=new Test({})).then(function(){return v0.promise()}).then(function(){return v0})}()})}');
                });

                it('compile async bundle components', function() {
                    let result = compiler.compileString('<Test #bundle=true #async="promise"></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent({"promise":require("promise?global!./Test")().then(function(bundle){var Test=bundle.Test;return function(v0){return Promise.resolve(v0=new Test({})).then(function(){return v0.promise()}).then(function(){return v0})}()})})}');
                });
            });

            describe('match', function() {
                it('compile async components with true match', function() {
                    let result = compiler.compileString('<Test #async="promise" #match="is_server"></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent({"promise":function(v0){return Promise.resolve(v0=new Test({})).then(function(){return v0.promise()}).then(function(){return v0})}()})}');
                });

                it('compile async components with false match', function() {
                    let result = compiler.compileString('<Test #async="promise" #match="is_client"></Test>').split('\n').pop();

                    expect(result).to.equal('module.exports = function(context){return new AsyncComponent()}');
                });
            });
        });
    });
});
