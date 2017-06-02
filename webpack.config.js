var webpack = require('webpack');
var path = require('path');

var PROD = true;

// Webpack Config
var webpackConfig = {
    entry: {
        'logging.module': './src/logging.module.ts'
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './dist'),
    },

    plugins: (PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            sourceMap: true
        })
    ] : []).concat([
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './src'), {}
        )
    ]),

    externals: {
        'sprintf-js': 'sprintf-js',
        'moment': 'moment',
        '@angular/core': 'commonjs @angular/core'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ]
            }
        ]
    }

};


// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-source-map',

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
