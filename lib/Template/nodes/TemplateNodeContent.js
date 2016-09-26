import {TemplateNode} from './TemplateNode';
import {TemplateNodeEscapedString} from './TemplateNodeEscapedString';
import {TemplateNodeString} from './TemplateNodeString';
import {TemplateNodeStringProxy} from './TemplateNodeStringProxy';
import {TemplateNodeComment} from './TemplateNodeComment';
import {TemplateNodeComponent} from "./TemplateNodeComponent";

export class TemplateNodeContent extends TemplateNode {

    /**
     * @param {TemplateNode[]} nodes
     * @param {TemplateEnvironment} env
     * @param {boolean} merged
     */
    constructor(nodes, env, {merged = false} = {}) {
        super(env);

        this.nodes = nodes;
        this.merged = merged;
    }

    /**
     * @returns {string}
     */
    compile(options) {
        let mergeNodes = this.mergeNodes(options),
            outputArray = this.env.compileNodes(mergeNodes),
            isArray = true;

        if (outputArray.length === 0) {
            return this.env.factoryCompiled('""', {
                length: 0,
                isArray: false
            });
        }

        if (outputArray.length === 1) {
            return outputArray[0];
        }

        let isKnownOutput = mergeNodes.every(node => {
            return node instanceof TemplateNodeComponent ||
                node instanceof TemplateNodeString ||
                node instanceof TemplateNodeEscapedString
        });

        let output = `[${outputArray.join(',')}]`;

        if (!isKnownOutput) {
            output = this.flatten(output);
        }

        if (this.env.scopeValue('isString')) {
            output = this.joinStrings(output);
            isArray = false;
        }

        return this.env.factoryCompiled(output, {
            length: outputArray.length,
            isArray
        });
    }

    /**
     * @param {string} content
     * @returns {*}
     */
    flatten(content) {
        let func = this.env.resolveRuntime('mergeStrings');

        return `${func}(${content}, context)`;
    }

    /**
     * @param {string} content
     * @returns {*}
     */
    joinStrings(content) {
        let func = this.env.resolveRuntime('join');

        return `${func}(${content})`;
    }

    mergeNodes() {
        // return this.nodes;
        if (!this.nodes.length || this.merged) {
            return this.nodes;
        }

        let nodes = [],
            queue = [];

        let flushQueue = () => {
            let resultNode;

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

            if (node instanceof TemplateNodeString) {
                pushQueue(node)
            } else if (node instanceof TemplateNodeComment) {

            } else {
                flushQueue();
                nodes.push(node);
            }
        }

        flushQueue();

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
