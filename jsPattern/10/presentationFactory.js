/**
 * Created by merlin.ho on 2017. 6. 11..
 */

//샬롯이 그냥 객체 리터럴로 된 데이터를 줄거라고 말했다...
// 그래서 프레젠테이션 유형은 내 코드에서 확인해야한다...ㅜㅠ


  // 팩토리에서 하는일
  // 1. create의 파라미터는 이전에 객체 리터럴로 넘겼을때 undefined로 자리 끼움했던 보기 흉한 형태에서 완전히 벗어났다
  // 2. 파라미터에 무엇이 들었든 잘 건네주기만 하면 뒷일은 팩토리가 알아서 처리한다.
  // 3. 나중에 유형이 다른 프레젠테이션도 얼마든지 추가할 수 있다.
  // 4. new 키워드로 객체를 생성해야 한다는 사실을 팩토리가 대신 기억해준다. 팩토리 안에서 new...

var Conference = Conference || {};

Conference.presentationFactory = function(){

  'use strict';

  return {
    create : function(obj){ // obj가 샬롯이 주는 데이터이다...
      var baseProperty = ['title','presenter'],
        vendorProperty = ['vendor','product'],
        allProperty = baseProperty.concat(vendorProperty),
        p,
        ix;

      for (p in obj){
        if(allProperty.indexOf(p) < 0){ // indexOf 배열에서 지정된 요소를 찾을 수있는 첫 번째 인덱스를 반환 -1 이면 못찾음.
          throw Error(Conference.presentationFactory.messages.unexpectedProperty + p);
        }
      }

      // 나중에 Presentation 에서 유래한 객체를 반환할 예정..

      for ( ix = 0; ix<vendorProperty.length; ++ix){
        if(obj.hasOwnProperty(vendorProperty[ix])){
          return new Conference.VendorPresentation(obj.title,obj.presenter, obj.vendor,obj.product);
        }
      }
      return new Conference.Presentation(obj.title,obj.presenter);

    }
  }

};

Conference.presentationFactory.messages = {
  unexpectedProperty : '이상한 프로퍼티 입니다.'
};


