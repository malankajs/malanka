import {parse} from './TemplateParser.js';
import {TemplateTransformer} from './TemplateTransformer';
import {TemplateEnvironment} from './TemplateEnvironment';
import {TemplatePlugin} from './plugins/TemplatePlugin';

export const DEFAULTS = {
    helpers: {},
    components: {}
};

export class TemplateCompiler {
    protected imports: Object;
    protected define: Object;
    protected helpers: Object;
    protected plugins: TemplatePlugin[];
    protected components: Object;
    protected runtimePath: string|undefined;
    protected counter: number;

    /**
     */
    constructor({
        components = DEFAULTS.components as Object,
        helpers = DEFAULTS.helpers as Object,
        plugins = ([] as TemplatePlugin[]),
        define = ({} as Object),
        runtimePath =  (undefined as string)
    } = {}) {
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
            transformer = new TemplateTransformer({plugins: this.plugins});

        return env.compile(transformer.transform(content));
    }

}
