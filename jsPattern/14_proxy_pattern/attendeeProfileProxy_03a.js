/**
 * Created by merlin.ho on 2017. 7. 2..
 */

var Conference = Conference || {};

//attendeeProfileService(profileService) 함수로 참가자 배열(attendees)에서
//accessCount에 따라 가장 인기 있는 프로필부터 prefetchLimit개 만큼 선취하는 식으로
//참가자 프로필 접근을 관리한다.
Conference.attendeeProfileProxy = function(
  attendees, profileService, prefetchLimit) {
  'use strict';

  var prefetched = {};

  function prefetch(attendeeId) {
    prefetched[attendeeId] = profileService.getProfile(attendeeId);
  }

  if (prefetchLimit > attendees.length) {
    prefetchLimit = attendees.length;
  }

  // 즉시 실행 함수로 감싸서 딱 한 번만 실행되도록
  // 그리고 새 변수 sortedAttendees가 외부 스코프에 의해 더렵혀지지 않게 한다...
  // 즉시 실행 함수도 prefetchAll 이라는 이름을 붙여 문서화 및 스택 추적 시 이정표로 삼는다..

  (function preFetchAll(){
    var ix,
      sortedAttendees = attendees.slice().sort(function(a , b){
        // 서버에서 데이터를 받을때 모든 프로퍼티가 다 있을 거라고 섣불리 넘겨 짚게 되면 오류를 뱉는다..
        //return b.profileViews - a.profileViews;

        return (b.profileViews || 0 ) - (a.profileViews || 0);
      });

    for( ix = 0; ix < prefetchLimit; ix++){
      prefetch(sortedAttendees[ix].attendeeId);
    }
  })();
};