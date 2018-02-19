/**
 * Created by merlin.ho on 2017. 9. 16..
 */
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 7000,
    contentBase: __dirname + '/public/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader : 'react-hot-loader'
          },
          {
            loader : 'babel-loader',
            options : {
              presets: ['es2015','stage-0', 'react']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}