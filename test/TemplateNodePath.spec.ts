import {expect} from 'chai';

import {createCompiler} from './fixtures';
import {TemplateEnvironment} from '../lib/Template/TemplateEnvironment';
import {TemplateNodePath} from '../lib/Template/nodes/TemplateNodePath';

describe('TemplateNodePath', function() {
    let env = new TemplateEnvironment({});

    it('compile string path', function() {
        let path = TemplateNodePath.factory('test', env);

        expect(path.compile()).to.equal('context.test');
    });

    it('compile string path with not valid parts', function() {
        let path = TemplateNodePath.factory('test-abc', env);

        expect(path.compile()).to.equal('context["test-abc"]');
    });

    it('compile string path with not valid parts in field', function() {
        let path = TemplateNodePath.factory('abc.test-abc', env);

        expect(path.compile()).to.equal('context.abc["test-abc"]');
    });
});
