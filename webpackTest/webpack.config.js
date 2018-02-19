/**
 * Created by merlin.ho on 2017. 5. 31..
 */


var webpack = require('webpack');
const path = require('path');

module.exports = {
  // 파일을 읽어들이기 시작하는 부분.
  entry: {
    app:['./src/a.js']
  },
  output:{
    path: path.resolve(__dirname, 'dist'), // output으로 나올 파일이 저장될 경로..
    filename:'[name].js',
   // publicPath:'/' //파일들이 위치할 서버 상의 경로..
  },
  module:{
    rules:[
      // {
      //   test:/\.jsx?$/, // 정규식조건에 부합하는 파일들을 loader에 지정한 로더가 컴파일 해줍니다...
      //   loader: 'babel-loader',
      //   options:{
      //     presets: ['es2015', 'stage-0'],
      //   },
      //   //exclude:['./node_modules']
      // },
      {
        test:/\.css$/,
        use:['style-loader','css-loader'] // loader로 써도 된다... css-loader로 처리한뒤 그것을 style-loader로 한번 더 처리.
      }
    ]
  },
  plugins:[
    // new webpack.LoaderOptionsPlugin({
    //   minimize:true,
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap:true,
    //   compress:{
    //     warnings:true
    //   }
    // }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  resolve:{
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};