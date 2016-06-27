import {TemplateNode} from './TemplateNode';
import {TemplateNodeString} from "./TemplateNodeString";

export class TemplateNodeComponent extends TemplateNode {

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    compile() {
        let name = this.name,
            ComponentName = this.env.resolveComponent(name),
            isCustomComponent = (name === ComponentName),
            params = {},
            regionName,
            scope;

        if (name !== 'div' && !isCustomComponent) {
            params.tagName = JSON.stringify(name);
        }

        if (this.attributes.length) {
            let attributes = {}, events = {};

            this.attributes.forEach(attr => {
                if (attr.isEvent()) {
                    Object.assign(events, attr.compileEvent());
                } else if (attr.name === 'as') {
                    regionName = attr.value.compile();
                } else if (attr.name === 'scope') {
                    if (attr.value instanceof TemplateNodeString) {
                        scope = attr.value.string;
                    } else {
                        throw new Error('Scope must be string');
                    }
                } else {
                    if (!isCustomComponent) {
                        Object.assign(attributes, attr.compileHash());
                    } else {
                        Object.assign(params, attr.compileHash());
                    }
                }
            });

            if (Object.keys(attributes).length) {
                params.attributes = this.env.compileHash(attributes);
            }

            if (Object.keys(events).length) {
                params.events = this.env.compileHash(events);
            }
        }

        if (scope) {
            params.content = this.env.scope({scope}, () => {
                let content = this.compileContent();

                return this.env.factoryCompiled(`function(${scope}){return ${content}}`, {isString: true, length: content.length});
            });
        } else {
            params.content = this.compileContent();
        }

        if (!params.content.length) {
            delete params.content;
        }

        return `${regionName ? regionName + '=' : ''}new ${ComponentName}(${this.env.compileHash(params)})`;
    }

    /**
     * @returns {string}
     */
    compileContent() {
        return this.content.compile({mergeVars: false});
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeComponent}
     */
    static factory(node, env) {
        node.attributes = (node.attributes || []).map(node => env.factoryAttribute(node));
        node.content = env.factoryContent(node.content || []);

        return new TemplateNodeComponent(node, env);
    }

}