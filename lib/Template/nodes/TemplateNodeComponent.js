import {TemplateNode} from './TemplateNode';
import {TemplateNodeString} from "./TemplateNodeString";
import {TemplateNodePrimitive} from './TemplateNodePrimitive';

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
        return this._compile(this.getPragma());
    }

    /**
     * @param {{}} pragma
     * @returns {string}
     * @private
     */
    _compile(pragma) {
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

        return this._compileSync(pragma);
    }

    /**
     * @returns {string}
     * @private
     */
    _compileSync() {
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
                } else if (attr.name[0] !== '#') {
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

                return this.env.factoryCompiled(`function(${scope}){return ${content}}`, {
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

        return `${regionName ? regionName + '=' : ''}new ${ComponentName}(${this.env.compileHash(params)})`;
    }

    /**
     * @param {{}} pragma
     * @returns {string}
     * @private
     */
    _compileAsync(pragma) {
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
    _compileBundle(pragma, componentName, path) {
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
    _compileAsyncComponent(promise) {
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
    compileContent() {
        return this.content.compile({mergeVars: false});
    }

    /**
     * @param {string} name
     * @returns {TemplateNodeAttribute}
     */
    getAttribute(name) {
        return this.attributes.find(attr => attr.name === name);
    }

    /**
     * @param {string} name
     * @returns {TemplateNodeAttribute}
     */
    removeAttribute(name) {
        this.attributes = this.attributes.filter(attr => attr.name !== name);
    }

    /**
     * @returns {{}}
     */
    getPragma() {
        let pragma = {};

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
    static factory(node, env) {
        node.attributes = (node.attributes || []).map(node => env.factoryAttribute(node));
        node.content = env.factoryContent(node.content || []);

        return new TemplateNodeComponent(node, env);
    }

}
