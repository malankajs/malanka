import glob from 'glob';
import path from 'path';

export class ComponentsScanner {

    /**
     * @param {string[]} paths
     * @param {{}} optimize
     */
    constructor(paths, {optimize} = {}) {
        this._paths = paths;
        this.optimize = optimize;
    }

    /**
     * Scan paths to resolve components
     */
    scan() {
        return this._paths.map(path => this.scanPath(path));
    }

    /**
     * @param {string} pattern
     */
    scanPath(pattern) {
        this.components = {
            Component: require.resolve('./Component'),
            ValueProxy: require.resolve('./ValueProxy')
        };

        this.helpers = {
            'if': require.resolve('./runtime/ifHelper'),
            'each': require.resolve('./runtime/eachHelper')
        };
        
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