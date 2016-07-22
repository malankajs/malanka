import {TemplateNode} from './TemplateNode';

export class TemplateNodeHashAttribute extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {{}}
     */
    compileHash() {
        let {name, value} = this;

        if (name !== 'as' && name !== 'scope') {
            return {
                [name]: value.compile()
            };
        } else {
            return {};
        }
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHashAttribute}
     */
    static factory(node, env) {
        node.value = node.value.length === 1 ?
            env.factory(node.value[0]) :
            env.factory(node.value);

        return new TemplateNodeHashAttribute(node, env);
    }

}