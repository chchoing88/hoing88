/**
 * Created by merlin.ho on 2017. 6. 6..
 */


describe('',function(){
  var api = ThirdParty.restaurantApi();

  describe('',function(){
    var returnFromUnderlyingFunction = '아무거나',
      cuisine = '중화요리';
    beforeEach(function(){
      spyOn(api,'getRestaurantsWithinRadius').and.returnValue(returnFromUnderlyingFunction);
    });

    it('올바른 인자로 getRestaurantsWithinRadius를 호출한다.',function(){
      api.getRestaurantsNearConference(cuisine);

      expect(api.getRestaurantsWithinRadius).toHaveBeenCalledWith('울산 남구 신정로 20번길 978',2.0,cuisine);
    });

    it('getRestaurantsWithinRadius 로 부터 받은 값을 반환한다',function(){
      var ret =  api.getRestaurantsNearConference(cuisine);
      expect(ret).toBe(returnFromUnderlyingFunction);
    });
  });
});
