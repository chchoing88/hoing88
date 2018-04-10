/**
 * Created by merlin.ho on 2017. 6. 10..
 */
// 8장. 메모이제이션 패턴

// 서드파트 api 업체가 요청 건당 과금을 하는 통에 개발/테스트 중에도 책상위에 카드 청구서가 수북하다.
// 참가자들이 대부분 비슷한 요리를 찾을거다. 그러니깐 검색한 결과를 어딘가 저장해놓았다가 
// 다른 참가자가 같은 요리를 검색하면 저장한 데이터를 그대로 다시 반환하면 된다. 
// 콘퍼런스 기간 중 새로 문을 열거나 닫는 음식점은 거의 없을 테니 api 조회 결과 요리별로 같은 음식점 정보가 반환되겠지요

// 보통 함수 호출 시 전달 받은 인자를 키로 그 반환 결과를 어떤 구조체에 저장하고, 
// 같은 키를 인자로 다시 함수를 호출하면 저장해둔 값을 꺼내어 바로 반환한다. 
// 물론 함수 본체는 그냥 건너 뛴다. 


var Conference = Conference || {};

Conference.memoizedRestaurantApi = function (thirdPartyApi) {
  'use strict';

  var api = thirdPartyApi,
    cache = [];

  return {
    getRestaurantsNearConference: function (cuisine) {
      if (cache.hasOwnProperty(cuisine)) {
        return cache[cuisine];
      }

      var returnPromise = api.getRestaurantsNearConference(cuisine);

      cache[cuisine] = returnPromise;
      return returnPromise;
    }
  }
};
