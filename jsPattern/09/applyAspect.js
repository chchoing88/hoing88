/**
 * Created by merlin.ho on 2017. 6. 10..
 */

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
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo){

    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this,targetInfo);

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
