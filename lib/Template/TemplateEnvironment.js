import {TemplateNodeComponent} from './nodes/TemplateNodeComponent';
import {TemplateNodeContent} from './nodes/TemplateNodeContent';
import {TemplateNodeAttribute} from './nodes/TemplateNodeAttribute';
import {TemplateNodeString} from './nodes/TemplateNodeString';
import {TemplateNodeExpression} from './nodes/TemplateNodeExpression';
import {TemplateNodePath} from './nodes/TemplateNodePath';
import {TemplateNodeStringProxy} from './nodes/TemplateNodeStringProxy';
import {TemplateNodeHelperHashAttributes} from './nodes/TemplateNodeHelperHashAttributes';
import {TemplateNodeHelperHashAttribute} from './nodes/TemplateNodeHelperHashAttribute';
import {TemplateNodeCompiled} from './nodes/TemplateNodeCompiled';
import {TemplateNodeComment} from './nodes/TemplateNodeComment';
import {TemplateNodeCallExpression} from './nodes/TemplateNodeCallExpression';
import {TemplateNodePrimitive} from './nodes/TemplateNodePrimitive';
import {TemplateNodeEscapedString} from './nodes/TemplateNodeEscapedString';
import {TemplateNodeArray} from './nodes/TemplateNodeArray';
import {TemplateNodeHash} from './nodes/TemplateNodeHash';
import {TemplateNodeHashAttribute} from './nodes/TemplateNodeHashAttribute';
import {TemplateNodeTemplate} from './nodes/TemplateNodeTemplate';

const FACTORIES = {
    Text: TemplateNodeString,
    Component: TemplateNodeComponent,
    Expression: TemplateNodeExpression,
    BlockExpression: TemplateNodeExpression,
    CallExpression: TemplateNodeCallExpression,
    Path: TemplateNodeExpression,
    Comment: TemplateNodeComment,
    Primitive: TemplateNodePrimitive,
    EscapedString: TemplateNodeEscapedString,
    Array: TemplateNodeArray,
    Hash: TemplateNodeHash,
    Template: TemplateNodeTemplate
};

export class TemplateEnvironment {

    /**
     * @param {{}} define
     * @param {{}} helpers
     * @param {{}} components
     * @param {{}} runtimePath
     */
    constructor({
        define = {},
        helpers = {},
        components = {},
        runtimePath = require.resolve('../Runtime/runtime')
    }) {
        this.scopes = [];
        this.imports = {};
        this.templates = {};
        this.counter = 0;

        this.define = define;
        this.helpers = helpers;
        this.components = components;
        this.runtimePath = runtimePath;
    }

    /**
     * @returns {string}
     */
    compile(content) {
        return this.scope({scope: 'context'}, () => {
            let compiledContent = content.compile(),
                importsString = this.compileImports(this.imports);

            return `${importsString}module.exports = ${this.compileScope('context', compiledContent)}`;
        });
    }

    /**
     * @param {{}} nodes
     * @returns {string[]}
     */
    compileNodes(nodes) {
        return nodes.map(node => node.compile()).filter(Boolean);
    }

    /**
     * @param {{}} imports
     * @param {string} EOL
     * @returns {string}
     */
    compileImports(imports, EOL = '\n\n') {
        let importsArray = Object.keys(imports).map(key => {
            let {path, name} = imports[key];

            return `${key} = require(${JSON.stringify(path)})${name ? `.${name}` : ''}`
        });

        return importsArray.length ? `var ${importsArray.join(',')};${EOL}` : '';
    }

    /**
     * @returns {string}
     */
    compileTemplates() {
        let templates = Object.keys(this.templates).map(key => {
            let {name, content} = this.templates[key];

            return `${name}=${content}`;
        });

        if (templates.length) {
            return `var ${templates.join(',')};`;
        }

        return '';
    }

    /**
     * @param {{}} hash
     *
     * @returns {string}
     */
    compileHash(hash) {
        let params = Object.keys(hash).map(key => {
            return `${JSON.stringify(key)}:${hash[key]}`
        });

        let compiled = `{${params.join(',')}}`;

        return {
            hash,
            length: compiled.length,
            toString() {
                return compiled;
            }
        };
    }

    /**
     * @param {string} scope
     * @param {string} content
     * @returns {string}
     */
    compileScope(scope, content) {
        return `function(${scope}){${this.compileTemplates()}return ${content}}`;
    }

    /**
     * @param {string} name
     */
    resolveComponent(name) {
        let componentName = 'Component';

        if (this.components[name]) {
            componentName = name;
        }

        if (!this.imports[componentName]) {
            this.imports[componentName] = {
                path: this.components[componentName],
                name: componentName
            };
        }

        return componentName;
    }

    /**
     * @param {string} name
     * @param {function} callback
     *
     * @returns {string}
     */
    resolveAsync(name, callback) {
        if (this.imports[name]) {
            return callback(this.imports[name].name);
        }

        if (!this.components[name]) {
            return callback(name);
        }

        this.resolveComponent('AsyncComponent');

        let origImports = this.imports;
        this.imports = Object.create(this.imports);
        this.imports[name] = {name};

        let result = callback(name, this.components[name]);

        this.imports = origImports;

        return result;
    }

    /**
     * @returns {{}}
     */
    getAsyncImports() {
        let imports = {};

        Object.keys(this.imports).forEach(key => {
            if (this.imports[key].path) {
                imports[key] = this.imports[key];
            }
        });

        return imports;
    }

    /**
     * @param {string} name
     *
     * @returns {string}
     */
    resolveHelper(name) {
        if (this.helpers[name]) {
            let helperName = '_' + name;
            this.imports[helperName] = {path: this.helpers[name], name: 'default'};

            return helperName;
        }

        return `context.${name}`;
    }

    /**
     * @param {string} name
     *
     * @returns {string}
     */
    resolveRuntime(name) {
        let funcName = '__' + name;

        this.imports[funcName] = {
            path: this.runtimePath,
            name: name
        };

        return funcName;
    }

    /**
     * @param {{}} scope
     * @param {function} callback
     * @returns {{watchers: {}}}
     */
    scope(scope, callback) {
        let hasName = scope.scope,
            templates = this.templates;

        if (hasName) {
            this.templates = Object.create(this.templates);
        }

        this.scopes.push(scope);
        let result = callback(scope);
        this.scopes.pop();

        this.templates = templates;

        return result;
    }

    /**
     * @returns {{watchers: {}}}
     */
    getScope() {
        if (this.scopes.length) {
            return this.scopes[this.scopes.length - 1];
        }
    }

    /**
     * @param {string} name
     * @returns {{}[]}
     */
    filterScopes(name) {
        return this.scopes.filter(scope => scope[name] !== undefined);
    }

    /**
     * @param {string} name
     *
     * @returns {*}
     */
    scopeValue(name) {
        let scopes = this.filterScopes(name);

        if (scopes.length) {
            return scopes[scopes.length - 1][name];
        }
    }

    /**
     * @param {string} name
     *
     * @returns {string}
     */
    watcher(name) {
        let scopes = this.filterScopes('watchers');

        if (scopes.length) {
            let varName, index = 0;

            while (!varName && scopes[index]) {
                varName = scopes[index++].watchers[name];
            }

            if (!varName) {
                varName = this.tempVar();
            }

            for (index = 0; index < scopes.length; index++) {
                scopes[index].watchers[name] = varName;
            }

            return varName;
        }

        return name;
    }

    /**
     * @returns {string}
     */
    tempVar() {
        return `v${this.counter++}`;
    }

    /**
     * @param {string} variable
     *
     * @returns {*}
     */
    getDefine(variable) {
        return this.define[variable];
    }

    /**
     * @param {string} name
     * @param {function} callback
     */
    registerTemplate(name, callback) {
        this.templates[name] = {
            name: this.tempVar()
        };

        this.scope({scope: name}, () => {
            this.templates[name].content = callback();
        });
    }

    /**
     * @param {string} name
     * @returns {string|null}
     */
    getTemplateVar(name) {
        return this.templates[name] ? this.templates[name].name : null;
    }

    /**
     * @param {{type: string}|string} node
     *
     * @returns {TemplateNode}
     */
    factory(node) {
        if (typeof node === 'string') {
            return this.factoryString(node);
        }

        if (Array.isArray(node)) {
            return this.factoryContent(node);
        }

        if (!FACTORIES[node.type]) {
            console.log(node);
            throw new Error('Unknown type ' + node.type);
        }

        return FACTORIES[node.type].factory(node, this);
    }

    /**
     * @param {{type: string}[]} nodes
     *
     * @returns {TemplateNode[]}
     */
    factoryNodes(nodes) {
        return nodes.map(node => this.factory(node));
    }

    /**
     * @param {{type: string}[]} nodes
     *
     * @returns {TemplateNodeContent}
     */
    factoryContent(nodes) {
        return TemplateNodeContent.factory(nodes, this);
    }

    /**
     * @param {{}} node
     *
     * @returns {TemplateNodeAttribute}
     */
    factoryAttribute(node) {
        return TemplateNodeAttribute.factory(node, this);
    }

    /**
     * @param {string} string
     *
     * @returns {TemplateNodeString}
     */
    factoryString(string) {
        return TemplateNodeString.factory(string, this);
    }

    /**
     * @param {{}[]} nodes
     *
     * @returns {TemplateNodeStringProxy}
     */
    factoryStringProxy(nodes) {
        return TemplateNodeStringProxy.factory(nodes, this);
    }

    /**
     * @param {string} path
     *
     * @returns {TemplateNodePath}
     */
    factoryPath(path) {
        return TemplateNodePath.factory(path, this);
    }

    /**
     * @param {{}[]} nodes
     *
     * @returns {TemplateNodeHelperHashAttributes}
     */
    factoryHashAttributes(nodes) {
        return TemplateNodeHelperHashAttributes.factory(nodes, this);
    }

    /**
     * @param {{}[]} node
     *
     * @returns {TemplateNodeHelperHashAttribute}
     */
    factoryHelperHashAttribute(node) {
        return TemplateNodeHelperHashAttribute.factory(node, this);
    }

    /**
     * @param {{}[]} node
     *
     * @returns {TemplateNodeHelperHashAttribute}
     */
    factoryHashAttribute(node) {
        return TemplateNodeHashAttribute.factory(node, this);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} content
     * @param {{}} options
     *
     * @returns {TemplateNodeCompiled}
     */
    factoryCompiled(content, options) {
        return new TemplateNodeCompiled(content, options);
    }
}
