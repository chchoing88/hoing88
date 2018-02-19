/**
 * Created by merlin.ho on 2017. 7. 2..
 */

var Conference = Conference || {};

//attendeeProfileService(profileService) 함수로 참가자 배열(attendees)에서
//accessCount에 따라 가장 인기 있는 프로필부터 prefetchLimit개 만큼 선취하는 식으로
//참가자 프로필 접근을 관리한다.

// perfetched 객체는 꼭 댁셔너리 처럼 사용된다..
// 여기서 사용되는 딕셔너리는 유일한 값을 [키, 값] 형태로 저장하기 위한 추상 자료구조로
// 해시맵 , 해시 테이블 등의 해시를 포괄하는 상위 자료구조다..

Conference.attendeeProfileProxy = function(
  attendees, profileService, prefetchLimit) {
  'use strict';

  var ix,
    prefetched = {};

  function prefetch(attendeeId) {
    prefetched[attendeeId] = profileService.getProfile(attendeeId);
  }

  if (prefetchLimit > attendees.length) {
    prefetchLimit = attendees.length;
  }

  for (ix=0; ix<prefetchLimit; ++ix) {
    prefetch(attendees[ix].attendeeId);
  }
};
