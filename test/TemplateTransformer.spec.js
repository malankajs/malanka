import {expect} from 'chai';

import {TemplateNode} from '../lib/Template/nodes/TemplateNode';
import {TemplateNodeVar} from '../lib/Template/nodes/TemplateNodeVar';
import {TemplateNodePath} from '../lib/Template/nodes/TemplateNodePath';
import {TemplateTransformer} from '../lib/Template/TemplateTransformer';
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


describe('TemplateTransformer', function () {

    it('there are no error, when plugins has no method', function () {
        let transformer = new TemplateTransformer({
            plugins: [new DummyOptimizer()]
        });

        let node = new TemplateNode();

        expect(transformer.transform(node)).to.equal(node);
    });

    it('can replace node with another', function () {
        let newNode = new TemplateNode(),
            node = new TemplateNode();

        let transformer = new TemplateTransformer({
            plugins: [new NodeReplaceOptimizer(newNode)]
        });


        expect(transformer.transform(node)).to.equal(newNode);
    });

    it('can modify specific type', function () {
        let node = new TemplateNode(),
            varNode = new TemplateNodeVar({});

        let transformer = new TemplateTransformer({
            plugins: [new ModifyVariables()]
        });

        transformer.transform(node);
        transformer.transform(varNode);

        expect(node.onNode).to.equal(true);
        expect(node.onTemplateNodeVar).to.equal(undefined);

        expect(varNode.onNode).to.equal(true);
        expect(varNode.onTemplateNodeVar).to.equal(true);
    });

    it('can modify inner', function () {
        let node = new TemplateNodeVar({
            path: new TemplateNodePath('test')
        });

        let transformer = new TemplateTransformer({
            plugins: [new ModifyVariables()]
        });

        transformer.transform(node);

        expect(node.onNode).to.equal(true);
        expect(node.path.TemplateNodePath).to.equal(true);
    });

});
