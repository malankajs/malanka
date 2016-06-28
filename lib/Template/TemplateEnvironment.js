import {TemplateNodeComponent} from './nodes/TemplateNodeComponent';
import {TemplateNodeContent} from './nodes/TemplateNodeContent';
import {TemplateNodeAttribute} from './nodes/TemplateNodeAttribute';
import {TemplateNodeString} from './nodes/TemplateNodeString';
import {TemplateNodeExpression} from './nodes/TemplateNodeExpression';
import {TemplateNodePath} from './nodes/TemplateNodePath';
import {TemplateNodeStringProxy} from './nodes/TemplateNodeStringProxy';
import {TemplateNodeHashAttributes} from './nodes/TemplateNodeHashAttributes';
import {TemplateNodeCompiled} from './nodes/TemplateNodeCompiled';

const FACTORIES = {
    Text: TemplateNodeString,
    BalancedTag: TemplateNodeComponent,
    SelfClosingTag: TemplateNodeComponent,
    Expression: TemplateNodeExpression,
    BlockExpression: TemplateNodeExpression,
    path: TemplateNodeExpression
};

export class TemplateEnvironment {

    /**
     * @param {{}} components
     * @param {{}} helpers
     * @param {{}} knownAttributes
     */
    constructor({components = {}, helpers = {}, knownAttributes = []}) {
        this.imports = {};
        this.helpers = helpers;
        this.components = components;
        this.knownAttributes = knownAttributes;
        this.scopes = [];
        this.counter = 0;
    }

    /**
     * @returns {string}
     */
    compile(content) {
        let compiledContent = content.compile();

        let imports = Object.keys(this.imports).map(key => {
            let {path, name} = this.imports[key];

            return `var ${key} = require(${JSON.stringify(path)})${name ? `.${name}` : ''};`
        });

        return `${imports.join('\n')}\n\nmodule.exports = function(context){return ${compiledContent}}`;
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

        return `{${params.join(',')}}`;
    }

    /**
     * @param {string} name
     */
    resolveComponent(name) {
        let componentName = 'Component';

        if (this.components[name]) {
            componentName = name;
        }

        this.imports[componentName] = {
            path: this.components[componentName],
            name: componentName
        };

        return componentName;
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
            path: require.resolve('../runtime/runtime'),
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
        this.scopes.push(scope);
        let result = callback(scope);
        this.scopes.pop();

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
     * @param {string} name
     * @returns {boolean}
     */
    isKnownAttribute(name) {
        return this.knownAttributes.indexOf(name) > -1 || name.indexOf('data-') === 0;
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
     * @returns {TemplateNodeHashAttributes}
     */
    factoryHashAttributes(nodes) {
        return TemplateNodeHashAttributes.factory(nodes, this);
    }

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