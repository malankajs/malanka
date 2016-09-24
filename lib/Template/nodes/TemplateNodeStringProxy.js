import {TemplateNode} from './TemplateNode';

export class TemplateNodeStringProxy extends TemplateNode {

    /**
     * @param {TemplateNodeContent} content
     * @param {TemplateEnvironment} env
     */
    constructor(content, env) {
        super(env);

        this.content = content;
    }

    /**
     * @returns {{}}
     */
    compile() {
        return this.env.scope({watchers: []}, (scope) => {
            let content = this.content.compile();

            if (content.isArray) {
                let func = this.env.resolveRuntime('join');

                content = `${func}(${content})`;
            }

            let watchers = Object.keys(scope.watchers);

            if (watchers.length) {
                let proxy = this.env.resolveComponent('ValueProxy'),
                    params = watchers.map(path => scope.watchers[path]),
                    body;

                if (watchers.length > 1) {
                    let arg = this.env.tempVar();
                    let result = params.map((param, index) => `${param}=${arg}[${index}]`);

                    body = `${proxy}.all([${watchers.join(', ')}]).pipe(function(${arg}){var ${result.join(', ')};return ${content}})`;
                } else {
                    body = `${watchers[0]}.pipe(function(${params[0]}){return ${content}})`;
                }

                return body;
                return `(function(${params.join(', ')}){return ${body}})(${watchers.join(',')})`;

            } else {
                return `${content}`;
            }
        });
    }

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeStringProxy}
     */
    static factory(nodes, env) {
        return new TemplateNodeStringProxy(env.factoryContent(nodes), env);
    }

}
