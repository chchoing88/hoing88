const webpack = require('webpack');
const path = require('path');
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const EditFilePlugin = require("./editFileContentsPlugin");
// const StyleLintPlugin = require('stylelint-webpack-plugin');


//const testCss1 = new ExtractTextPlugin('test1.bundle.css');
const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  allChunks: true
  //disable: process.env.NODE_ENV === "development"
});

const arryfileEntry = glob.sync("./src/scss/**/*.scss").map((filePath)=>{
  let obj = {};
  let cssName = filePath.replace(/scss/i,'css').slice(1,filePath.lastIndexOf('.')-1);
  obj[cssName] = filePath;
  return obj;
});


const makeObject = (arr) => {
  let obj = {};
  arr.map((item)=>{
    Object.assign(obj , item);
  });

  return obj;
}

const objFileEntry = makeObject(arryfileEntry);

console.log(objFileEntry);

module.exports = {
  entry: objFileEntry,
  output:{
    path: path.resolve(__dirname, './'), // output으로 나올 파일이 저장될 경로..
    filename:'[name].css'
  },
  devtool : 'inline-source-map',
  module:{
      rules:[
        {
          test: /\.scss$/,
          use: extractSass.extract({
            fallback: "style-loader",
            use: [{
              loader: "css-loader",
              options:{
                importLoaders: 1,
                sourceMap: true
              }
                },{
              loader: "postcss-loader",
              options: {
                config:{
                  path: './postcss.config.js',
                  },
                  sourceMap: true
                }
              },{
              loader: "sass-loader",
              options: {
                outputStyle: "compact",
                sourceMap: true
               }
            }]
          })
        }
      ]
  },
  plugins:[
    //new EditFilePlugin({options:true}),
    extractSass,
    // new StyleLintPlugin({
    //   files : './src/css/**/*.css',
    //   fix : true
    // }),
    new webpack.NamedModulesPlugin()
  ],
  resolve:{
    extensions:['.js','.scss']
  }
};