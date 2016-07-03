var Webpack = require('webpack');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var fs = require('fs');

var serverConfig = require('./configs/server');
var clientConfig = require('./configs/client');

var server = new Webpack(serverConfig, (err, stats) => {
    if (!err) {
        if (fs.existsSync('../dist/server.js')) {
            delete require.cache[require.resolve('../dist/server')];
        }

        console.log('REBUILD SERVER');
    } else {
        console.log(err, err.stack);
        
        console.log(stats);
    }
});

var client = new Webpack(clientConfig);

var app = express();

app.use(webpackDevMiddleware(client, {}));
app.use(webpackHotMiddleware(client, {}));

app.use(function (req, res, next) {
    require('../dist/server').server.default(req, res, next);
});

app.listen(8080);