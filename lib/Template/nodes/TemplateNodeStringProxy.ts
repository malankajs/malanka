import {TemplateNode} from './TemplateNode';
import {TemplateNodeContent} from './TemplateNodeContent';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeStringProxy extends TemplateNode {
    public content:TemplateNodeContent;

    /**
     * @param {TemplateNodeContent} content
     * @param {TemplateEnvironment} env
     */
    constructor(content, env:TemplateEnvironment) {
        super(env);

        this.content = content;
    }

    /**
     * @returns {{}}
     */
    public compile():string {
        return this.env.scope({watchers: []}, (scope) => {
            let content = this.content.compile() as ({isArray: boolean, toString: () => string}),
                stringContent:string;

            if (content.isArray) {
                let func = this.env.resolveRuntime('join');

                stringContent = `${func}(${content})`;
            } else {
                stringContent = String(content);
            }

            let watchers = Object.keys(scope.watchers);

            if (watchers.length) {
                let proxy = this.env.resolveComponent('ValueProxy'),
                    params = watchers.map(path => scope.watchers[path]),
                    body;

                if (watchers.length > 1) {
                    let arg = this.env.tempVar();
                    let result = params.map((param, index) => `${param}=${arg}[${index}]`);

                    body = `${proxy}.all([${watchers.join(', ')}]).pipe(function(${arg}){var ${result.join(', ')};return ${stringContent}})`;
                } else {
                    body = `${watchers[0]}.pipe(function(${params[0]}){return ${stringContent}})`;
                }

                return body;
            } else {
                return `${stringContent}`;
            }
        });
    }

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeStringProxy}
     */
    static factory(nodes, env:TemplateEnvironment) {
        return new TemplateNodeStringProxy(env.factoryContent(nodes), env);
    }

}
