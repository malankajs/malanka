import glob from 'glob';
import {basename} from 'path';

export class ComponentsScanner {
    public components: Object;
    public helpers: Object;
    public define: Object;
    public plugins: Object;

    protected _components: string[];
    protected _helpers: string[];

    /**
     * @param {string[]} components
     * @param {string[]} helpers
     * @param {[]} plugins
     * @param {{}} define
     */
    constructor({components, helpers, plugins, define}) {
        this._components = components;
        this._helpers = helpers;

        this.define = define;
        this.plugins = plugins;
    }

    /**
     * Scan paths to resolve Components
     */
    protected scan() {
        this.components = {
            Component: require.resolve('../Components/Component'),
            AsyncComponent: require.resolve('../Components/AsyncComponent'),
            TextComponent: require.resolve('../Components/TextComponent'),
            RegionComponent: require.resolve('../Components/RegionComponent'),
            CollectionComponent: require.resolve('../Components/CollectionComponent'),
            ValueProxy: require.resolve('../Data/ValueProxy')
        };

        this.helpers = {
            'if': require.resolve('../Runtime/ifHelper'),
            'each': require.resolve('../Runtime/eachHelper'),
            'log': require.resolve('../Runtime/logHelper'),
            'watch': require.resolve('../Runtime/watchHelper')
        };
        
        this._helpers.map(path => this.scanHelpers(path));
        this._components.map(path => this.scanComponents(path));
    }

    /**
     * @param {string} pattern
     */
    protected scanHelpers(pattern) {
        glob.sync(pattern).forEach(filepath => {
            let helperName = basename(filepath, '.js');
            this.helpers[helperName] = filepath;
        });
    }
    
    /**
     * @param {string} pattern
     */
    protected scanComponents(pattern) {
        glob.sync(pattern).forEach(filepath => {
            let componentName = basename(filepath, '.js');

            if (componentName.match(/^[A-Z]/)) {
                this.components[componentName] = filepath;
            }
        });
    }

    /**
     * @param {{plugin: function}} compiler
     */
    public apply(compiler) {
        compiler.options.scanner = this;
        
        compiler.plugin('compilation', () => this.scan());
    }
}
