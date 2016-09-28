import {expect} from 'chai';

import {TemplateNode} from '../lib/Template/nodes/TemplateNode';
import {TemplateNodeVar} from '../lib/Template/nodes/TemplateNodeVar';
import {TemplateNodePath} from '../lib/Template/nodes/TemplateNodePath';
import {TemplateTransformer} from '../lib/Template/TemplateTransformer';
import {TemplatePlugin} from '../lib/Template/plugins/TemplatePlugin';

class DummyOptimizer extends TemplatePlugin {
}

class NodeReplaceOptimizer extends TemplatePlugin {
    public node:any;

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

interface TestNode extends TemplateNodePath {
    path:TestNode;
    onNode:boolean;
    onTemplateNodeVar:boolean;
    TemplateNodePath: boolean;
}


describe('TemplateTransformer', function () {

    it('there are no error, when plugins has no method', function () {
        let transformer = new TemplateTransformer({
            plugins: [new DummyOptimizer()]
        });

        let node = new TemplateNode(null);

        expect(transformer.transform(node)).to.equal(node);
    });

    it('can replace node with another', function () {
        let newNode = new TemplateNode(null),
            node = new TemplateNode(null);

        let transformer = new TemplateTransformer({
            plugins: [new NodeReplaceOptimizer(newNode)]
        });


        expect(transformer.transform(node)).to.equal(newNode);
    });

    it('can modify specific type', function () {
        let node = new TemplateNode(null) as TestNode,
            varNode = new TemplateNodeVar({path: null}, null) as TestNode;

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
            path: new TemplateNodePath('test', null)
        }, null) as TestNode;

        let transformer = new TemplateTransformer({
            plugins: [new ModifyVariables()]
        });

        transformer.transform(node);

        expect(node.onNode).to.equal(true);
        expect(node.path.TemplateNodePath).to.equal(true);
    });

});
