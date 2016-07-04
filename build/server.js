var Webpack = require('webpack');

// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
var WebpackDevServer = require('webpack-dev-server');

var express = require('express');
var fs = require('fs');

var serverConfig = require('./configs/server');
var clientConfig = require('./configs/client');

var serverPath = '../dist/server/server.js';

var server = new Webpack(serverConfig, (err, stats) => {
    if (err) {
        console.log(err, err.stack);
        console.log(stats);
    } else {
        try {
            delete require.cache[require.resolve(serverPath)];
        } catch (err) {
        }

        console.log('REBUILD SERVER');
    }
});

var client = new Webpack(clientConfig);

var app = express();

// app.use(webpackDevMiddleware(client, {
//     noInfo: false
// }));
// app.use(webpackHotMiddleware(client, {}));

app.use(function (req, res, next) {
    require(serverPath).server.default(req, res, next);
});

app.listen(8081);

var devServer = new WebpackDevServer(client, {
    publicPath: '/assets/',
    stats: {
        colors: true
    },
    // filename: "bundle.js",
    proxy: {
        '*': 'http://localhost:8081'
    }
});

devServer.listen(8080, "localhost", function () {
});
