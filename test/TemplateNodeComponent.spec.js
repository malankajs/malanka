import {expect} from 'chai';

import {pathFixture} from './fixtures';
import {TemplateNodeComponent} from '../lib/Template/nodes/TemplateNodeComponent';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';

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
        let node = TemplateNodeComponent.factory({name: 'div', attributes: [{name: 'as', value: {type: 'path', path: 'test'}}]}, env);

        expect(node.compile()).to.equal('context.test=new Component({})');
    });

});