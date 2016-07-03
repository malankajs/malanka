import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';
import {FlattenOptimizer} from './FlattenOptimizer';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeVar} from '../nodes/TemplateNodeVar';
import {TemplateNodeContent} from '../nodes/TemplateNodeContent';
import {TemplateNodeStringProxy} from '../nodes/TemplateNodeStringProxy';
import {TemplateNodeBlockHelper} from '../nodes/TemplateNodeBlockHelper';
import {TemplateNodeAttribute} from "../nodes/TemplateNodeAttribute";

export class StylesOptimizer extends TemplateOptimizerPlugin {

    constructor() {
        super();
        this._flatten = new FlattenOptimizer();
    }

    /**
     * @param {TemplateNodeString} node
     * @param {TemplateNode[]} parents
     *
     * @returns {TemplateNodeString}
     */
    onTemplateNodeString(node, parents) {
        if (this.isClassAttribute(parents)) {
            return this.convertStringNode(node);
        }

        return node;
    }

    /**
     * @param {TemplateNodeContent} node
     * @param {TemplateNode[]} parents
     *
     * @returns {TemplateNodeContent}
     */
    onTemplateNodeContent(node, parents) {
        if (this.isClassAttribute(parents)) {
            node.nodes = node.nodes.map(node => this.convert(node));
        }

        return node;
    }

    /**
     * @param {TemplateNodeStringProxy} node
     * @param {TemplateNode[]} parents
     *
     * @returns {TemplateNodeStringProxy}
     */
    onTemplateNodeStringProxy(node, parents) {
        if (this.isClassAttribute(parents)) {
            node.content = this._flatten.onTemplateNodeContent(this.fromProxy(node.content));
        }

        return node;
    }

    /**
     * @param {TemplateNode[]} parents
     *
     * @returns {boolean}
     */
    isClassAttribute(parents) {
        return parents.some(node => (node instanceof TemplateNodeAttribute) && node.name === 'class');
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
     * @returns {*}
     */
    convertToVar(string, env) {
        if (string.trim() === '') {
            return env.factoryString(string);
        }

        return TemplateNodeVar.factoryFromString('styles.' + string, env);
    }

    /**
     * @param {TemplateNodeStringProxy} proxy
     */
    fromProxy(proxy) {
        let nodes = [];

        proxy.nodes.forEach(node => {
            if (node instanceof TemplateNodeString) {
                nodes.push(this.convertToVars(node.string, proxy.env));
            } else {
                nodes.push(node);
            }
        });

        proxy.nodes = nodes;

        return proxy;
    }

}