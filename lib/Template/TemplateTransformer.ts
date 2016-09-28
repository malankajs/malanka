import {TemplateNode} from './nodes/TemplateNode';
import {TemplatePlugin} from './plugins/TemplatePlugin';

export class TemplateTransformer {
    protected plugins: TemplatePlugin[];

    /**
     * @param {{}[]} plugins
     */
    constructor({plugins = []} = {}) {
        this.plugins = plugins;
    }

    /**
     * @param {TemplateNode} node
     * @returns {*}
     */
    transform(node) {
        this.invokePlugins('initialize', node, this);

        return this.optimizeNode(node, []);
    }

    /**
     * @param {TemplateNode} node
     * @param {TemplateNode[]} parents
     * @returns {*}
     */
    optimizeNode(node, parents) {
        if (!(node instanceof TemplateNode)) {
            return node;
        }

        node = this.invokePlugins('onNode', node, parents, this);
        node = this.invokePlugins('on' + node.constructor.name, node, parents, this);

        var newParents = [].concat(parents, [node]);

        Object.keys(node).forEach(key => {
            if (node[key] instanceof TemplateNode) {
                node[key] = this.optimizeNode(node[key], newParents);
            }

            if (Array.isArray(node[key])) {
                node[key] = node[key].map(childNode => {
                    return this.optimizeNode(childNode, newParents)
                });
            }
        });

        return node;
    }

    /**
     * @param method
     * @param node
     * @param args
     * @returns {*}
     */
    invokePlugins(method, node, ...args) {
        for (var index = 0; index < this.plugins.length; index++) {
            var plugin = this.plugins[index];

            if (plugin[method]) {
                node = plugin[method](node, ...args) || node;
            }
        }

        return node;
    }

}
