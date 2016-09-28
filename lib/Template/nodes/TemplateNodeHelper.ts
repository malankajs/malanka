import {TemplateNodeVar} from './TemplateNodeVar';
import {TemplateNodePath} from './TemplateNodePath';
import {TemplateNodeHelperHashAttributes} from './TemplateNodeHelperHashAttributes';
import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {TemplateNodeHelperOptions, CompiledString} from '../../declarations';

export class TemplateNodeHelper extends TemplateNodeVar {
    public path:TemplateNodePath;
    public hash:TemplateNodeHelperHashAttributes;
    public params:TemplateNode[];

    /**
     * @returns {string}
     */
    public compile():string {
        let helperName = this.env.resolveHelper(this.path.string),
            template = this.path.isTemplate();

        if (template) {
            let context = this.optimizeContext(this.compileTemplateContext()),
                stringContext = '';

            if (context.length === 1) {
                stringContext = context[0];
            } else if (context.length === 0) {
                stringContext = '{}';
            } else {
                if (context[0].hash) {
                    stringContext = `Object.assign(${context.join(',')})`;
                } else {
                    stringContext = `Object.assign({},${context.join(',')})`;
                }
            }

            return `${this.path.compile()}(${stringContext})`
        } else {
            let args = ['context'] as (string|CompiledString)[],
                context = this.hash.getContext();

            args = args.concat(this.compileArgs());

            args.push(this.env.compileHash(this.compileOptions()));

            return `${context ? context.compile() + '=' : ''}${helperName}.call(${args.join(',')})`;
        }
    }

    /**
     */
    public compileArgs():string[] {
        return this.env.scope({isString: true}, () => {
            return this.params.map(param => param.compile());
        });
    }

    /**
     */
    public compileOptions():TemplateNodeHelperOptions {
        var hash = ({
            hash: this.env.compileHash(this.hash.compileHash())
        } as TemplateNodeHelperOptions);

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
    static factory(node, env:TemplateEnvironment) {
        node.params = node.params.map(param => env.factory(param || []));
        node.hash = env.factoryHashAttributes(node.hash || []);

        return new TemplateNodeHelper(node, env);
    }

}
