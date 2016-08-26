import {parse} from './TemplateParser';
import {TemplateOptimizer} from './TemplateOptimizer';
import {TemplateEnvironment} from './TemplateEnvironment';

export const DEFAULTS = {
    knownAttributes: ['class', 'id', 'value', 'name', 'style'],
    helpers: {},
    components: {}
};

export class TemplateCompiler {

    constructor({
        components = DEFAULTS.components,
        helpers = DEFAULTS.helpers,
        knownAttributes = DEFAULTS.knownAttributes,
        optimize,
        define = {}
    } = DEFAULTS) {
        this.imports = {};
        this.counter = 0;

        this.define = define;
        this.helpers = helpers;
        this.optimize = optimize;
        this.components = components;
        this.knownAttributes = knownAttributes;
    }

    /**
     * @param {string} template
     * @returns {string}
     */
    compileString(template) {
        var AST = parse(template),
            env = new TemplateEnvironment({
                components: this.components,
                helpers: this.helpers,
                knownAttributes: this.knownAttributes,
                define: this.define
            }),
            content = env.factoryContent(AST),
            optimizer = new TemplateOptimizer(this.optimize);

        return env.compile(optimizer.optimize(content));
    }

}
