const editFileCotentsPlugin = require('./editFileContentsPlugin');


module.exports = {
    parser: 'postcss-scss',
    plugins:[
      require('autoprefixer')(),
      require('stylelint')({fix:true}),
      require('./editFileContentsPlugin')()
    ]
    // plugins: {
    //   'autoprefixer': {},
    //   //'stylefmt':{},     
    //   'postcss-backwards':{},
    //   'stylelint':{
    //     fix : true
    //   },
      
    //}
  }