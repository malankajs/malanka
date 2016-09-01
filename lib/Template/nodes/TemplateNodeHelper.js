import {TemplateNodeVar} from './TemplateNodeVar';

export class TemplateNodeHelper extends TemplateNodeVar {

    /**
     * @returns {string}
     */
    compile() {
        let helperName = this.env.resolveHelper(this.path.string),
            args = ['context'],
            context = this.hash.getContext();

        args = args.concat(this.compileArgs());

        args.push(this.env.compileHash(this.compileOptions()));

        return `${context ? context.compile() + '=' : ''}${helperName}.call(${args.join(',')})`;
    }

    /**
     * @returns {{watchers: {}}}
     */
    compileArgs() {
        return this.env.scope({isString: true}, () => {
            return this.params.map(param => param.compile());
        });
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
