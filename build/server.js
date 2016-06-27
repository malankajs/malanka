var Webpack = require('webpack');

var webpackDevMiddleware = require('webpack-dev-middleware');
var express = require('express');

var serverConfig = require('./configs/server');
var clientConfig = require('./configs/default');

var server = new Webpack(serverConfig, (err, stats) => {
    if (!err) {
        delete require.cache[require.resolve('../dist/server')];
        console.log('REBUILD SERVER');
    } else {
        console.log(err);
    }
});

var client = new Webpack(clientConfig);

var app = express();

app.use(webpackDevMiddleware(client, {
    
}));

app.use(function(req, res, next) {
    require('../dist/server').server.default(req, res, next);
});

app.listen(8080);