/**
 * Created by merlin.ho on 2017. 6. 10..
 */

// API를 통해 객체 리터럴 기반의 캐시 기능을 제공하는 simpleCache 모듈을 개발

var Conference = Conference || {};

Conference.simpleCache = function () {

  'use strict';

  var privateCache = {};

  function getCacheKey(key) {
    return JSON.stringify(key)
  }

  return {
    hasKey: function (key) {
      return privateCache.hasOwnProperty(getCacheKey(key));
    },
    setValue: function (key, value) {
      privateCache[getCacheKey(key)] = value;
    },
    getValue: function (key) {
      return privateCache[getCacheKey(key)];
    }
  }

};