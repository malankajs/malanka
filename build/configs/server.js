var config = require('./default');

module.exports = Object.assign({}, config, {
    watch: true,
    target: 'node',
    
    entry: {
        index: __dirname + '/../../example/server.js'
    },
    output: {
        library: 'server',
        libraryTarget: 'commonjs',
        path: __dirname + '/../../dist',
        filename: 'server.js'
    },

    externals: {
        'fs': 'commonjs fs',
        'path': 'commonjs path',
        'glob': 'commonjs glob',
        'express': 'commonjs express',
        'webpack': 'commonjs webpack',
        'source-map-support': 'commonjs source-map-support',
        'webpack-dev-middleware': 'commonjs webpack-dev-middleware'
    }
});