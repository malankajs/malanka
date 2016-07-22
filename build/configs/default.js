var ComponentsScanner = require('../../es5/Build/ComponentsScanner').ComponentsScanner;
var TrimSpacesOptimizer = require('../../es5/Template/optimizer/TrimSpacesOptimizer').TrimSpacesOptimizer;
var StylesOptimizer = require('../../es5/Template/optimizer/StylesOptimizer').StylesOptimizer;
var RequireOptimizer = require('../../es5/Template/optimizer/RequireOptimizer').RequireOptimizer;
var Webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var DEBUG = process.env.NODE_ENV !== 'production';

var className = DEBUG ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:4]&minimize';

var hotComponent = require.resolve('../hotComponent');


module.exports = () => {
    var extractTextWebpackPlugin = new ExtractTextWebpackPlugin('styles.css', {
        allChunks: true
    });

    var config = {
        info: true,
        debug: DEBUG,
        stats: {colors: true},
        styles: 'css?modules&importLoaders=1&localIdentName=' + className,

        module: {
            loaders: [
                {
                    test: /.js$/,
                    loader: /*hotComponent + */'babel?cacheDirectory',
                    exclude: /es5/
                },
                {
                    test: /.hbs$/,
                    loader: require.resolve('../../es5/Template/loader')
                },
                {
                    test: /.css$/,
                    loader: extractTextWebpackPlugin.extract('css?modules&importLoaders=1&localIdentName=' + className)
                }
            ]
        },
        devtool: DEBUG ? 'inline-source-map' : false,

        plugins: [
            new ComponentsScanner({
                helpers: [
                    __dirname + '/../../example/helpers/*.js'
                ],
                components: [
                    __dirname + '/../../example/components/**/*.js'
                ]
            }, {
                optimize: {
                    plugins: [
                        new TrimSpacesOptimizer(),
                        new StylesOptimizer(),
                        new RequireOptimizer()
                    ]
                }
            }),
            new Webpack.optimize.OccurenceOrderPlugin(),
            extractTextWebpackPlugin
        ]
    };

    if (!DEBUG) {
        config.plugins.push(new Webpack.optimize.OccurenceOrderPlugin());
        config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            semicolons: false,
            mangle: true,
            compress: {
                warnings: true
            }
        }));
        config.plugins.push(new Webpack.optimize.DedupePlugin());
    }
    
    return config;
};