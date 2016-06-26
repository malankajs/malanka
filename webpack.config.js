var ComponentsScanner = require('./es5/ComponentsScanner').ComponentsScanner;
var TrimSpacesOptimizer = require('./es5/Template/optimizer/TrimSpacesOptimizer').TrimSpacesOptimizer;
var StylesOptimizer = require('./es5/Template/optimizer/StylesOptimizer').StylesOptimizer;

var DEBUG = process.env.NODE_ENV !== 'production';

var className = DEBUG ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]&minimize';

module.exports = {
    debug: DEBUG,
    entry: {
        index: './example/index.js'
    },
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /.js$/, loader: 'babel?cacheDirectory'},
            {test: /.peg$/, loader: 'peg'},
            {test: /.hbs$/, loader: require.resolve('./es5/Template/loader')},
            {test: /.css$/, loader: 'style!css?modules&importLoaders=1&localIdentName=' + className} // + '!postcss'
        ]
    },
    devtool: DEBUG ? 'inline-source-map' : false,

    plugins: [
        new ComponentsScanner([
            __dirname + '/example/components/**/*.js'
        ], {
            optimize: {
                plugins: [
                    new TrimSpacesOptimizer(),
                    new StylesOptimizer()
                ]
            }
        })
    ]
};