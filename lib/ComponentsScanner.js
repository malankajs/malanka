import glob from 'glob';
import path from 'path';

export class ComponentsScanner {

    /**
     * @param {string[]} components
     * @param {string[]} helpers
     * @param {{}} optimize
     */
    constructor({components, helpers}, {optimize} = {}) {
        this._components = components;
        this._helpers = helpers;
        
        this.optimize = optimize;
    }

    /**
     * Scan paths to resolve components
     */
    scan() {
        this.components = {
            Component: require.resolve('./Component'),
            TextComponent: require.resolve('./TextComponent'),
            RegionComponent: require.resolve('./RegionComponent'),
            CollectionComponent: require.resolve('./CollectionComponent'),
            ValueProxy: require.resolve('./ValueProxy')
        };

        this.helpers = {
            'if': require.resolve('./runtime/ifHelper'),
            'each': require.resolve('./runtime/eachHelper'),
            'log': require.resolve('./runtime/logHelper')
        };
        
        this._helpers.map(path => this.scanHelpers(path));
        this._components.map(path => this.scanComponents(path));
    }

    /**
     * @param {string} pattern
     */
    scanHelpers(pattern) {
        glob.sync(pattern).forEach(filepath => {
            let helperNmae = path.basename(filepath, '.js');
            this.helpers[helperNmae] = filepath;
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

    /**
     * @param {{plugin: function}} compiler
     */
    apply(compiler) {
        compiler.options.scanner = this;
        
        compiler.plugin('compilation', (a, callback) => this.scan());
    }
}