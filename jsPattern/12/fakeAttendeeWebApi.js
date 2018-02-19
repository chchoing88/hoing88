/**
 * Created by merlin.ho on 2017. 6. 19..
 */

// 이건 모의체
  // 참가자를 attendees 배열에 저장하는 post 메서드는 마치 DB 서버처럼 작동하고 여기서 참가자 데이터는 getAll 메서드가 반환한다.
  // 예기치 않은 방향으로 테스트가 흘러가지 않게 원본 객체 대신 attendees 사본을 사용한다...

  // 마치 실 객체가 움직이는 것처럼 setTimeout 으로 그럴듯 하게 흉내 냈다...

var Conference = Conference || {};

// attendeeWebApi 의 가짜버전. 진짜와 메서드는 같지만 전체적으로 클라이언트 측 코드만 있다.....

Conference.fakeAttendeeWebApi = function(){

  'use strict';

  var attendees = []; // 가짜 데이터베이스 테이블

  return {
    //서버에 attendee를 POST 전송하는 척한다.
    //attendee 사본(마치 서버에서 새 버전을 조회해오는 것처럼 ) 으로
    // 귀결되는 프라미스를 반환하고 귀결 시점에 이 레코드에는
    // 데이터베이스에서 할당된 PK(attendeeId)가 들어있을 것이다..

    //프라미스를 버려야 하는 테스트라면 스파이를 이용하자.
    post: function post(attendee){
      return new Promise(function(resolve,reject){
        // 5밀리초에 불과하지만,
        // setTimeout은 프라미스 귀결을 다음 차례로 지연한다..
        setTimeout(function pretendPostingToServer(){
          var copyOfAttendee = attendee.copy();
          copyOfAttendee.setId(attendees.length+1);
          attendees.push(copyOfAttendee);
          resolve(copyOfAttendee);
        },5);
      });

    },
    // 전체 참가자에 대한 프라미스를 반환한다..
    // 이 프라미스는 반드시 귀결되지만 , 필요하면 테스트 코드에서 스파이를 심을수도 있다..
    getAll : function getAll(){
      return new Promise(function(resolve,reject){
        // setTimeout은 실제 조건을 흉내 내기 위해
        // post보다 지연시간이 짧다..
        setTimeout(function pretendToGetAllFromServer(){
          var copies = [];
          attendees.forEach(function(a){
            copies.push(a.copy());
          });
          resolve(copies);
        },1);
      });
    }

  }
};