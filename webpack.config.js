const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// var HtmlWebpackPlugin = require('html-webpack-plugin');

// var devUrl = 'http://localhost:3000/api/v1';
var devUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';

var prodUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';

var apiUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
var path = require('path');

module.exports = [
    // {
    // entry: './server.js',
    // output: {
    //     path: path.join(__dirname, 'public/'),
    //     filename: 'server.bundle.js',
    // },
    // module: {
    //     loaders: [{
    //         exclude: /node_modules/,
    //         loader: 'babel-loader',
    //         query: {
    //             presets: ['react', 'es2015', 'stage-1']
    //         }
    //     }]
    // },
    // target: 'node',
    // externals: [nodeExternals()],
    // // externals:{
    // //     'react-helmet': 'ReactHelmet',
    // // },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.API_URL': JSON.stringify(apiUrl),
    //         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
    //     })
    //   ]
    // //If you want to minify your files uncomment this
    // // ,
    // // plugins: [
    // //     new webpack.optimize.UglifyJsPlugin({
    // //         compress: {
    // //             warnings: false,
    // //         },
    // //         output: {
    // //             comments: false,
    // //         },
    // //     }),
    // // ]
    // },
    {
        // context: path.join(__dirname, 'Portfolio'),
        entry: './app/App.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js',
            publicPath: 'wwww.portfolio.boundless-journey.com/'
        },
        module: {
            loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                        include: path.resolve(__dirname, '..'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
            }
            ]
        },
        devtool: 'cheap-module-source-map',
        plugins: [
            new CopyWebpackPlugin([
                { from: 'assets' }, {from: 'app/css'}
            ]),
            // new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(apiUrl),
                'process.env.NODE_ENV': '"production"'//JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                sourceMap: true,
                minimize: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            }),
            new webpack.optimize.DedupePlugin(), //dedupe similar code
            new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
            new CompressionPlugin({
              asset: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0.8
            }),
            // new HtmlWebpackPlugin({
            //   template: 'src/index.html',
            //   minify: {
            //     collapseWhitespace: true,
            //     removeComments: true,
            //     removeRedundantAttributes: true,
            //     removeScriptTypeAttributes: true,
            //     removeStyleLinkTypeAttributes: true
            //   }
            // }),
        ]
    }
]