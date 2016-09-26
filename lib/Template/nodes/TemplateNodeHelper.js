import {TemplateNodeVar} from './TemplateNodeVar';

export class TemplateNodeHelper extends TemplateNodeVar {

    /**
     * @returns {string}
     */
    compile() {
        let helperName = this.env.resolveHelper(this.path.string),
            template = this.path.isTemplate();

        if (template) {
            let context = this.optimizeContext(this.compileTemplateContext());

            if (context.length === 1) {
                context = context[0];
            } else if (context.length === 0) {
                context = '{}';
            } else {
                if (context[0].hash) {
                    context = `Object.assign(${context.join(',')})`;
                } else {
                    context = `Object.assign({},${context.join(',')})`;
                }
            }

            return `${this.path.compile()}(${context})`
        } else {
            let args = ['context'],
                context = this.hash.getContext();

            args = args.concat(this.compileArgs());

            args.push(this.env.compileHash(this.compileOptions()));

            return `${context ? context.compile() + '=' : ''}${helperName}.call(${args.join(',')})`;
        }
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
     * @returns {[]}
     */
    compileTemplateContext() {
        let context = [];

        if (this.params.length === 1) {
            context = [ this.params[0].compile() ];
        } else {
            context = this.params.map(param => param.compile());
        }

        let hash = this.hash.compileHash();

        if (Object.keys(hash).length) {
            context.push(this.env.compileHash(hash));
        }

        return context;
    }

    /**
     * @param {[]} context
     * @returns {[]}
     */
    optimizeContext(context) {
        let result = [],
            buffer;

        context.forEach(current => {
            if (current.hash) {
                if (buffer) {
                    buffer = Object.assign(buffer, current.hash);
                } else {
                    buffer = Object.assign({}, current.hash);
                }
            } else {
                if (buffer) {
                    result.push(this.env.compileHash(buffer));
                    buffer = null;
                }

                result.push(current);
            }
        });

        if (buffer) {
            result.push(this.env.compileHash(buffer));
        }

        return result;
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
