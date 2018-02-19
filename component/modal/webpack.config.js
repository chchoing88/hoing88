const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const makeHtml = new HtmlWebpackPlugin({
  title: 'Custom Modal',
  template: path.resolve(__dirname,'template/modal.html'),
  filename: 'index.html'
});
const extractCSS = new ExtractTextPlugin('style.bundle.css');
const m_commonCSS = new ExtractTextPlugin('m_common.bundle.css');
const m_sportsCSS = new ExtractTextPlugin('m_sports.bundle.css');


module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/index.js')
      //path.resolve(__dirname, 'src/css/modal.css')
      //path.resolve(__dirname, 'src/scss/m_common.scss'),
      //path.resolve(__dirname, 'src/scss/m_sports.scss')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // output으로 나올 파일이 저장될 경로..
    filename:'[name].js',
    //publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port:7777,
    open:true,
    inline : true
  },
  module: {
    rules:[
      {
        test: /\.jsx?$/,
        exclude:['./node_modules'],
        use:{
          loader: 'babel-loader',
          options:{
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // 10k 이하 이미지는 base64 문자열로 변환
        }]
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(extractCSS.extract({
          fallback: "style-loader",
          use: ['css-loader']
        }))

      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use:['css-loader','resolve-url-loader','sass-loader']
        })
      }
      // {
      //   test: /m_common\.scss$/,
      //   use: m_commonCSS.extract({
      //     fallback: "style-loader",
      //     use:['css-loader','sass-loader']
      //   })
      // },
      // {
      //   test: /m_sports\.scss$/,
      //   use: m_sportsCSS.extract({
      //     fallback: "style-loader",
      //     use:['css-loader','sass-loader']
      //   })
      // }
    ]
  },
  plugins: [
    extractCSS,
    makeHtml,
    new webpack.NamedModulesPlugin()

   // m_sportsCSS,
   // m_commonCSS
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};

//webpack --config webpack.config.prod.js라고 --config 플래그를 사용해 경로를 알려주면 됩니다.