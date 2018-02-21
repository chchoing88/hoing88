/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 4000,
    contentBase: __dirname + '/public/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0', 'react'],
              cacheDirectory: true,
              plugins: [
                'react-hot-loader/babel'
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: ['node_modules']
  }
}