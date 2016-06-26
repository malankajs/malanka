import {expect} from 'chai';

import {pathFixture} from './fixtures';
import {TemplateNodeAttribute} from '../lib/Template/nodes/TemplateNodeAttribute';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';

describe('TemplateNodeAttribute', function () {
    let env;

    beforeEach(function () {
        env = new TemplateEnvironment({})
    });

    it('compile event', function () {
        let node = TemplateNodeAttribute.factory({name: 'onclick', value: pathFixture('click')}, env);

        expect(node.isEvent()).to.equal(true);
        expect(node.name).to.equal('click');
        expect(node.compileEvent()).to.eql({
            click: 'context.click.bind(context)'
        });
    });

    it('compile watch event', function () {
        let node = TemplateNodeAttribute.factory({name: 'onclick', value: pathFixture('@click')}, env);

        expect(node.isEvent()).to.equal(true);
        expect(node.name).to.equal('click');
        expect(node.compileEvent()).to.eql({
            click: '(function(v0){return v0.emit.bind(v0)})(context.proxy("click"))'
        });
    });

});