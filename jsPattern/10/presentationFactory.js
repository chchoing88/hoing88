/**
 * Created by merlin.ho on 2017. 6. 11..
 */
// 10장. 팩토리 패턴
// 
// 샬롯이 그냥 단일 수준의 객체 리터럴로 된 데이터를 줄거라고 말했다...
// 그래서 프레젠테이션 유형은 사람이 아닌 내가 짠 코드가 알아서 판단해서
// 유형을 만들어 낸다. 

// 프로퍼티 뭉치로 이루어진 파라미터를 하나 받아 알아서 처리하면 될꺼 같다.




// 팩토리에서 하는일
// 1. create의 파라미터는 이전에 객체 리터럴로 넘겼을때 undefined로 자리 끼움했던 보기 흉한 형태에서 완전히 벗어났다
// 2. 파라미터에 무엇이 들었든 잘 건네주기만 하면 뒷일은 팩토리가 알아서 처리한다.
// 3. 나중에 유형이 다른 프레젠테이션도 얼마든지 추가할 수 있다.
// 4. new 키워드로 객체를 생성해야 한다는 사실을 팩토리가 대신 기억해준다. 팩토리 안에서 new...


// 밴더프리픽스 프로퍼티가 하나라도 있으면 
// 벤더프레젠테이션을 아니면 그냥 프레젠테이션을 호출

// 용도에 맞는 create 메서드가 여럿 있는 팩토리도 있다.
// 오버로딩을 지원하지 않는 언어라서 메서드마다 다른 이름을 붙이든지 
// arguments를 보고 여러 일을 처리하는 단일 메서드를 두어야 한다.

// 팩토리는 싱글톤으로도 바꿔 쓸 수 있어서 9장에서 설명한 여러가지 싱글톤을 적용할 수 있다.

// 팩토리 단위 테스트에서는 다음을 확인하자
// create 함수는 잘못된 파라미터를 받지 않는다.
// 파라미터가 정상적으로 전달되면 그에 따른, 원객체의 생성함수를 정확히 호출한다.
// 이렇게 하여 반환된 객체가 바로 create가 반환한 객체다.
var Conference = Conference || {};

Conference.presentationFactory = function () {

  'use strict';

  return {
    create: function (obj) { // obj가 샬롯이 주는 데이터이다...
      var baseProperty = ['title', 'presenter'],
        vendorProperty = ['vendor', 'product'],
        allProperty = baseProperty.concat(vendorProperty),
        p,
        ix;

      for (p in obj) {
        if (allProperty.indexOf(p) < 0) { // indexOf 배열에서 지정된 요소를 찾을 수있는 첫 번째 인덱스를 반환 -1 이면 못찾음.
          throw Error(Conference.presentationFactory.messages.unexpectedProperty + p);
        }
      }

      // 나중에 Presentation 에서 유래한 객체를 반환할 예정..

      for (ix = 0; ix < vendorProperty.length; ++ix) {
        if (obj.hasOwnProperty(vendorProperty[ix])) {
          return new Conference.VendorPresentation(obj.title, obj.presenter, obj.vendor, obj.product);
        }
      }
      return new Conference.Presentation(obj.title, obj.presenter);

    }
  }

};

Conference.presentationFactory.messages = {
  unexpectedProperty: '이상한 프로퍼티 입니다.'
};


