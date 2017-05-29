/**
 * Created by merlin.ho on 2017. 5. 11..
 */

Aop = {
  around: function(fnName,advice,fnObj){
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function(){
      var targetContext = {};
      return advice.call(this, {fn:originalFn,args:arguments});
    };



    //fnObj[fnName] = advice;
  },
  next: function(targetInfo){
   // targetInfo.fn();
    return targetInfo.fn.apply(this,targetInfo.args);
  }
};
