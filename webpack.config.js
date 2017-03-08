var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var nodeExternals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
// var clientLoaders = isProduction ? productionPluginDefine.concat([
//   new webpack.optimize.DedupePlugin(),
//   new webpack.optimize.OccurrenceOrderPlugin(),
//   new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
// ]) : [];
var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];
var devUrl = 'http://localhost:3000/api/v1';
//var devUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';

var prodUrl = 'https://tranquil-springs-59529.herokuapp.com/api/v1';

var apiUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

module.exports = [
{
    entry: './app/server.js',
    output: {
      path: './public',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    plugins: productionPluginDefine,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
                  query: {
          presets: ['react', 'es2015']
        }
        }
      ].concat(commonLoaders)
    }
  },
  {
    entry: './app/App.js',
    output: {
      path: './public/assets',
      publicPath: '/',
      filename: 'bundle.js'
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
    new ExtractTextPlugin('styles-[hash].css'),
  ]
}
]
