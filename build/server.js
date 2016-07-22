var fs = require('fs');

var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var serverConfig = require('./configs/server');
var clientConfig = require('./configs/client');

var serverPath = '../dist/server/server.js';

var server = new Webpack(serverConfig, (err, stats) => {
    console.log(stats.toString({colors: true}));

    if (err) {
        console.log(err, err.stack);
    } else {

        try {
            delete require.cache[require.resolve(serverPath)];
        } catch (err) {
        }
        console.log('REBUILD SERVER');
    }
});

var client = new Webpack(clientConfig);

var devServer = new WebpackDevServer(client, {
    publicPath: '/assets/',
    stats: {
        colors: true
    },
    features: ["setup", "headers", "middleware"]
});

devServer.use(function (req, res, next) {
    require(serverPath).server.app(req, res, next);
});

devServer.listen(8080, "localhost", function () {
    console.log('Started at http://localhost:8080/');
});
