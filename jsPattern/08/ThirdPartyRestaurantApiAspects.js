/**
 * Created by merlin.ho on 2017. 6. 10..
 */

// 07 폴더 ThirdPartyRestaurantApi.js 가 제 3에서 제공해주는 레스토랑 api
// 그 api 중에서 getRestaurantsWithinRadius를 사용하는데...이미 검색했던 내용들은 캐쉬해서 저장해놓고 싶다...
// 그리고 해당 api 중에서 addGetRestaurantsNearConference 를 추가하는데 이 함수는 이미 정해진 주소와 반경을 가지고 있다...

// 느낌이 .. api를 확장하는 느낌
// 처음엔 api의 getRestaurantsWithinRadius 를 메모이제이션 패턴으로 확장을 하고 
// 그 다음엔 다시 getRestaurantsWithinRadius 를 getRestaurantsNearConference로 랩을 씌운
// 확장판 버젼의 api를 반환..


// getRestaurantsWithinRadius에 메모이제이션 패턴 적용

Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',

  // 반환값을 수정하는 함수
  function addMemoizationToGetRestaurantsWithinRadius(targetInfo) {

    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo);

    // getRestaurantsWithinRadius 함수를 장식하여 메모이제이션 추가
    Aop.around('getRestaurantsWithinRadius',
      Aspects.returnValueCache().advice, api);

    // 고친 API를 반환한다
    return api;
  },

  // 반환값을 수정해야 할 함수의 명칭공간
  ThirdParty
);

// ThirdParty.restaurantApi()에 getRestaurantsNearConference 멤버 추가

Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',

  // 반환값을 수정하는 함수
  function addGetRestaurantsNearConference(targetInfo) {
    'use strict';

    // ThirdParty.restaurantApi()가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo);

    // API에 추가할 함수
    function getRestaurantsNearConference(cuisine) {
      return api.getRestaurantsWithinRadius(
        '울산 남구 신정로20번길 988', 2.0, cuisine);
    }

    // 존재하지 않을 경우 이 함수를 추가한다
    api.getRestaurantsNearConference =
      api.getRestaurantsNearConference || getRestaurantsNearConference;

    // 고친 API를 반환한다
    return api;
  },

  // 반환값을 수정해야 할 함수의 명칭공간
  ThirdParty
);