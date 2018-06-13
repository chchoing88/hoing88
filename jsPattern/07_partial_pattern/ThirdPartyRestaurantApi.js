/**
 * Created by merlin.ho on 2017. 6. 6..
 */
// 7장. 부분 적용 함수 
var ThirdParty = ThirdParty || {};

ThirdParty.restaurantApi = function(){
  'use strict';

  return {
    // 주어진 주소 기준 반경 radiusMiles 마일 이내에 위치한
    // 원하는 요리를 먹을 수 있는 음식점 배열을 반환하는 프라미스를 반환
    getRestaurantsWithinRadius : function(address , radiusMiles, cuisine){
      // 프라미스는 다음과 같은 객체의 배열로 귀결된다..
      // {
      //    name : "대성각",
      //    address : "울산 남구 신정로 20번길 988",
      // }
    }
  }
};
