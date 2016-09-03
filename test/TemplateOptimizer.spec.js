import {expect} from 'chai';

import {TemplateNode} from '../lib/Template/nodes/TemplateNode';
import {TemplateNodeVar} from '../lib/Template/nodes/TemplateNodeVar';
import {TemplateNodePath} from '../lib/Template/nodes/TemplateNodePath';
import {TemplateOptimizer} from '../lib/Template/TemplateOptimizer';
import {TemplatePlugin} from '../lib/Template/plugins/TemplatePlugin';

class DummyOptimizer extends TemplatePlugin {
}

class NodeReplaceOptimizer extends TemplatePlugin {

    constructor(node) {
        super();

        this.node = node
    }

    onNode() {
        return this.node;
    }

}

class ModifyVariables extends TemplatePlugin {

    onNode(node) {
        node.onNode = true;
    }

    onTemplateNodeVar(node) {
        node.onTemplateNodeVar = true;
    }

    onTemplateNodePath(node) {
        node.TemplateNodePath = true;
    }

}


describe('TemplateOptimizer', function () {

    it('there are no error, when plugins has no method', function () {
        let optimizer = new TemplateOptimizer({
            plugins: [new DummyOptimizer()]
        });

        let node = new TemplateNode();

        expect(optimizer.optimize(node)).to.equal(node);
    });

    it('can replace node with another', function () {
        let newNode = new TemplateNode(),
            node = new TemplateNode();

        let optimizer = new TemplateOptimizer({
            plugins: [new NodeReplaceOptimizer(newNode)]
        });


        expect(optimizer.optimize(node)).to.equal(newNode);
    });

    it('can modify specific type', function () {
        let node = new TemplateNode(),
            varNode = new TemplateNodeVar({});

        let optimizer = new TemplateOptimizer({
            plugins: [new ModifyVariables()]
        });

        optimizer.optimize(node);
        optimizer.optimize(varNode);

        expect(node.onNode).to.equal(true);
        expect(node.onTemplateNodeVar).to.equal(undefined);

        expect(varNode.onNode).to.equal(true);
        expect(varNode.onTemplateNodeVar).to.equal(true);
    });

    it('can modify inner', function () {
        let node = new TemplateNodeVar({
            path: new TemplateNodePath('test')
        });

        let optimizer = new TemplateOptimizer({
            plugins: [new ModifyVariables()]
        });

        optimizer.optimize(node);

        expect(node.onNode).to.equal(true);
        expect(node.path.TemplateNodePath).to.equal(true);
    });

});
