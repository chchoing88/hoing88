/**
 * Created by merlin.ho on 2017. 6. 11..
 */
// 10장. 팩토리 패턴
// 팩토리는 객체를 단순히 찍어내는 함수다. 
// Object.create 메서드 역시 언어 자체에 포함된 팩토리다.
// 모듈은 데이터 감춤이라는 부가 기능이 있지만, 객체 생성/반환이 주 임무라는 점에서 
// 엄밀히 말하면 팩토리다.

// 팩토리를 사용하는 이유는 '제어' 와 '추상화' 를 강화하기 위해서다.
// 여기서 '제어'와 '추상화'는 무엇인가..


var Conference = Conference || {};

Conference.Presentation = function (title, presenter) {
  'use strict';

  // 에러 처리..
  // 1. new로 호출하지 않으면 에러..
  // 2. title이 없으면 에러.

  if (!(this instanceof Conference.Presentation)) {
    throw new Error(Conference.Presentation.messages.mustUseNew);
  }

  if (!title) {
    throw new Error(Conference.Presentation.messages.titleRequired);
  }
};

Conference.Presentation.messages = {
  mustUseNew: 'Presentation은 반드시 "new"로 생성해야 합니다.',
  titleRequired: 'title은 필수 입력 항목입니다.'
};