import {expect} from 'chai';

import {TemplateCompiler} from '../lib/Template/TemplateCompiler';
import {TrimSpacesOptimizer} from '../lib/Template/optimizer/TrimSpacesOptimizer';

describe('TrimSpacesOptimizer', function () {
    let compiler;

    beforeEach(function () {
        compiler = new TemplateCompiler({
            optimize: {
                plugins: [new TrimSpacesOptimizer()]
            }
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

    it('correct compile components separated with space', function () {
        let result = compiler.compileString('<div></div> <div></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return [new Component({}),new Component({})]}');
    });

    it('correct compile components separated with new line', function () {
        let result = compiler.compileString('<div></div> \n <div></div>').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return [new Component({}),new Component({})]}');
    });

    it('correct compile helper with spaces around', function () {
        let result = compiler.compileString(' {{helper 1}} ').split('\n').pop();

        expect(result).to.equal('module.exports = function(context){return context.helper.call(context,1,{"hash":{}})}');
    });
});