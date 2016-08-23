import glob from 'glob';
import path from 'path';

export class ComponentsScanner {

    /**
     * @param {string[]} components
     * @param {string[]} helpers
     * @param {[]} optimize
     * @param {{}} define
     * @param {{}} [options]
     */
    constructor({components, helpers, optimize, define}, options = {}) {
        this._components = components;
        this._helpers = helpers;

        this.define = define;
        this.optimize = optimize || options.optimize;
    }

    /**
     * Scan paths to resolve Components
     */
    scan() {
        this.components = {
            Component: require.resolve('../Components/Component'),
            AsyncComponent: require.resolve('../Components/AsyncComponent'),
            TextComponent: require.resolve('../Components/TextComponent'),
            RegionComponent: require.resolve('../Components/RegionComponent'),
            CollectionComponent: require.resolve('../Components/CollectionComponent'),
            ValueProxy: require.resolve('../Data/ValueProxy')
        };

        this.helpers = {
            'if': require.resolve('../runtime/ifHelper'),
            'each': require.resolve('../runtime/eachHelper'),
            'log': require.resolve('../runtime/logHelper'),
            'watch': require.resolve('../runtime/watchHelper')
        };
        
        this._helpers.map(path => this.scanHelpers(path));
        this._components.map(path => this.scanComponents(path));
    }

    /**
     * @param {string} pattern
     */
    scanHelpers(pattern) {
        glob.sync(pattern).forEach(filepath => {
            let helperName = path.basename(filepath, '.js');
            this.helpers[helperName] = filepath;
        });
    }
    
    /**
     * @param {string} pattern
     */
    scanComponents(pattern) {
        glob.sync(pattern).forEach(filepath => {
            let componentName = path.basename(filepath, '.js');

            if (componentName.match(/^[A-Z]/)) {
                this.components[componentName] = filepath;
            }
        });
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {{plugin: function}} compiler
     */
    apply(compiler) {
        compiler.options.scanner = this;
        
        compiler.plugin('compilation', () => this.scan());
    }
}
