/**
 * Created by merlin.ho on 2017. 6. 11..
 */

var Conference = Conference || {};
Conference.caches = Conference.caches || {};

// restaurantApi.getRestaurantsWithinRadius 함수에서
// 캐시로 사용할 simpleCache(싱글톤) 생성..


// 한번만 호출해도 그 이후엔 같은 인스턴스를 계속 리턴한다...
Conference.caches.getRestaurantsWithinRadius = (function(){
  'use strict';

  var instance = null;
  return {
    getInstance : function(){
      if(!instance){
        instance = Conference.simpleCache();
      }
      return instance;
    }
  }
})();

//
