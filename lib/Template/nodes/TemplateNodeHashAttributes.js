import {TemplateNode} from './TemplateNode';

export class TemplateNodeHashAttributes extends TemplateNode {

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     */
    constructor(nodes, env) {
        super(env);

        this.nodes = nodes;
    }

    /**
     * @returns {{}}
     */
    compileHash() {
        return this.env.scope({isString: true}, () => {
            let hash = {}, events = {};

            this.nodes.forEach(attr => {
                if (attr.isEvent()) {
                    Object.assign(events, attr.compileEvent());
                } else {
                    Object.assign(hash, attr.compileHash());
                }
            });

            if (Object.keys(events).length) {
                hash.events = this.env.compileHash(events);
            }

            return hash;
        });
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return !this.nodes.length;
    }

    /**
     * @returns {TemplateNodeExpression}
     */
    getContext() {
        let context = this.nodes.find(node => node.name === 'as');

        if (context) {
            return context.value;
        }
    }

    /**
     * @returns {TemplateNodeExpression}
     */
    getScope() {
        let scope = this.nodes.find(node => node.name === 'scope');

        if (scope) {
            return scope.value;
        }
    }

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHashAttributes}
     */
    static factory(nodes, env) {
        nodes = nodes.map(node => env.factoryHashAttribute(node));

        return new TemplateNodeHashAttributes(nodes, env);
    }

}