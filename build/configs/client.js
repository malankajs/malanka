var webpack = require('webpack');
var config = require('./default');

var clientConfig = Object.assign({}, config(), {
    entry: {
        index: [
            // 'webpack-hot-middleware/client',
            __dirname + '/../../example/index.js'
        ]
    },
    output: {
        path: __dirname + '/../../dist',
        filename: 'bundle.js'
    }
});

// clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
clientConfig.plugins.push(new webpack.NoErrorsPlugin());

clientConfig.module.loaders.push({
    test: /.css$/,
    loader: 'style!' + clientConfig.styles
});

module.exports = clientConfig;