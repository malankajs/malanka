import {TemplateNode} from './TemplateNode';

export class TemplateNodeHash extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    compile() {
        let result = {};

        this.attrs.forEach(attr => {
            Object.assign(result, attr.compileHash());
        });

        return this.env.compileHash(result);
    }

    /**
     * @param {{attrs: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHash}
     */
    static factory(node, env) {
        node.attrs = node.attrs.map(attr => env.factoryHashAttribute(attr));

        return new TemplateNodeHash(node, env);
    }

}
