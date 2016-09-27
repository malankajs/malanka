import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {TemplateNodeHashAttribute} from './TemplateNodeHashAttribute';
import {CompiledString} from '../../declarations';

export class TemplateNodeHash extends TemplateNode {
    protected attrs:TemplateNodeHashAttribute[];

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env:TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    public compile():CompiledString {
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
    static factory(node, env:TemplateEnvironment) {
        node.attrs = node.attrs.map(attr => env.factoryHashAttribute(attr));

        return new TemplateNodeHash(node, env);
    }

}
