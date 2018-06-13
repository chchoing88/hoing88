/**
 * Created by merlin.ho on 2017. 6. 10..
 */


// 테스트 목적 다른 객체의 같은 함수들에 대해서 캐쉬를 공유하자??

describe('returnValueCache',function(){

  'use strict';

  var testObject,
    testValue,
    args,
    spyReference;

  //테스트 객체를 생성하는 도우미 함수, testFunction에 스파이를 심고
  // 반환 객체의 spyReference 프로퍼티에 스파이 참조값을 담아둔다..
  function createTestObject(){
   var obj = {
     testFunction : function(arg){
       return testValue;
     }
   };

    spyOn(obj,'testFunction').and.callThrough();

    //애스팩트가 적용된 이후에는
    // 스파이를 직접 참조할 수 없으므로 현재 참조값을 보관해둔다..

    obj.spyReference = obj.testFunction;

    return obj;
  }


  beforeEach(function(){
    //테스트할 때마다 우선 실행 횟수를 초기화 한다..
   // testFunctionExecutionCount = 0;
    testValue = {};
    testObject = {
      testFunction: function(arg){
        return testValue;
      }
    }
  });



  describe('advice(targetInfo)',function(){


    it('주입된 캐시를 인스턴스 간에 공유할 수 있다',function(){
      var sharedCache = Conference.simpleCache(),
        object1 = createTestObject(),
        object2 = createTestObject();

      Aop.around('testFunction',
      new Aspects.returnValueCache(sharedCache).advice,
        object1);

      Aop.around('testFunction',
        new Aspects.returnValueCache(sharedCache).advice,
        object2);

      object1.testFunction(args);

      //object2의 testFunction 호출 시
      // 캐시된 object1의 testFunction 호출 결과를 가져온다..
      expect(object2.testFunction(args)).toBe(testValue);

      //따라서 object2의 testFunction은 실행되지 않는다.
      expect(object2.spyReference.calls.count()).toBe(0);


    });
  });

  describe('Conference.caches.RestaurantsWithinRadiusCache',function(){
    'use strict';

    describe('getInstance',function(){
      it('항상 동일한 인스턴스를 반환한다',function(){
        // .getInstance가 동일한 객체를 반환하는지 확인
        // (.toBe는 참조값의 동등함을 따진다.)

        expect(Conference.caches.RestaurantsWithinRadiusCache.getInstance())
          .toBe(Conference.caches.RestaurantsWithinRadiusCache.getInstance())
      });
    });
  });


});
