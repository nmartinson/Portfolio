var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');



var devUrl = 'http://localhost:3000/api/v1';
//var devUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';

var prodUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';

var apiUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        combineLoaders([{
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }])
      )}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
        'API_URL': JSON.stringify(apiUrl)
      }
    }),
    new ExtractTextPlugin('styles.css'),
  ]
}
