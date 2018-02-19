/**
 * Created by merlin.ho on 2017. 8. 2..
 */

function extend(){

  var argsArray = Array.prototype.slice.call(arguments);
  var target = argsArray.splice(0,1)[0];
  var length = argsArray.length;

  for(var i = length-1; i >= 0; i--){
    var obj = argsArray[i];

    if(obj === null || typeof(obj) !== 'object'){
      return new Error('arguments is not Object!!');
    }

    for ( var attr in obj ){
      if( obj.hasOwnProperty(attr) ){
        target[attr] = obj[attr];
      }
    }
  }


  return target;
}


export default extend;