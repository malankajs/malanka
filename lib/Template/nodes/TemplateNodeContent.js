import {TemplateNode} from './TemplateNode';
import {TemplateNodeHelper} from './TemplateNodeHelper';
import {TemplateNodeString} from './TemplateNodeString';
import {TemplateNodeVar} from './TemplateNodeVar';
import {TemplateNodeStringProxy} from './TemplateNodeStringProxy';

export class TemplateNodeContent extends TemplateNode {

    /**
     * @param {TemplateNode[]} nodes
     * @param {boolean} merged
     * @param {TemplateEnvironment} env
     */
    constructor(nodes, env, {merged = false} = {}) {
        super(env);

        this.nodes = nodes;
        this.merged = merged;
    }

    /**
     * @returns {string}
     */
    compile() {
        let outputArray = this.mergeNodes().map(node => node.compile());

        if (outputArray.length === 1) {
            return outputArray[0];
        }

        return this.flatten(`[${outputArray.join(',')}]`);
    }

    /**
     * @param {string} content
     * @returns {*}
     */
    flatten(content) {
        let hasHelpers = this.nodes.find(node => node instanceof TemplateNodeHelper);

        if (hasHelpers) {
            return `[].concat.apply([], ${content})`;
        } else {
            return content;
        }
    }

    mergeNodes() {
        return this.nodes;
        if (!this.nodes.length || this.merged) {
            return this.nodes;
        }

        let nodes = [],
            queue = [];

        let flushQueue = () => {
            let resultNode;

            console.log('LENGTH', queue.length);
            console.log(queue);
            if (queue.length === 1) {
                resultNode = queue[0];
            } else if (queue.length > 0) {
                resultNode = new TemplateNodeStringProxy(
                    new TemplateNodeContent(queue, queue[0].env, {merged: true}),
                    queue[0].env
                );
            }

            if (resultNode) {
                nodes.push(resultNode);
            }

            queue = [];
        };

        let pushQueue = (node) => {
            let last = queue[queue.length - 1];

            if (queue.length && node instanceof TemplateNodeString && last instanceof TemplateNodeString) {
                last.string += node.string;
            } else {
                queue.push(node);
            }
        };

        for (var index = 0; index < this.nodes.length; index++) {
            let node = this.nodes[index];

            if (node instanceof TemplateNodeString || (node instanceof TemplateNodeVar && !(node instanceof TemplateNodeHelper))) {
                pushQueue(node)
            } else {
                flushQueue();
                nodes.push(node);
            }
        }

        flushQueue();

        if (nodes.length === 1 && nodes[0] instanceof TemplateNodeStringProxy) {
            console.log(nodes[0]);
            console.log(nodes[0].content.nodes);
        }

        return nodes;
    }

    /**
     * @param {{type: string}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeContent}
     */
    static factory(nodes, env) {
        return new TemplateNodeContent(env.factoryNodes(nodes, env), env);
    }

}