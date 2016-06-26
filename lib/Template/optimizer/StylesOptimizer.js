import {TemplateOptimizerPlugin} from './TemplateOptimizerPlugin';
import {FlattenOptimizer} from './FlattenOptimizer';

import {TemplateNodeString} from '../nodes/TemplateNodeString';
import {TemplateNodeVar} from '../nodes/TemplateNodeVar';
import {TemplateNodeContent} from '../nodes/TemplateNodeContent';
import {TemplateNodeStringProxy} from '../nodes/TemplateNodeStringProxy';

export class StylesOptimizer extends TemplateOptimizerPlugin {

    constructor() {
        super();
        this._flatten = new FlattenOptimizer();
    }

    onTemplateNodeAttribute(node) {
        if (node.name === 'class') {
            if (node.value instanceof TemplateNodeString) {
                node.value = this.convertToVars(node.value.string, node.env);
            } else if (node.value instanceof TemplateNodeStringProxy) {
                node.value.content = this._flatten.onTemplateNodeContent(this.fromProxy(node.value.content));
            }
        }
    }

    convertToVars(string, env) {
        let classes = string.split(/ +/);

        if (classes.length === 1) {
            return this.convertToVar(string, env);
        } else {
            let parts = [];

            classes.forEach(cls => {
                if (parts.length) {
                    parts.push(env.factoryString(' '));
                }
                parts.push(this.convertToVar(cls, env));
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
        if (string === '') {
            return env.factoryString(' ');
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