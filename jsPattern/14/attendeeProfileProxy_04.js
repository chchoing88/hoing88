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
    // 이놈이 진짜... getProfile 가져오는 놈...
    prefetched[attendeeId] = profileService.getProfile(attendeeId);
  }

  if (prefetchLimit > attendees.length) {
    prefetchLimit = attendees.length;
  }

  (function prefetchAll() {
    var ix,
      sortedAttendees = attendees.slice().sort(function byViews(a, b) {
        return (b.profileViews || 0) - (a.profileViews || 0);
      });
    for (ix = 0; ix < prefetchLimit; ++ix) {
      prefetch(sortedAttendees[ix].attendeeId);
    }
  })();

  // 위에걸 한번 돌리고 나면... prefetched에 뭔가가 쌓인다.. 그게 뭐가 쌓이느냐.
  // 서버에서 내려주는 profileViews 값이 높은순위별로.. prefetchLimit 갯수만큼 쌓인다..
  // prefetced는 참가자의 id가 키 값이고 값은 진짜 getProfile ( 프로필 ) ..

  return {
    getProfile : function(attendeeId){
      return prefetched[attendId];
    }
  }
};
