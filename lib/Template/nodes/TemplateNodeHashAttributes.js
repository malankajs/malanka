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
            let hash = {};

            this.nodes.forEach(node => {
                Object.assign(hash, node.compileHash());
            });

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