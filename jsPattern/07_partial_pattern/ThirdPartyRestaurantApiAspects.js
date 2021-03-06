/**
 * Created by merlin.ho on 2017. 6. 6..
 */

// 7장. 부분 적용 함수 
// Aop.around 
// 인자가 여럿 있고 그중 일부는 값이 불변인 함수를 쓸 경우가 있다. 이때 같은 값을 계속 반복하기보다
// 원본함수를 새로운 함수로 감싼 다음, 상수 인자는 건네주고 값이 달라지는 나머지 인자만 표출하는 것이 좋다. 
// 이것이 부분적용 함수이다. ( PFA : Partial Function Application ) 기법.
// 부분 적용 함수는 이미 알고있는 함수 위에 새로 함수를 쌓아 올린거라서 단위 테스트하기 쉽다.
// 기존의 객체의 메서드를 내가 원하는 함수로 대치해서 실행할수 있다. 
// targetInfo = {fn : 원본함수 , args: 원본함수에 넘길 인자들 , fnName: 원본함수 이름}
// 값이 불변인 상수 인자를 지난 함수 호출부는 상수성을 캡슐화하여 함수를 새로 만드는게 좋다. 
// AOP의 핵심은 함수 실행(타깃)을 가로채어 다른 함수 (어드바이스)를 실행하기 직전이나 직후,
// 또는 전후에 실행시키는 것이다.


// 괜찮은 api를 발견한거 같은데 필요 이상 잡다한 부분도 있다.
// api 확장 restaurantApi 함수가 반환한 api에 새로운 함수를 집어넣기로 한다.
// 커링은 여러 인자를 거느린 함수를 인자를 하나만 취하는 여러 단계의 함수들로 쪼개는 느낌.


Aop.around(
  // 반환값을 수정해야 할 함수
  'restaurantApi',
  // 반환값을 수정하는 함수.
  function addGetRestaurantsNearConference(targetInfo) {
    'use strict';

    //ThirdParty.retaurantApi() 가 반환한 원본 API
    var api = Aop.next.call(this, targetInfo); // Aop.next 는 원본 함수에 원본 인자를 넣어 호출해준다...


    //API에 추가할 함수
    function getRestaurantsNearConference(cuisine) {
      return api.getRestaurantsWithinRadius(
        '울산 남구 신정로 20번길 988', 2.0, cuisine);
      // 앞에 2개의 인자는 값이 불변인 상수 인자.

    }

    // 없으면 이 함수를 추가한다
    api.getRestaurantsNearConference = api.getRestaurantsNearConference || getRestaurantsNearConference;

    //수정한 API를 반환한다
    return api;

  },
  ThirdParty
);
