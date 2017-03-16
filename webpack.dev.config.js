const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// var devUrl = 'http://localhost:3000/api/v1';
var devUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';
var prodUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';
var apiUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
var path = require('path');


module.exports = 
    {
        entry: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            './app/App.js'
        ],
        output: {
            path: '/',
            publicPath: 'http://localhost:8000/',
            filename: 'bundle.js',
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
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
            ]
        },
        devtool: 'eval',
        plugins: [
            new CopyWebpackPlugin([
                { from: 'assets' }, {from: 'app/css'}
            ]),
            new ExtractTextPlugin('styles.css'),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            // new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(apiUrl),
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
            }),
        ]
    }
