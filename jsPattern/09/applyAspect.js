/**
 * Created by merlin.ho on 2017. 6. 10..
 */

// 9장. 싱글톤 패턴
// 다중 객체 인스턴스를 만들 필요가 없거나, 오히려 만들면 안 될때도 있다 이렇게 하나의 객체 인스턴스만 
// 존재해야 할 때는 싱글톤 패턴을 사용한다.
// 우선 자바스크립트는 기본적으로 싱글 스레드 언어라 자바스크립트 싱글톤 생성 시 여러 스레드가 
// 동시에 한 객체에 접근하면서 벌어지는 골치 아픈 문제는 신경 쓰지 않아도 된다. 




//var Conference = Conference || {};
//Conference.caches = Conference.caches || {};

//restaurantApi.getRestaurantsWithinRadius 함수에서
// 캐시로 사용할 객체 리터럴(싱글톤) 생성

// 여기에 캐시를 저장하는 싱글톤 생성..
//Conference.caches.restaurantsWithinRadiusCache = {};

// 싱글톤 캐시 인스턴스를 가져온다..
// 단 한번만 호출해도 같은 인스턴스를 가져온다...
var cache = Conference.caches.getRestaurantsWithinRadius(); // return Conference.simpleCache()

// getRestaurantsWithinRadius 에 메모이제이션 패턴 적용..

Aop.around(
  'restaurantApi',
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo) {

    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo);

    // getRestaurantsWithinRadius 함수를 장식하여
    // 메모이제이션( 공유 캐시로 ) 추가
    Aop.around(
      'getRestaurantsWithinRadius',
      Aspects.returnValueCache(cache).advice,
      api
    );

    // 고친 api를 반환한다.
    return api;
  },
  ThirdParty
);
