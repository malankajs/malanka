import {TemplateNodeVar} from './TemplateNodeVar';

export class TemplateNodeHelper extends TemplateNodeVar {

    /**
     * @returns {string}
     */
    compile() {
        let helperName = this.env.resolveHelper(this.path.string),
            args = ['context'],
            context = this.hash.getContext(),
            scope = this.hash.getScope();

        args = args.concat(this.params.map(param => param.compile()));

        args.push(this.env.compileHash(this.compileOptions()));

        return `${context ? context.compile() + '=' : ''}${helperName}.call(${args.join(',')})`;
    }

    /**
     * @returns {{hash: string}}
     */
    compileOptions() {
        var hash = {
            hash: this.env.compileHash(this.hash.compileHash())
        };

        if (this.env.scopeValue('isString')) {
            hash.isString = true;
        }

        return hash;
    }

    /**
     * @param {{params: [], hash: []}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHelper}
     */
    static factory(node, env) {
        node.params = node.params.map(param => env.factory(param || []));
        node.hash = env.factoryHashAttributes(node.hash || []);

        return new TemplateNodeHelper(node, env);
    }

}