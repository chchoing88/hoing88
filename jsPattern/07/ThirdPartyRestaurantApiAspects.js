/**
 * Created by merlin.ho on 2017. 6. 6..
 */

Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',
  // 반환값을 수정하는 함수.
  function addGetRestaurantsNearConference(targetInfo){
    'use strict';

    //ThirdParty.retaurantApi() 가 반환한 원본 API
    var api = Aop.next.call(this,targetInfo); // Aop.next 는 원본 함수에 원본 인자를 넣어 호출해준다...


    //API에 추가할 함수
    function getRestaurantsNearConference(cuisine){
      return api.getRestaurantsWithinRadius(
        '울산 남구 신정로 20번길 988',2.0,cuisine);

    }

    // 없으면 이 함수를 추가한다
    api.getRestaurantsNearConference = api.getRestaurantsNearConference || getRestaurantsNearConference;

    //수정한 API를 반환한다
    return api;

  },
  ThirdParty
);
