/**
 * Created by merlin.ho on 2017. 6. 11..
 */

var Conference = Conference || {};

Conference.Presentation = function(title , presenter){
  'use strict';

  // 에러 처리..
  // 1. new로 호출하지 않으면 에러..
  // 2. title이 없으면 에러.

  if(!(this instanceof Conference.Presentation)){
    throw new Error(Conference.Presentation.messages.mustUseNew);
  }

  if(!title){
    throw new Error(Conference.Presentation.messages.titleRequired);
  }
};

Conference.Presentation.messages = {
  mustUseNew : 'Presentation은 반드시 "new"로 생성해야 합니다.',
  titleRequired : 'title은 필수 입력 항목입니다.'
};