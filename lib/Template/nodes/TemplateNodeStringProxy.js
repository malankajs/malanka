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

            let watchers = Object.keys(scope.watchers);

            if (watchers.length) {
                let proxy = this.env.resolveComponent('ValueProxy'),
                    params = watchers.map(path => scope.watchers[path]);

                return `(function(${params.join(', ')}){
                        return ${proxy}.fromArray([].slice.call(arguments)).mutate(function() {
                            return ${content}.join('');
                        })
                    })(${watchers.join(',')})`;

            } else {
                return `${content}.join('')`;
            }
        });
    }

    /**
     * @param {{}} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeStringProxy}
     */
    static factory(nodes, env) {
        return new TemplateNodeStringProxy(env.factoryContent(nodes), env);
    }

}