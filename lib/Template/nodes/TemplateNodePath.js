import {TemplateNode} from './TemplateNode';

export class TemplateNodePath extends TemplateNode {

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
            this.level++;
        }

        this.string = this.parts.join('.');
    }

    /**
     * @returns {string}
     */
    compile() {
        if (this.isWatch()) {
            return this.compileProxy();
        } else {
            return this.compileVariable();
        }
    }

    /**
     * @returns {string}
     */
    compileVariable() {
        let parts = [this.getContext()];
        if (this.string) {
            parts.push(this.string);
        }

        return parts.join('.');
    }

    /**
     * @returns {string}
     */
    compileProxy() {
        let parts = this.string.split('.'),
            path = parts.map(part => `proxy(${JSON.stringify(part)})`);

        path.unshift(this.getContext());

        return this.env.watcher(path.join('.'));
    }

    /**
     * @returns {string}
     */
    compileMethod() {
        if (this.isWatch()) {
            let temp = this.env.tempVar();

            return `(function(${temp}){return ${temp}.emit.bind(${temp})})(${this.compileProxy()})`;
        }

        let parts = [this.getContext()].concat(this.string.split('.')),
            method = parts.pop(),
            context = parts.join('.');

        return `${context}.${method}.bind(${context})`;
    }

    getContext() {
        if (this.level) {
            let contexts = this.env.filterScopes('context').map(scope => scope.context);

            if (contexts.length < this.level) {
                throw new Error(`Cannot resolve path "${this.original}"`);
            }

            return contexts[contexts.length - this.level];
        }

        return 'context';
    }

    /**
     * @returns {boolean}
     */
    isWatch() {
        return this.watch;
    }

    /**
     * @param {string} string
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodePath}
     */
    static factory(string, env) {
        return new TemplateNodePath(string, env);
    }

}