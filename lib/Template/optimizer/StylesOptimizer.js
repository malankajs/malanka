import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeVar} from '../nodes/TemplateNodeVar';
import {TemplateNodeContent} from '../nodes/TemplateNodeContent';
import {TemplateNodeStringProxy} from '../nodes/TemplateNodeStringProxy';
import {TemplateNodeBlockHelper} from '../nodes/TemplateNodeBlockHelper';
import {TemplateNodeAttribute} from '../nodes/TemplateNodeAttribute';
import {TemplateNodeHelper} from '../nodes/TemplateNodeHelper';

export class StylesOptimizer extends TemplateOptimizerPlugin {

    /**
     * @param {TemplateNodeAttribute} node
     *
     * @returns {TemplateNodeAttribute}
     */
    onTemplateNodeAttribute(node) {
        if (node.name === 'class') {
            node.value = this.convert(node.value);
        }

        return node;
    }

    /**
     * @param {TemplateNode} node
     *
     * @returns {TemplateNode}
     */
    convert(node) {
        if (node instanceof TemplateNodeString) {
            return this.convertStringNode(node);
        }

        if (node instanceof TemplateNodeStringProxy) {
            return this.convertProxyNode(node);
        }


        if (node instanceof TemplateNodeContent) {
            return this.convertContentNode(node);
        }

        if (node instanceof TemplateNodeBlockHelper) {
            return this.convertBlockHelperNode(node);
        }

        return node;
    }

    /**
     * @param {TemplateNodeString} node
     *
     * @returns {TemplateNodeString}
     */
    convertStringNode(node) {
        if (node.string.trim() === '') {
            return node;
        }

        return this.convertToVars(node.string, node.env);
    }

    /**
     * @param {TemplateNodeStringProxy} proxy
     *
     * @returns {TemplateNodeStringProxy}
     */
    convertProxyNode(proxy) {
        let content = [];

        this.convert(proxy.content).nodes.forEach(node => {
            if (node instanceof TemplateNodeStringProxy) {
                content = content.concat(node.content.nodes);
            } else {
                content.push(node);
            }
        });

        proxy.content.nodes = content;

        return proxy;
    }

    /**
     * @param {TemplateNodeStringProxy} node
     *
     * @returns {TemplateNodeStringProxy}
     */
    convertContentNode(node) {
        node.nodes = node.nodes.map(node => this.convert(node));

        return node;
    }

    /**
     * @param {TemplateNodeBlockHelper} node
     *
     * @returns {TemplateNodeBlockHelper}
     */
    convertBlockHelperNode(node) {
        if (node.content) {
            node.content = this.convert(node.content);
        }

        if (node.inverse) {
            node.inverse = this.convert(node.inverse);
        }

        return node;
    }

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     * 
     * @returns {TemplateNodeStringProxy}
     */
    convertToVars(string, env) {
        let classes = string.match(/(\s+|\S+)/g);

        if (classes.length === 1) {
            return this.convertToVar(string, env);
        } else {
            let parts = [];

            classes.forEach(cls => {
                if (cls.trim().length) {
                    parts.push(this.convertToVar(cls, env));
                } else {
                    parts.push(env.factoryString(' '));
                }
            });

            return new TemplateNodeStringProxy(new TemplateNodeContent(parts, env), env);
        }
    }

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeVar|TemplateNodeString}
     */
    convertToVar(string, env) {
        if (string.trim() === '') {
            return env.factoryString(string);
        }

        return TemplateNodeVar.factoryFromString('styles.' + string, env);
    }

}