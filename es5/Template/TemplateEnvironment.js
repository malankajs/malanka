'use strict';

exports.__esModule = true;
exports.TemplateEnvironment = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _TemplateNodeComponent = require('./nodes/TemplateNodeComponent');

var _TemplateNodeContent = require('./nodes/TemplateNodeContent');

var _TemplateNodeAttribute = require('./nodes/TemplateNodeAttribute');

var _TemplateNodeString = require('./nodes/TemplateNodeString');

var _TemplateNodeExpression = require('./nodes/TemplateNodeExpression');

var _TemplateNodePath = require('./nodes/TemplateNodePath');

var _TemplateNodeStringProxy = require('./nodes/TemplateNodeStringProxy');

var _TemplateNodeHashAttributes = require('./nodes/TemplateNodeHashAttributes');

var _TemplateNodeHashAttribute = require('./nodes/TemplateNodeHashAttribute');

var _TemplateNodeCompiled = require('./nodes/TemplateNodeCompiled');

var _TemplateNodeComment = require('./nodes/TemplateNodeComment');

var _TemplateNodeCallExpression = require('./nodes/TemplateNodeCallExpression');

var _TemplateNodePrimitive = require('./nodes/TemplateNodePrimitive');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FACTORIES = {
    Text: _TemplateNodeString.TemplateNodeString,
    BalancedTag: _TemplateNodeComponent.TemplateNodeComponent,
    SelfClosingTag: _TemplateNodeComponent.TemplateNodeComponent,
    Expression: _TemplateNodeExpression.TemplateNodeExpression,
    BlockExpression: _TemplateNodeExpression.TemplateNodeExpression,
    CallExpression: _TemplateNodeCallExpression.TemplateNodeCallExpression,
    Path: _TemplateNodeExpression.TemplateNodeExpression,
    Comment: _TemplateNodeComment.TemplateNodeComment,
    Primitive: _TemplateNodePrimitive.TemplateNodePrimitive
};

var TemplateEnvironment = function () {

    /**
     * @param {{}} components
     * @param {{}} helpers
     * @param {{}} knownAttributes
     */
    function TemplateEnvironment(_ref) {
        var _ref$components = _ref.components;
        var components = _ref$components === undefined ? {} : _ref$components;
        var _ref$helpers = _ref.helpers;
        var helpers = _ref$helpers === undefined ? {} : _ref$helpers;
        var _ref$knownAttributes = _ref.knownAttributes;
        var knownAttributes = _ref$knownAttributes === undefined ? [] : _ref$knownAttributes;
        (0, _classCallCheck3.default)(this, TemplateEnvironment);

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


    TemplateEnvironment.prototype.compile = function compile(content) {
        var _this = this;

        var compiledContent = content.compile();

        var imports = Object.keys(this.imports).map(function (key) {
            var _imports$key = _this.imports[key];
            var path = _imports$key.path;
            var name = _imports$key.name;


            return key + ' = require(' + JSON.stringify(path) + ')' + (name ? '.' + name : '');
        });

        var hotModules = Object.keys(this.imports).map(function (key) {
            var path = _this.imports[key].path;


            return JSON.stringify(path);
        });

        var hmr = 'if (module.hot) {\n            module.hot.accept([' + hotModules.join(',') + '], function() {\n                ' + imports.join(';\n') + ';\n                \n                context.content = null;\n                context.render();\n            });\n        }';

        var importsString = imports.length ? 'var ' + imports.join(',\n') + ';\n\n' : '';

        return importsString + 'module.exports = function(context){return ' + compiledContent + '}';
    };

    /**
     * @param {{}} hash
     *
     * @returns {string}
     */


    TemplateEnvironment.prototype.compileHash = function compileHash(hash) {
        var params = Object.keys(hash).map(function (key) {
            return JSON.stringify(key) + ':' + hash[key];
        });

        return '{' + params.join(',') + '}';
    };

    /**
     * @param {string} name
     */


    TemplateEnvironment.prototype.resolveComponent = function resolveComponent(name) {
        var componentName = 'Component';

        if (this.components[name]) {
            componentName = name;
        }

        this.imports[componentName] = {
            path: this.components[componentName],
            name: componentName
        };

        return componentName;
    };

    /**
     * @param {string} name
     *
     * @returns {string}
     */


    TemplateEnvironment.prototype.resolveHelper = function resolveHelper(name) {
        if (this.helpers[name]) {
            var helperName = '_' + name;
            this.imports[helperName] = { path: this.helpers[name], name: 'default' };

            return helperName;
        }

        return 'context.' + name;
    };

    /**
     * @param {string} name
     *
     * @returns {string}
     */


    TemplateEnvironment.prototype.resolveRuntime = function resolveRuntime(name) {
        var funcName = '__' + name;

        this.imports[funcName] = {
            path: require.resolve('../Runtime/runtime'),
            name: name
        };

        return funcName;
    };

    /**
     * @param {{}} scope
     * @param {function} callback
     * @returns {{watchers: {}}}
     */


    TemplateEnvironment.prototype.scope = function scope(_scope, callback) {
        this.scopes.push(_scope);
        var result = callback(_scope);
        this.scopes.pop();

        return result;
    };

    /**
     * @returns {{watchers: {}}}
     */


    TemplateEnvironment.prototype.getScope = function getScope() {
        if (this.scopes.length) {
            return this.scopes[this.scopes.length - 1];
        }
    };

    /**
     * @param {string} name
     * @returns {{}[]}
     */


    TemplateEnvironment.prototype.filterScopes = function filterScopes(name) {
        return this.scopes.filter(function (scope) {
            return scope[name] !== undefined;
        });
    };

    /**
     * @param {string} name
     *
     * @returns {*}
     */


    TemplateEnvironment.prototype.scopeValue = function scopeValue(name) {
        var scopes = this.filterScopes(name);

        if (scopes.length) {
            return scopes[scopes.length - 1][name];
        }
    };

    /**
     * @param {string} name
     *
     * @returns {string}
     */


    TemplateEnvironment.prototype.watcher = function watcher(name) {
        var scopes = this.filterScopes('watchers');

        if (scopes.length) {
            var varName = void 0,
                index = 0;

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
    };

    /**
     * @returns {string}
     */


    TemplateEnvironment.prototype.tempVar = function tempVar() {
        return 'v' + this.counter++;
    };

    /**
     * @param {string} name
     * @returns {boolean}
     */


    TemplateEnvironment.prototype.isKnownAttribute = function isKnownAttribute(name) {
        return this.knownAttributes.indexOf(name) > -1 || name.indexOf('data-') === 0;
    };

    /**
     * @param {{type: string}|string} node
     *
     * @returns {TemplateNode}
     */


    TemplateEnvironment.prototype.factory = function factory(node) {
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
    };

    /**
     * @param {{type: string}[]} nodes
     *
     * @returns {TemplateNode[]}
     */


    TemplateEnvironment.prototype.factoryNodes = function factoryNodes(nodes) {
        var _this2 = this;

        return nodes.map(function (node) {
            return _this2.factory(node);
        });
    };

    /**
     * @param {{type: string}[]} nodes
     *
     * @returns {TemplateNodeContent}
     */


    TemplateEnvironment.prototype.factoryContent = function factoryContent(nodes) {
        return _TemplateNodeContent.TemplateNodeContent.factory(nodes, this);
    };

    /**
     * @param {{}} node
     *
     * @returns {TemplateNodeAttribute}
     */


    TemplateEnvironment.prototype.factoryAttribute = function factoryAttribute(node) {
        return _TemplateNodeAttribute.TemplateNodeAttribute.factory(node, this);
    };

    /**
     * @param {string} string
     *
     * @returns {TemplateNodeString}
     */


    TemplateEnvironment.prototype.factoryString = function factoryString(string) {
        return _TemplateNodeString.TemplateNodeString.factory(string, this);
    };

    /**
     * @param {{}[]} nodes
     *
     * @returns {TemplateNodeStringProxy}
     */


    TemplateEnvironment.prototype.factoryStringProxy = function factoryStringProxy(nodes) {
        return _TemplateNodeStringProxy.TemplateNodeStringProxy.factory(nodes, this);
    };

    /**
     * @param {string} path
     *
     * @returns {TemplateNodePath}
     */


    TemplateEnvironment.prototype.factoryPath = function factoryPath(path) {
        return _TemplateNodePath.TemplateNodePath.factory(path, this);
    };

    /**
     * @param {{}[]} nodes
     *
     * @returns {TemplateNodeHashAttributes}
     */


    TemplateEnvironment.prototype.factoryHashAttributes = function factoryHashAttributes(nodes) {
        return _TemplateNodeHashAttributes.TemplateNodeHashAttributes.factory(nodes, this);
    };

    /**
     * @param {{}[]} node
     *
     * @returns {TemplateNodeHashAttribute}
     */


    TemplateEnvironment.prototype.factoryHashAttribute = function factoryHashAttribute(node) {
        return _TemplateNodeHashAttribute.TemplateNodeHashAttribute.factory(node, this);
    };

    //noinspection JSMethodCanBeStatic
    /**
     * @param {string} content
     * @param {{}} options
     *
     * @returns {TemplateNodeCompiled}
     */


    TemplateEnvironment.prototype.factoryCompiled = function factoryCompiled(content, options) {
        return new _TemplateNodeCompiled.TemplateNodeCompiled(content, options);
    };

    return TemplateEnvironment;
}();

exports.TemplateEnvironment = TemplateEnvironment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9UZW1wbGF0ZS9UZW1wbGF0ZUVudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxZQUFZO0FBQ2QsZ0RBRGM7QUFFZCw2REFGYztBQUdkLGdFQUhjO0FBSWQsOERBSmM7QUFLZCxtRUFMYztBQU1kLDBFQU5jO0FBT2Qsd0RBUGM7QUFRZCxxREFSYztBQVNkO0FBVGMsQ0FBbEI7O0lBWWEsbUI7O0FBRVQ7Ozs7O0FBS0EsdUNBQW1FO0FBQUEsbUNBQXRELFVBQXNEO0FBQUEsWUFBdEQsVUFBc0QsbUNBQXpDLEVBQXlDO0FBQUEsZ0NBQXJDLE9BQXFDO0FBQUEsWUFBckMsT0FBcUMsZ0NBQTNCLEVBQTJCO0FBQUEsd0NBQXZCLGVBQXVCO0FBQUEsWUFBdkIsZUFBdUIsd0NBQUwsRUFBSztBQUFBOztBQUMvRCxhQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGFBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLGFBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGFBQUssTUFBTCxHQUFjLEVBQWQ7QUFDQSxhQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0g7O0FBRUQ7Ozs7O2tDQUdBLE8sb0JBQVEsTyxFQUFTO0FBQUE7O0FBQ2IsWUFBSSxrQkFBa0IsUUFBUSxPQUFSLEVBQXRCOztBQUVBLFlBQUksVUFBVSxPQUFPLElBQVAsQ0FBWSxLQUFLLE9BQWpCLEVBQTBCLEdBQTFCLENBQThCLGVBQU87QUFBQSwrQkFDNUIsTUFBSyxPQUFMLENBQWEsR0FBYixDQUQ0QjtBQUFBLGdCQUMxQyxJQUQwQyxnQkFDMUMsSUFEMEM7QUFBQSxnQkFDcEMsSUFEb0MsZ0JBQ3BDLElBRG9DOzs7QUFHL0MsbUJBQVUsR0FBVixtQkFBMkIs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QUEyQixPQUEzQixDQUFtQyxLQUFuQyxFQUEwQyxJQUExQyxDQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7OztrQ0FLQSxvQixpQ0FBcUIsSSxFQUFNO0FBQ3ZCLGVBQU8scURBQTBCLE9BQTFCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQVA7QUFDSCxLOztBQUVEO0FBQ0E7Ozs7Ozs7O2tDQU1BLGUsNEJBQWdCLE8sRUFBUyxPLEVBQVM7QUFDOUIsZUFBTywrQ0FBeUIsT0FBekIsRUFBa0MsT0FBbEMsQ0FBUDtBQUNILEsiLCJmaWxlIjoiVGVtcGxhdGVFbnZpcm9ubWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGVtcGxhdGVOb2RlQ29tcG9uZW50fSBmcm9tICcuL25vZGVzL1RlbXBsYXRlTm9kZUNvbXBvbmVudCc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUNvbnRlbnR9IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlQ29udGVudCc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUF0dHJpYnV0ZX0gZnJvbSAnLi9ub2Rlcy9UZW1wbGF0ZU5vZGVBdHRyaWJ1dGUnO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVTdHJpbmd9IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlU3RyaW5nJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlRXhwcmVzc2lvbn0gZnJvbSAnLi9ub2Rlcy9UZW1wbGF0ZU5vZGVFeHByZXNzaW9uJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlUGF0aH0gZnJvbSAnLi9ub2Rlcy9UZW1wbGF0ZU5vZGVQYXRoJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlU3RyaW5nUHJveHl9IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlU3RyaW5nUHJveHknO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlc30gZnJvbSAnLi9ub2Rlcy9UZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlcyc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUhhc2hBdHRyaWJ1dGV9IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlSGFzaEF0dHJpYnV0ZSc7XG5pbXBvcnQge1RlbXBsYXRlTm9kZUNvbXBpbGVkfSBmcm9tICcuL25vZGVzL1RlbXBsYXRlTm9kZUNvbXBpbGVkJztcbmltcG9ydCB7VGVtcGxhdGVOb2RlQ29tbWVudH0gZnJvbSAnLi9ub2Rlcy9UZW1wbGF0ZU5vZGVDb21tZW50JztcbmltcG9ydCB7VGVtcGxhdGVOb2RlQ2FsbEV4cHJlc3Npb259IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlQ2FsbEV4cHJlc3Npb24nO1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGVQcmltaXRpdmV9IGZyb20gJy4vbm9kZXMvVGVtcGxhdGVOb2RlUHJpbWl0aXZlJztcblxuY29uc3QgRkFDVE9SSUVTID0ge1xuICAgIFRleHQ6IFRlbXBsYXRlTm9kZVN0cmluZyxcbiAgICBCYWxhbmNlZFRhZzogVGVtcGxhdGVOb2RlQ29tcG9uZW50LFxuICAgIFNlbGZDbG9zaW5nVGFnOiBUZW1wbGF0ZU5vZGVDb21wb25lbnQsXG4gICAgRXhwcmVzc2lvbjogVGVtcGxhdGVOb2RlRXhwcmVzc2lvbixcbiAgICBCbG9ja0V4cHJlc3Npb246IFRlbXBsYXRlTm9kZUV4cHJlc3Npb24sXG4gICAgQ2FsbEV4cHJlc3Npb246IFRlbXBsYXRlTm9kZUNhbGxFeHByZXNzaW9uLFxuICAgIFBhdGg6IFRlbXBsYXRlTm9kZUV4cHJlc3Npb24sXG4gICAgQ29tbWVudDogVGVtcGxhdGVOb2RlQ29tbWVudCxcbiAgICBQcmltaXRpdmU6IFRlbXBsYXRlTm9kZVByaW1pdGl2ZVxufTtcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlRW52aXJvbm1lbnQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7fX0gY29tcG9uZW50c1xuICAgICAqIEBwYXJhbSB7e319IGhlbHBlcnNcbiAgICAgKiBAcGFyYW0ge3t9fSBrbm93bkF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih7Y29tcG9uZW50cyA9IHt9LCBoZWxwZXJzID0ge30sIGtub3duQXR0cmlidXRlcyA9IFtdfSkge1xuICAgICAgICB0aGlzLmltcG9ydHMgPSB7fTtcbiAgICAgICAgdGhpcy5oZWxwZXJzID0gaGVscGVycztcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgdGhpcy5rbm93bkF0dHJpYnV0ZXMgPSBrbm93bkF0dHJpYnV0ZXM7XG4gICAgICAgIHRoaXMuc2NvcGVzID0gW107XG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBjb21waWxlKGNvbnRlbnQpIHtcbiAgICAgICAgbGV0IGNvbXBpbGVkQ29udGVudCA9IGNvbnRlbnQuY29tcGlsZSgpO1xuXG4gICAgICAgIGxldCBpbXBvcnRzID0gT2JqZWN0LmtleXModGhpcy5pbXBvcnRzKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgIGxldCB7cGF0aCwgbmFtZX0gPSB0aGlzLmltcG9ydHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIGAke2tleX0gPSByZXF1aXJlKCR7SlNPTi5zdHJpbmdpZnkocGF0aCl9KSR7bmFtZSA/IGAuJHtuYW1lfWAgOiAnJ31gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBob3RNb2R1bGVzID0gT2JqZWN0LmtleXModGhpcy5pbXBvcnRzKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgIGxldCB7cGF0aH0gPSB0aGlzLmltcG9ydHNba2V5XTtcblxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHBhdGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaG1yID0gYGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgICAgICBtb2R1bGUuaG90LmFjY2VwdChbJHtob3RNb2R1bGVzLmpvaW4oJywnKX1dLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAke2ltcG9ydHMuam9pbignO1xcbicpfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNvbnRlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWA7XG5cbiAgICAgICAgbGV0IGltcG9ydHNTdHJpbmcgPSBpbXBvcnRzLmxlbmd0aCA/XG4gICAgICAgICAgICBgdmFyICR7aW1wb3J0cy5qb2luKCcsXFxuJyl9O1xcblxcbmAgOlxuICAgICAgICAgICAgJyc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYCR7aW1wb3J0c1N0cmluZ31tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRleHQpe3JldHVybiAke2NvbXBpbGVkQ29udGVudH19YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBoYXNoXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBpbGVIYXNoKGhhc2gpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IE9iamVjdC5rZXlzKGhhc2gpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KGtleSl9OiR7aGFzaFtrZXldfWBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGB7JHtwYXJhbXMuam9pbignLCcpfX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICovXG4gICAgcmVzb2x2ZUNvbXBvbmVudChuYW1lKSB7XG4gICAgICAgIGxldCBjb21wb25lbnROYW1lID0gJ0NvbXBvbmVudCc7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50c1tuYW1lXSkge1xuICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmltcG9ydHNbY29tcG9uZW50TmFtZV0gPSB7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLmNvbXBvbmVudHNbY29tcG9uZW50TmFtZV0sXG4gICAgICAgICAgICBuYW1lOiBjb21wb25lbnROYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudE5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcmVzb2x2ZUhlbHBlcihuYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmhlbHBlcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIGxldCBoZWxwZXJOYW1lID0gJ18nICsgbmFtZTtcbiAgICAgICAgICAgIHRoaXMuaW1wb3J0c1toZWxwZXJOYW1lXSA9IHtwYXRoOiB0aGlzLmhlbHBlcnNbbmFtZV0sIG5hbWU6ICdkZWZhdWx0J307XG5cbiAgICAgICAgICAgIHJldHVybiBoZWxwZXJOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBjb250ZXh0LiR7bmFtZX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmVSdW50aW1lKG5hbWUpIHtcbiAgICAgICAgbGV0IGZ1bmNOYW1lID0gJ19fJyArIG5hbWU7XG5cbiAgICAgICAgdGhpcy5pbXBvcnRzW2Z1bmNOYW1lXSA9IHtcbiAgICAgICAgICAgIHBhdGg6IHJlcXVpcmUucmVzb2x2ZSgnLi4vUnVudGltZS9ydW50aW1lJyksXG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZ1bmNOYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e319IHNjb3BlXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7e3dhdGNoZXJzOiB7fX19XG4gICAgICovXG4gICAgc2NvcGUoc2NvcGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuc2NvcGVzLnB1c2goc2NvcGUpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gY2FsbGJhY2soc2NvcGUpO1xuICAgICAgICB0aGlzLnNjb3Blcy5wb3AoKTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHt7d2F0Y2hlcnM6IHt9fX1cbiAgICAgKi9cbiAgICBnZXRTY29wZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGVzW3RoaXMuc2NvcGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7e31bXX1cbiAgICAgKi9cbiAgICBmaWx0ZXJTY29wZXMobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZXMuZmlsdGVyKHNjb3BlID0+IHNjb3BlW25hbWVdICE9PSB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBzY29wZVZhbHVlKG5hbWUpIHtcbiAgICAgICAgbGV0IHNjb3BlcyA9IHRoaXMuZmlsdGVyU2NvcGVzKG5hbWUpO1xuXG4gICAgICAgIGlmIChzY29wZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGVzW3Njb3Blcy5sZW5ndGggLSAxXVtuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHdhdGNoZXIobmFtZSkge1xuICAgICAgICBsZXQgc2NvcGVzID0gdGhpcy5maWx0ZXJTY29wZXMoJ3dhdGNoZXJzJyk7XG5cbiAgICAgICAgaWYgKHNjb3Blcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB2YXJOYW1lLCBpbmRleCA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlICghdmFyTmFtZSAmJiBzY29wZXNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgdmFyTmFtZSA9IHNjb3Blc1tpbmRleCsrXS53YXRjaGVyc1tuYW1lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF2YXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyTmFtZSA9IHRoaXMudGVtcFZhcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBzY29wZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVzW2luZGV4XS53YXRjaGVyc1tuYW1lXSA9IHZhck5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YXJOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0ZW1wVmFyKCkge1xuICAgICAgICByZXR1cm4gYHYke3RoaXMuY291bnRlcisrfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0tub3duQXR0cmlidXRlKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua25vd25BdHRyaWJ1dGVzLmluZGV4T2YobmFtZSkgPiAtMSB8fCBuYW1lLmluZGV4T2YoJ2RhdGEtJykgPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7dHlwZTogc3RyaW5nfXxzdHJpbmd9IG5vZGVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGV9XG4gICAgICovXG4gICAgZmFjdG9yeShub2RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhY3RvcnlTdHJpbmcobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmFjdG9yeUNvbnRlbnQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIUZBQ1RPUklFU1tub2RlLnR5cGVdKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub2RlKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlICcgKyBub2RlLnR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEZBQ1RPUklFU1tub2RlLnR5cGVdLmZhY3Rvcnkobm9kZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7dHlwZTogc3RyaW5nfVtdfSBub2Rlc1xuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVtdfVxuICAgICAqL1xuICAgIGZhY3RvcnlOb2Rlcyhub2Rlcykge1xuICAgICAgICByZXR1cm4gbm9kZXMubWFwKG5vZGUgPT4gdGhpcy5mYWN0b3J5KG5vZGUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t0eXBlOiBzdHJpbmd9W119IG5vZGVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlQ29udGVudH1cbiAgICAgKi9cbiAgICBmYWN0b3J5Q29udGVudChub2Rlcykge1xuICAgICAgICByZXR1cm4gVGVtcGxhdGVOb2RlQ29udGVudC5mYWN0b3J5KG5vZGVzLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9fSBub2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlQXR0cmlidXRlfVxuICAgICAqL1xuICAgIGZhY3RvcnlBdHRyaWJ1dGUobm9kZSkge1xuICAgICAgICByZXR1cm4gVGVtcGxhdGVOb2RlQXR0cmlidXRlLmZhY3Rvcnkobm9kZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVN0cmluZ31cbiAgICAgKi9cbiAgICBmYWN0b3J5U3RyaW5nKHN0cmluZykge1xuICAgICAgICByZXR1cm4gVGVtcGxhdGVOb2RlU3RyaW5nLmZhY3Rvcnkoc3RyaW5nLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t9W119IG5vZGVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VGVtcGxhdGVOb2RlU3RyaW5nUHJveHl9XG4gICAgICovXG4gICAgZmFjdG9yeVN0cmluZ1Byb3h5KG5vZGVzKSB7XG4gICAgICAgIHJldHVybiBUZW1wbGF0ZU5vZGVTdHJpbmdQcm94eS5mYWN0b3J5KG5vZGVzLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZVBhdGh9XG4gICAgICovXG4gICAgZmFjdG9yeVBhdGgocGF0aCkge1xuICAgICAgICByZXR1cm4gVGVtcGxhdGVOb2RlUGF0aC5mYWN0b3J5KHBhdGgsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e31bXX0gbm9kZXNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVIYXNoQXR0cmlidXRlc31cbiAgICAgKi9cbiAgICBmYWN0b3J5SGFzaEF0dHJpYnV0ZXMobm9kZXMpIHtcbiAgICAgICAgcmV0dXJuIFRlbXBsYXRlTm9kZUhhc2hBdHRyaWJ1dGVzLmZhY3Rvcnkobm9kZXMsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e31bXX0gbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybnMge1RlbXBsYXRlTm9kZUhhc2hBdHRyaWJ1dGV9XG4gICAgICovXG4gICAgZmFjdG9yeUhhc2hBdHRyaWJ1dGUobm9kZSkge1xuICAgICAgICByZXR1cm4gVGVtcGxhdGVOb2RlSGFzaEF0dHJpYnV0ZS5mYWN0b3J5KG5vZGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICAgICAqIEBwYXJhbSB7e319IG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtUZW1wbGF0ZU5vZGVDb21waWxlZH1cbiAgICAgKi9cbiAgICBmYWN0b3J5Q29tcGlsZWQoY29udGVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFRlbXBsYXRlTm9kZUNvbXBpbGVkKGNvbnRlbnQsIG9wdGlvbnMpO1xuICAgIH1cbn0iXX0=