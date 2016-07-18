import {expect} from 'chai';

import {Component} from '../lib/Component';
import {StringRenderer} from '../lib/Renderer/StringRenderer';
import {Environment} from '../lib/Environment';

describe('Component', function () {
    let env;

    beforeEach(function () {
        env = new Environment({
            renderer: new StringRenderer()
        });
    });

    it('can render without options', function () {
        expect(env.render(new Component()).toString())
            .to.equal('<div></div>');
    });

    it('can render with options', function () {
        expect(env.render(new Component({tagName: 'span', attributes: {id: 'test'}})).toString())
            .to.equal('<span id="test"></span>');
    });

    it('can render className', function () {
        expect(env.render(new Component({className: 'test'})).toString())
            .to.equal('<div class="test"></div>');
    });

    it('can render content', function () {
        expect(env.render(new Component({content: 'test'})).toString())
            .to.equal('<div>test</div>');
    });

});