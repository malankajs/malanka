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
    
            this.nodes.forEach(({name, value}) => {
                hash[name] = value.compile();
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
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHashAttributes}
     */
    static factory(nodes, env) {
        nodes = nodes.map(({name, value}) => {
            return {
                name,
                value: env.factory(value)
            }
        });

        return new TemplateNodeHashAttributes(nodes, env);
    }

}