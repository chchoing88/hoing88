/**
 * Created by merlin.ho on 2017. 6. 20..
 */

var Conerence = Conference || {};
Conerence.attendeeWebApiDecorator = function(baseWebApi){
  'use strict';

   var self = this,

   // post 함수에 전달할 레코드
  // 호출 결과는 아직 귀결되지 않은 상태다.
  pendingPosts = [],
     messages = {
     postPending: '이 참가자에 대한 처리가 진행 중인 것 같습니다.'
     };

   //attendee에 해당하는 'posts' 원소를 반환하거나
  // 그런 원소가 없으면 -1을 반환한다..
  function indexOfPostForSameAttendee(posts,attendee){
    var ix;
    for( ix=0; ix<posts.length; ++ix){
      if( posts[ix].isSamePersonAs(attendee)){
        return ix;
      }
    }
    return -1;
  }

  return {
    post: function post(attendee){
      if(indexOfPostForSameAttendee(pendingPosts,attendee) >= 0){
        return Promise.reject(new Error(messages.postPending));
      }

      pendingPosts.push(attendee);

      return baseWebApi.post(attendee);
    },
    getAll: function getAll(){
      return baseWebApi.getAll();
    },
    getMessages: function getMessages(){
      return messages;
    }
  }
};