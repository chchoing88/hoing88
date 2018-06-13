/**
 * Created by merlin.ho on 2017. 6. 20..
 */

/**
 * 장식자 패턴
 * 상황에 따라 어떠한 특성 혹은 행동을 덧 붙이는 패턴을 데코레이터 패턴이라고 한다.
 * 장식자는 원객체 또는 api를 받아서 추가 기능을 더하는 래퍼
 * 
 * 참가자를 등록하고 바로 참가자 명단을 보면 좋겠는데 ID 발급하는데는 시간이 좀 걸린다.
 * 참가자 명단 페이지에선 바로 보여주고 싶은데 어떻게 해야하나.
 * 바로 등록(post로 전송만 호출하면) 성공이란 가정하에 명단을 보여준다.
 * 
 * 1. 새 레코드를 post 하기전, 대기 레코드(pendingPosts) 배열에 담는다.
 * 2. post promise가 귀결되면 해당 레코드를 배열에서 들어낸다 ( 삭제 시킨다. ) 배열 splice
 * 3. 그러는 동안 대기 레코드들을 get 결과에 덧붙인다. 이렇게 하면 참가자 명단 페이지에서 post 처리된 
 * 레코드를 바로 보여줄 수 있다. 대기 레코드들은 아직 DB에서 참가자 ID를 발급받지 못한 상태라 수정/삭제가 불가피 하지만, 
 * 어쨌든 그 사이에 적어도 이름을 명단에 보여주는 건 가능하다. 
 * 4. post 결과 참가자 id가 넘어오면 조금전 3번에서 get으로 덧붙인 해당 레코드에 집어넣고 수정/삭제할 수 있는 상태로 바뀐다. 
 * 5. 드물긴 하지만, post가 실패하면 에러 메시지를 띄우고 등록 실패한 참가자를 명단 페이지에서 지운다. 
 * 오류가 발생한 참가자가 명단에 잠시 머물렀다 해도 문제 될 일은 없다. 화면에서 id가 다시 넘어오기 전까지 수정/삭제를
 * 할 수 없을 뿐이니까.
 */



var Conerence = Conference || {};
Conerence.attendeeWebApiDecorator = function (baseWebApi) {
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
  function indexOfPostForSameAttendee(posts, attendee) {
    var ix;
    for (ix = 0; ix < posts.length; ++ix) {
      if (posts[ix].isSamePersonAs(attendee)) {
        return ix;
      }
    }
    return -1;
  }

  return {
    post: function post(attendee) {
      if (indexOfPostForSameAttendee(pendingPosts, attendee) >= 0) {
        return Promise.reject(new Error(messages.postPending));
      }

      pendingPosts.push(attendee);

      return baseWebApi.post(attendee).then(
        function onPostSucceeded(attendeeWithId) {
          var ix = pendingPosts.indexOf(attendee);
          if (ix >= 0) {
            pendingPosts[ix].setId(attendeeWithId.getId());
            pendingPosts.splice(ix, 1);
          }

          return attendeeWithId
        },
        function onPostFailed(reason) {
          var ix = pendingPosts.indexOf(attendee);
          if (ix >= 0) {
            pendingPosts.splice(ix, 1);
          }

          return Promise.reject(reason);
        }
      );
    },
    getAll: function getAll() {
      return baseWebApi.getAll().then(function (records) {
        pendingPosts.forEach(function (pending) {
          var ix = indexOfPostForSameAttendee(records, pending);
          if (ix < 0) {
            records.push(pending);
          }
        });
        return records;
      });
    },
    getMessages: function getMessages() {
      return messages;
    }
  }
};
