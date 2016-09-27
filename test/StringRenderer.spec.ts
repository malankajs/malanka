import {expect} from 'chai';

import {StringRenderer, StringNode} from '../lib/Renderer/StringRenderer';

describe('StringRender', function () {
    let renderer;

    beforeEach(function () {
        renderer = new StringRenderer();
    });

    it('should render tagName', function () {
        let node = renderer.createElement('span');

        expect(node.toString()).to.equal('<span></span>');
    });

    it('should render tagName with attributes', function () {
        let node = renderer.createElement('span');
        renderer.setAttribute(node, 'class', 'test');

        expect(node.toString()).to.equal('<span class="test"></span>');
    });

    it('should render static content', function() {
        let node = renderer.createElement('span');
        renderer.setContent(node, 'test');

        expect(node.toString()).to.equal('<span>test</span>');
    });

    it('should render children', function() {
        let node = renderer.createElement('span');
        renderer.append(node, renderer.createElement('i'));
        renderer.append(node, renderer.createElement('b'));

        expect(node.toString()).to.equal('<span><i></i><b></b></span>');
    });


});