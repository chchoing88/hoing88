/**
 * Created by merlin.ho on 2017. 6. 10..
 */
var Aspects = Aspects || {};


// 문제 제기
// 캐싱처리를 하는 함수가 있다고 하자. 예를 들면 08장에 있는 returnValueCache.js 이다.
// 이 함수에서 서로 다른 인스턴스를 만들었다고 치자. 그럼 인스턴스들이 
// 서로다른 인스턴스에 캐시된 값들을 이용할 수가 없다. 

// 이럴땐 공유 캐시로 사용할 객체 리터럴을 주입하는게 가장 빠른 길이다.
// 공유 캐시가 객체 리터럴 (키/값) 정도면 캐시용도로 나쁘지 않은데
// 더 다양한 기능이 들어간 캐시를 써야 할 때도 있다.
// 이를테면 가장 오래전에 캐시한 값을 가장 최근 캐시값으로 대체하면서 항상
// 일정한 개수의 값들만 남기는, 최저사용빈도(LRU) 캐시가 있어야 할때도 있고..


Aspects.returnValueCache = function (sharedCache) {
  'use strict';

  //var cache = sharedCache || {};
  var cache = sharedCache || Conference.simpleCache();

  return {
    advice: function (targetInfo) {

      // 함수에 넘긴 인자를 캐시 키로 이용한다..
      // ( 객체 참조값 비교가 아닌, 문자열 비교를 하귀 위해 문자열로 바꾼다..)

      var cacheKey = JSON.stringify(targetInfo.args);

      // if(cache.hasOwnProperty(cacheKey)){
      //   return cache[cacheKey];
      // }

      if (cache.hasKey(cacheKey)) {
        return cache.getValue(key);
      }

      // 장식된 함수를 가져와 실행한뒤
      // 그 반환값을 캐슁 저장한다..
      var returnValue = Aop.next(targetInfo);
      //cache[cacheKey] = returnValue;
      cache.setValue(cacheKey, returnValue);
      return returnValue;
    }
  }
};
