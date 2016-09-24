import {parse} from './TemplateParser';
import {TemplateTransformer} from './TemplateTransformer';
import {TemplateEnvironment} from './TemplateEnvironment';

export const DEFAULTS = {
    helpers: {},
    components: {}
};

export class TemplateCompiler {

    /**
     * @param {{}} components
     * @param {{}} helpers
     * @param {{}[]} plugins
     * @param {{}} define
     * @param {string} runtimePath
     */
    constructor({
        components = DEFAULTS.components,
        helpers = DEFAULTS.helpers,
        plugins = [],
        define = {},
        runtimePath
    } = DEFAULTS) {
        this.imports = {};
        this.counter = 0;

        this.define = define;
        this.helpers = helpers;
        this.plugins = plugins;
        this.components = components;
        this.runtimePath = runtimePath;
    }

    /**
     * @param {string} template
     * @returns {string}
     */
    compileString(template) {
        var AST = parse(template),
            env = new TemplateEnvironment({
                define: this.define,
                helpers: this.helpers,
                components: this.components,
                runtimePath: this.runtimePath
            }),
            content = env.factoryContent(AST),
            transformer = new TemplateTransformer(this);

        return env.compile(transformer.transform(content));
    }

}
