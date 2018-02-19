var postcss = require('postcss');

module.exports = postcss.plugin('postcss-backwards', function (opts) {
  opts = opts || {};
  return function (css, result) {

    // Runs through all of the nodes (declorations) in the file
    css.walkDecls(declaration => { 
      declaration.value = declaration.value.split('').reverse().join(''); 
    });

  };
});