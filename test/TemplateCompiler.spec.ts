import {expect} from 'chai';

import {TemplateTrimSpacesPlugin} from '../lib/Template/plugins/TemplateTrimSpacesPlugin';
import {TemplateCompiler} from '../lib/Template/TemplateCompiler';
import {StringRenderer} from '../lib/Renderer/StringRenderer';
import {Environment} from '../lib/Environment';
import {Component} from '../lib/Components/Component';
import {Model} from '../lib/Data/Model';

let env = new Environment({
    renderer: new StringRenderer()
});

let compile = function (string) {
    let compiler = new TemplateCompiler({
        components: {
            Component: require.resolve('../lib/Components/Component'),
            ValueProxy: require.resolve('../lib/Data/ValueProxy')
        },
        helpers: {
            json: require.resolve('./fixture/json.ts')
        },
        plugins: [
            new TemplateTrimSpacesPlugin()
        ]
    });

    let moduleContent = compiler.compileString(string);

    let module = {exports: null as Function};
    eval(moduleContent);

    return module.exports;
};

let render = function (templateString, context) {
    let template = compile(templateString),
        result = template(context);

    if (Array.isArray(result)) {
        return result.map(component => env.render(component)).join('');
    } else {
        return env.render(result).toString();
    }
};

class TestComponent extends Component {
    helper(arg, hash) {
        return JSON.stringify({arg, hash});
    }
}

describe('Template compiler', function () {
    it('Can compile html', function () {
        var result = render('<div></div>', {});

        expect(result).to.equal('<div></div>');
    });

    it('Can compile html with attributes', function () {
        var result = render('<div class="test"></div>', {});

        expect(result).to.equal('<div class="test"></div>');
    });

    it('Can compile content', function () {
        var result = render('<div>abc</div>', {});

        expect(result).to.equal('<div>abc</div>');
    });

    it('Can compile nestings', function () {
        var result = render('<div><span>hello</span></div>', {});

        expect(result).to.equal('<div><span>hello</span></div>');
    });

    it('Simple interpolation', function () {
        var result = render('<div>{{value}}</div>', {
            value: 'test'
        });

        expect(result).to.equal('<div>test</div>');
    });

    it('Watch interpolation', function () {
        var model = new Model();
        model.set('value', 'test');

        var result = render('<div>{{@model.value}}</div>', new Component({
            model: model
        }));

        expect(result).to.equal('<div>test</div>');
    });

    it('Interpolation in attributes', function () {
        var result = render('<div data-value1=value1 data-value2={{value2}} data-value3="{{value3}}" data-value4="{{value4}}!"></div>', {
            value1: 1,
            value2: 2,
            value3: 3,
            value4: 4
        });

        expect(result).to.equal('<div data-value1="1" data-value2="2" data-value3="3" data-value4="4!"></div>');
    });

    it('Interpolation in content with watch', function () {
        var model = new Model();
        model.set('value', 'test');

        var result = render('<div>!{{@model.value}}!</div>', new Component({
            model
        }));

        expect(result).to.equal('<div>!test!</div>');
    });

    it('Interpolation in attributes with watch', function () {
        var model = new Model();
        model.set('value', 'test');

        var result = render('<div data-id="!{{@model.value}}!"></div>', new Component({
            model
        }));

        expect(result).to.equal('<div data-id="!test!"></div>');
    });

    it('Work with simple helpers', function () {
        var component = new Component({
            test: 1
        });

        var result = render('<div>{{json test v=test}}</div>', component);

        expect(result).to.equal('<div>{"0":1,"1":{"hash":{"v":1}}}</div>');
    });

    it('Work with component helpers', function () {
        var component = new TestComponent({
            test: 1
        });

        var result = render('<div>{{helper test v=test}}</div>', component);

        expect(result).to.equal('<div>{"arg":1,"hash":{"hash":{"v":1}}}</div>');
    });

    it('Work with watch params helpers', function () {
        var result = render('<div>{{json @test}}</div>', new Component({
            test: 1
        }));

        expect(result).to.equal('<div>{"0":1,"1":{"hash":{}}}</div>');
    });

    it('Work with watch params helpers', function () {
        var component = new TestComponent({
            test: 1
        });

        var result = render('<div>{{helper test v=test}}</div>', component);

        expect(result).to.equal('<div>{"arg":1,"hash":{"hash":{"v":1}}}</div>');
    });

    it('Block helper', function () {
        var component = new TestComponent({
            test: 1
        });

        component.helper = function (options) {
            return options.content();
        };

        var result = render('<div>{{#helper}}test{{/helper}}</div>', component);

        expect(result).to.equal('<div>test</div>');
    });

    it('Block helper in attribute', function () {
        var model = new Model();
        model.set('value', 'test');

        var component = new TestComponent({model});

        component.helper = function (value, options) {
            if (value) {
                return options.content();
            }
        };

        var result = render('<div class="test {{#helper @model.value}}test2{{/helper}}"></div>', component);

        expect(result).to.equal('<div class="test test2"></div>');
    });

    it('Optimize spaces', function () {
        var model = new Model();
        model.set('value', 'test');

        var component = new Component({model});
        var result = render('<div>\n<span>   {{@model.value}}   </span>\n</div>', component);

        expect(result).to.equal('<div><span>test</span></div>');
    });

    it('Compile void elements', function () {
        var component = new Component();
        var result = render('<br><input>', component);

        expect(result).to.equal('<br><input>');
    });
});
