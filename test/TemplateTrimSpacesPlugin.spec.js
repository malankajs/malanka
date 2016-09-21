import {expect} from 'chai';

import {TemplateCompiler} from '../lib/Template/TemplateCompiler';
import {TemplateTrimSpacesPlugin} from '../lib/Template/plugins/TemplateTrimSpacesPlugin';

describe('TemplateTrimSpacesPlugin', function () {
    let compiler;

    beforeEach(function () {
        compiler = new TemplateCompiler({
            plugins: [new TemplateTrimSpacesPlugin()]
        });
    });

    it('correct compile just component', function () {
        let result = compiler.compileString('<div></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({})}');
    });

    it('correct compile component with spaces around', function () {
        let result = compiler.compileString(' <div></div> ').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({})}');
    });

    it('correct compile component with spaces inside', function () {
        let result = compiler.compileString('<div>   </div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"content":" "})}');
    });

    it('correct compile component with spaces around in component', function () {
        let result = compiler.compileString('<div> <div></div> </div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return new Component({"content":new Component({})})}');
    });

    it('correct compile Components separated with space', function () {
        let result = compiler.compileString('<div></div> <div></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return [new Component({}),new Component({})]}');
    });

    it('correct compile Components separated with new line', function () {
        let result = compiler.compileString('<div></div> \n <div></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return [new Component({}),new Component({})]}');
    });

    it('correct compile helper with spaces around', function () {
        let result = compiler.compileString(' {{helper 1}} ').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.helper.call(context,1,{"hash":{}})}');
    });

    it('don\'t transform escaped string', function () {
        let result = compiler.compileString(' `1\n<br>` ').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return "1\\n<br>"}');
    });

    it('don\'t transform escaped string', function () {
        let result = compiler.compileString(' `1\n<br>` ').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return "1\\n<br>"}');
    });
});
