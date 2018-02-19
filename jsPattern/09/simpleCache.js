/**
 * Created by merlin.ho on 2017. 6. 10..
 */


var Conference = Conference || {};

Conference.simpleCache = function(){

  'use strict';

  var privateCache = {};

  function getCacheKey(key){
    return JSON.stringify(key)
  }

  return {
    hasKey:function(key){
      return privateCache.hasOwnProperty(getCacheKey(key));
    },
    setValue:function (key, value) {
      privateCache[getCacheKey(key)] = value;
    },
    getValue:function(key){
      return privateCache[getCacheKey(key)];
    }
  }

};