/**
 * Created by merlin.ho on 2017. 6. 25..
 */

var Conference = Conference || {};

//attendeeProfileService(profileService) 함수로 참가자 배열(attendees)에서
//accessCount에 따라 가장 인기 있는 프로필부터 prefetchLimit개 만큼 선취하는 식으로
//참가자 프로필 접근을 관리한다.

// profileService 는 참가자 아이디 받아와서 참가자 프로필을 내뱉는 녀석으로
// 현재 참가자들 ( attendees ) 를 받아서 그 중 몇명만 ( perfectchLimit ) , 프로필을 가져온다 . ( profileService )

Conference.attendProfileProxy = function(
  attendees, profileService , prefetchLimit){

};