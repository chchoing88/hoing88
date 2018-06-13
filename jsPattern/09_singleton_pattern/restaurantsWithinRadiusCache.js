/**
 * Created by merlin.ho on 2017. 6. 11..
 */

var Conference = Conference || {};
Conference.caches = Conference.caches || {};

// 아래처럼 꼭 해야하는 이유는..
// 객체 리터럴로 만들었을때는 캐시 인스턴스가 하나만 있다는 사실이 명백하다.
// 즉, 이말은 객체 리터럴로 만들었다면 인스턴스는 결국 하나밖에 존재할수 없다는 뜻이다.
// 하지만 모듈로 만들었을때 
// 모듈함수를 실행하면 각자 객체 인스턴스를 생성하기 때문이다. 
// 그렇게 되면 이 모듈함수도 싱글톤이라고 말할수 없다. 위험하다.
// 모듈함수를 싱글턴으로 호출할 수 있도록 wrapper 함수를 둔다. 
// 방법은 즉시실행 함수를 응용해서 호출할때마다 같은 인스턴스를 반환하는 
// 단일 함수를 만든다.  


// restaurantApi.getRestaurantsWithinRadius 함수에서
// 캐시로 사용할 simpleCache(싱글톤) 생성..


// 한번만 호출해도 그 이후엔 같은 인스턴스를 계속 리턴한다...
Conference.caches.getRestaurantsWithinRadius = (function () {
  'use strict';

  var instance = null;
  return {
    getInstance: function () {
      if (!instance) {
        instance = Conference.simpleCache();
      }
      return instance;
    }
  }
})();

//
