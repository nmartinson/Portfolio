const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = [
    {
    entry: './server.js',
    output: {
        path: './app',
        filename: 'server.bundle.js',
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    target: 'node',
    externals: [nodeExternals()]
    //If you want to minify your files uncomment this
    // ,
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false,
    //         },
    //         output: {
    //             comments: false,
    //         },
    //     }),
    // ]
    },
    {
        entry: './app/App.js',
        output: {
            path: './bin',
            filename: 'bundle.js',
        },
        module: {
            loaders: [{
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }]
        }
        //If you want to minify your files uncomment this
        // ,
        // plugins: [
        //     new webpack.optimize.UglifyJsPlugin({
        //         compress: {
        //             warnings: false,
        //         },
        //         output: {
        //             comments: false,
        //         },
        //     }),
        // ]
    }
]