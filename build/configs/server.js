var config = require('./default');

var serverConfig = Object.assign({}, config(), {
    watch: true,
    target: 'node',

    entry: {
        index: __dirname + '/../../example/server.js'
    },
    output: {
        library: 'server',
        libraryTarget: 'commonjs',
        path: __dirname + '/../../dist/server',
        filename: 'server.js'
    },

    externals: {
        'fs': 'commonjs fs',
        'got': 'commonjs got',
        'path': 'commonjs path',
        'glob': 'commonjs glob',
        'lodash': 'commonjs lodash',
        'express': 'commonjs express',
        'webpack': 'commonjs webpack',
        'source-map': 'commonjs source-map',
        'source-map-support': 'commonjs source-map-support',
        'webpack-dev-middleware': 'commonjs webpack-dev-middleware'
    }
});

module.exports = serverConfig;