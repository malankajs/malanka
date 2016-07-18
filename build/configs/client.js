var webpack = require('webpack');
var config = require('./default');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var clientConfig = Object.assign({}, config(), {
    entry: {
        index: [
            __dirname + '/../../example/index.js'
        ]
    },
    output: {
        path: __dirname + '/../../dist/client/assets',
        filename: 'bundle.js',
        publicPath: '/assets/'
    }
});

// clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
clientConfig.plugins.push(new webpack.NoErrorsPlugin());

// clientConfig.module.loaders.push({
//     test: /.css$/,
//     loader: 'style!' + clientConfig.styles
// });

clientConfig.module.loaders.push({
    test: /.css$/,
    loader: ExtractTextWebpackPlugin.extract(clientConfig.styles)
});

clientConfig.plugins.push(new ExtractTextWebpackPlugin('styles.css'));

if (clientConfig.debug) {
    clientConfig.entry.index.push('webpack-dev-server/client?http://localhost:8080/');
}

module.exports = clientConfig;