
function setStyle(selector , cssObj){
  var element = selector;
  if(typeof selector === 'string'){
    element = document.querySelectorAll(selector);
  }

  for(var value in cssObj){
    cssObj[value] = cssObj[value]+";";
  }

  var cssString = JSON.stringify(cssObj);
  cssString = cssString.replace(/\{|\}|\"/ig,'');

  if(selector instanceof NodeList){
    var length = selector.length;
    for(var i = length-1; i >= 0; i--){
      element[i].style.cssText += cssString;
    }
  }else{
    element.style.cssText += cssString;
  }



}

export default setStyle;