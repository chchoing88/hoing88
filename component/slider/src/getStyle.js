/**
 * Created by merlin.ho on 2017. 8. 1..
 */

function getStyle(selector, property){
  var element = selector;
  if(typeof selector === 'string'){
    element = document.querySelector(selector);
  }


  var pro = window.getComputedStyle(element,null).getPropertyValue(property);
  return isNaN(parseFloat(pro))? pro : parseFloat(pro);
}


export default getStyle;