var path = require("path");
var webpack = require("webpack");

var config = {
    // These are the entry point of our library. We tell webpack to use the name we assign later, when creating the bundle.
    // We also use the name to filter the second entry point for applying code minification via UglifyJS
    entry: {
        'angular-logger2.umd': './src/index.ts',
        'angular-logger2.umd.min': './src/index.ts'
    },
    // The output defines how and where we want the bundles. The special value `[name]` in `filename` tell Webpack to use the name we defined above.
    // We target a UMD and name it MyLib. When including the bundle in the browser it will be accessible at `window.MyLib`
    output: {
        path: path.resolve(__dirname, 'dist-umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'AngularLogger2',
        umdNamedDefine: true
    },
    // Add resolve for `tsx` and `ts` files, otherwise Webpack would only look for common JavaScript file extension (.js)
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        'sprintf-js': 'sprintf-js',
        'moment': 'moment',
        '@angular/core': {root: ['ng', 'core'], commonjs: '@angular/core', commonjs2: '@angular/core', amd: '@angular/core'},
        'rxjs/Rx': {root: 'Rx', commonjs: 'rxjs/Rx', commonjs2: 'rxjs/Rx', amd: 'rxjs/Rx'},
        'rxjs/add/operator/let': {
            root: ['Rx', 'Observable', 'prototype'],
            commonjs: 'rxjs/add/operator/let',
            commonjs2: 'rxjs/add/operator/let',
            amd: 'rxjs/add/operator/let'
        }
    },
    // Activate source maps for the bundles in order to preserve the original source when the user debugs the application
    devtool: 'source-map',
    plugins: [
        // Apply minification only on the second bundle by using a RegEx on the name, which must end with `.min.js`
        // NB: Remember to activate sourceMaps in UglifyJsPlugin since they are disabled by default!
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            sourceMap: true,
            include: /\.min\.js$/
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, './src'), {}
        )
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ]
            }
        ]
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
    },
};

module.exports = config;