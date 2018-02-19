/**
 * Created by merlin.ho on 2017. 7. 18..
 */

var A = A || {};
///// jquery
A = function A(selector){

  if(!(this instanceof A)){
    return new A(selector);
  }

  this.dom = document.querySelector(selector);

};

////// 도구들...
A.tools = A.tools || {};

A.tools.show = function(selector){
  var element = selector;
  if(typeof selector === 'string'){
    element = document.querySelector(selector);
  }
  element.style.display = 'block';

  return element;
};

A.tools.hide = function(selector){
  var element = selector;
  if(typeof selector === 'string'){
    element = document.querySelector(selector);
  }

  element.style.display = 'none';

  return element;
};


A.tools.remove = function(selector){
  var element = selector;
  if(typeof selector === 'string'){
    element = document.querySelector(selector);
  }
  var parent = element.parentElement;
  parent.removeChild(element);

};