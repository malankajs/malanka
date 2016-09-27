import {TemplateNode} from './TemplateNode';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {CompiledString} from '../../declarations';

export class TemplateNodePath extends TemplateNode {
    public original:string;
    public string:string;
    public watch:boolean;
    public level:number;
    public parts:string[];

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     */
    constructor(string, env) {
        super(env);

        this.original = string;

        if (string[0] === '@') {
            this.watch = true;
            this.string = string.slice(1);
        } else {
            this.watch = false;
            this.string = string;
        }

        this.level = 0;
        this.parts = this.string.split('.');

        while (this.parts[0] === 'this' && this.parts.length) {
            this.parts.shift();
        }

        this.string = this.parts.join('.');
    }

    /**
     * @returns {string}
     */
    public compile():CompiledString {
        let templateVar = this.getTemplateVar();

        if (templateVar) {
            if (this.isWatch()) {
                throw new Error('Usage of template with @ has no sense');
            } else {
                return templateVar;
            }
        }

        if (this.isWatch()) {
            return this.compileProxy();
        } else {
            return this.compileVariable();
        }
    }

    /**
     * @returns {string}
     */
    public compileVariable():string {
        let result = '';

        this.getParts().forEach(part => {
            if (part.match(/^[a-z0-9_]+$/i) && !part.match(/^[0-9]+$/)) {
                if (result) {
                    result += '.';
                }

                result += part;
            } else {
                if (!result) {
                    console.error(this);
                    throw new Error('Cannot compile path');
                }

                result += `[${JSON.stringify(part)}]`;
            }
        });

        return result;
    }

    /**
     * @returns {string}
     */
    public compileProxy():string {
        let [context, ...parts] = this.getParts();

        let path = parts.map(part => `proxy(${JSON.stringify(part)})`);

        path.unshift(context);

        return this.env.watcher(path.join('.'));
    }

    /**
     * @returns {string}
     */
    public compileMethod(params = ([] as TemplateNode[])):string {
        if (this.isWatch()) {
            let temp = this.env.tempVar();

            return `(function(${temp}){return ${temp}.emitValue.bind(${temp})})(${this.compileProxy()})`;
        }

        let parts = this.getParts(),
            method = parts.pop(),
            context = parts.join('.');

        let bind = [context] as (CompiledString[]);

        params.forEach(param => bind.push(param.compile()));

        return `${context}.${method}.bind(${bind.join(',')})`;
    }

    /**
     * @returns {string[]}
     */
    public getParts():string[] {
        let context = 'context',
            parts = this.parts.slice();

        if (this.level) {
            let contexts = this.env.filterScopes('context').map(scope => scope.context);

            if (contexts.length < this.level) {
                throw new Error(`Cannot resolve path "${this.original}"`);
            }

            context = contexts[contexts.length - this.level];
        } else {
            let scopes = this.env.filterScopes('scope').map(scope => scope.scope),
                index = scopes.indexOf(parts[0]);

            if (index > -1) {
                context = parts.shift();
            }
        }

        return [context].concat(parts);
    }

    /**
     * @returns {string|null}
     */
    getTemplateVar() {
        return this.env.getTemplateVar(this.string);
    }

    /**
     * @returns {boolean}
     */
    public isWatch():boolean {
        return this.watch;
    }

    /**
     * @returns {boolean}
     */
    isTemplate() {
        return Boolean(this.getTemplateVar());
    }

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePath}
     */
    static factory(string:string, env:TemplateEnvironment):TemplateNodePath {
        return new TemplateNodePath(string, env);
    }

}
