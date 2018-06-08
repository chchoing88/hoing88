/**
 * Created by merlin.ho on 2017. 6. 11..
 */

var Conference = Conference || {};

Conference.VendorPresentation = function (title, presenter, vendor, product) {

  'use strict';
  if (!(this instanceof Conference.VendorPresentation)) {
    new Error(Conference.VendorPresentation.messages.mustUseNew);
  }
  if (!vendor) {
    new Error(Conference.VendorPresentation.messages.vendorRequired);
  }

  Conference.Presentation.call(this, title, presenter);
  this.vendor = vendor;
  this.product = product;

};

Conference.VendorPresentation.prototype = Object.create(Conference.Presentation.prototype);

Conference.VendorPresentation.messages = {
  mustUseNew: 'new로 생성해야 합니다.',
  vendorRequired: 'vendor는 필수 입력 항목입니다..'
};

// Conference.VendorPresentation.prototype = Object.create(Conference.Presentation.prototype);

// 상속
// Object.create 의 폴리필을 보고 상속의 방법을 알아보자.
// Temp 함수를 만들어 Temp.prototype에 내가 원하는 prototype을 주입 후
// Temp 의 인스턴스를 반환한다. 
// 결론은 내가 원하는 프로토타입을 기준으로 새로운 객체를 만들어준다. 
// 그렇다면 여기서 왜 내가 원하는 프로토타입을 바로 주입을 안시키고 한번 꼬아서
// 하는가...

// 그에 대한 해답은 우선 막바지로 주입을 시키면 서로 참조를 하게된다. 문제다.!!

