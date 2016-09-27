import {TemplateNode} from './TemplateNode';
import {TemplateNodeString} from './TemplateNodeString';
import {TemplateNodePrimitive} from './TemplateNodePrimitive';
import {TemplateEnvironment} from '../TemplateEnvironment';
import {TemplateNodeAttribute} from './TemplateNodeAttribute';
import {TemplateNodeContent} from './TemplateNodeContent';
import {
    TemplateNodeComponentParams, TemplateNodeComponentPragma, CompiledString,
    TemplateHash
} from '../../declarations';

export class TemplateNodeComponent extends TemplateNode {
    public name: string;
    public attributes: TemplateNodeAttribute[];
    public content: TemplateNodeContent;

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     */
    constructor(node, env: TemplateEnvironment) {
        super(env);

        Object.assign(this, node);
    }

    /**
     * @returns {string}
     */
    public compile(): CompiledString {
        return this._compile(this.getPragma());
    }

    /**
     * @param {{}} pragma
     * @returns {string}
     * @private
     */
    protected _compile(pragma): CompiledString {
        if (pragma.match) {
            if (!this.env.getDefine(pragma.match)) {
                return this._compileAsyncComponent();
            }
        }

        if (pragma.bundle) {
            return this.env.resolveAsync(this.name, (ComponentName, path) => {
                return this._compileBundle(pragma, ComponentName, path);
            });
        }

        if (pragma.async) {
            return this._compileAsync(pragma);
        }

        return this._compileSync();
    }

    /**
     * @returns {string}
     * @private
     */
    protected _compileSync(): CompiledString {
        let name = this.name,
            ComponentName = this.env.resolveComponent(name),
            isCustomComponent = (name === ComponentName),
            params = ({} as TemplateNodeComponentParams),
            regionName,
            scope;

        if (name !== 'div' && !isCustomComponent) {
            params.tagName = JSON.stringify(name);
        }

        if (this.attributes.length) {
            let attributes = {}, events = {};

            this.attributes.forEach(attr => {
                let attrName = attr.name,
                    attrValue = attr.value;

                if (attr.isEvent()) {
                    Object.assign(events, attr.compileEvent());
                } else if (attrName === 'as') {
                    regionName = attrValue.compile();
                } else if (attrName === 'scope') {
                    if (attrValue instanceof TemplateNodeString) {
                        scope = attrValue.string;
                    } else {
                        throw new Error('Scope must be string');
                    }
                } else if (attrName[0] !== '#') {
                    if (!isCustomComponent && attrName !== 'events' && attrName !== 'options') {
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
                let eventsHash = this.env.compileHash(events);

                if (params.events) {
                    params.events = `Object.assign({},${params.events},${eventsHash})`
                } else {
                    params.events = this.env.compileHash(events);
                }
            }
        }

        if (scope) {
            params.content = this.env.scope({scope}, () => {
                let content = this.compileContent();

                return this.env.factoryCompiled(this.env.compileScope(scope, content), {
                    isString: true,
                    length: content.length
                });
            });
        } else {
            params.content = this.compileContent();
        }

        if (!params.content.length) {
            delete params.content;
        }

        let stringParams: string|TemplateHash;

        if (params.options) {
            let options = params.options;
            delete params.options;
            stringParams = `Object.assign({},${options},${this.env.compileHash(params)})`;
        } else {
            stringParams = this.env.compileHash(params);
        }

        return `${regionName ? regionName + '=' : ''}new ${ComponentName}(${stringParams})`;
    }

    /**
     * @param {{}} pragma
     * @returns {string}
     * @private
     */
    protected _compileAsync(pragma: TemplateNodeComponentPragma): string {
        let asyncMethod = pragma.async;

        delete pragma.async;

        let content = this._compile(pragma),
            name = this.env.tempVar();

        let then1 = `function(){return ${name}.${asyncMethod}()}`,
            then2 = `function(){return ${name}}`;

        let promise = `function(${name}){return Promise.resolve(${name}=${content}).then(${then1}).then(${then2})}()`;

        if (pragma.asyncAvoidComponent) {
            return promise;
        }

        return this._compileAsyncComponent(promise);
    }

    /**
     * @param {{}} pragma
     * @param {string} componentName
     * @param {string} path
     *
     * @returns {string}
     * @private
     */
    protected _compileBundle(pragma:TemplateNodeComponentPragma, componentName, path): CompiledString {
        delete pragma.bundle;

        if (!path) {
            return this._compile(pragma);
        }

        if (pragma.async) {
            pragma.asyncAvoidComponent = true;
        }

        let content = this._compile(pragma),
            imports = this.env.getAsyncImports(),
            importsString = this.env.compileImports(imports, '');

        path = JSON.stringify('promise?global!' + path);

        let promise = `require(${path})().then(function(bundle){var ${componentName}=bundle.${componentName};${importsString}return ${content}})`;

        return this._compileAsyncComponent(promise);
    }

    /**
     * @param {string} promise
     * @returns {string}
     * @private
     */
    protected _compileAsyncComponent(promise?):string {
        let AsyncComponent = this.env.resolveComponent('AsyncComponent');

        if (promise) {
            let params = {
                promise: promise
            };

            return `new ${AsyncComponent}(${this.env.compileHash(params)})`;
        } else {
            return `new ${AsyncComponent}()`;
        }
    }

    /**
     * @returns {string}
     */
    public compileContent():CompiledString {
        return this.content.compile();
    }

    /**
     * @param {string} name
     * @returns {TemplateNodeAttribute}
     */
    public getAttribute(name:string):TemplateNodeAttribute {
        return this.attributes.find(attr => attr.name === name);
    }

    /**
     * @param {string} name
     * @returns {TemplateNodeAttribute}
     */
    public removeAttribute(name:string) {
        this.attributes = this.attributes.filter(attr => attr.name !== name);
    }

    /**
     * @returns {{}}
     */
    getPragma():TemplateNodeComponentPragma {
        let pragma = ({} as TemplateNodeComponentPragma);

        this.attributes.forEach(attr => {
            if (attr.name[0] === '#') {
                let name = attr.name.slice(1),
                    value = attr.value;

                if (value instanceof TemplateNodePrimitive) {
                    pragma[name] = value.value;
                } else if (value instanceof TemplateNodeString) {
                    pragma[name] = value.string;
                } else {
                    throw new Error(`${attr.name} must be primitive type, because it is control compilation`)
                }
            }
        });

        return pragma;
    }

    /**
     * @param {{}} node
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeComponent}
     */
    static factory(node, env:TemplateEnvironment) {
        node.attributes = (node.attributes || []).map(node => env.factoryAttribute(node));
        node.content = env.factoryContent(node.content || []);

        return new TemplateNodeComponent(node, env);
    }

}
