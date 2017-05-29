/**
 * Created by merlin.ho on 2017. 5. 22..
 */

// recordCheckIn 로직을 비동기 처리한 다음(이때 then을 호출), 그 결과의 성공실패에 따라
// 지정된 콜백을 부른다
// 우리의 소원이 이루어지려면 recordCheckIn은 인자 2개(성공하면 호출할 함수와 실패하면 호출할 함수)를 받고
// then 메서드를 가진 객체를 반드시 반환해야 한다. 이것이 Promise의 핵심이다..

var Conference = Conference || {};

Conference.attendee = function(firstName, lastName) {
  'use strict';

  var attendeeId,
    checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None',
    checkInNumber;

  return {
    setId: function(id) {
      attendeeId = id;
    },
    getId: function() {
      return attendeeId;
    },

    getFullName: function() {
      return first + ' ' + last;
    },

    isCheckedIn: function() {
      return checkedIn;
    },

    checkIn: function() {
      checkedIn = true;
    },

    undoCheckIn: function() {
      checkedIn = false;
      checkInNumber = undefined;
    },

    setCheckInNumber: function(number) {
      checkInNumber = number;
    },

    getCheckInNumber: function() {
      return checkInNumber;
    }
  };
};


Conference.checkInService = function(checkInRecorder){
  'use strict';

  // 주입한 checkInRecorder의 참조값을 보관한다.
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee){
      return new Promise(function checkInPromise(resolve,reject){
        attendee.checkIn();
        recorder.recordCheckIn(attendee).then(
          //성공
          //attendee.setCheckInNumber,
          //실패
          //attendee.undoCheckIn
          function onRecordCheckInSucceeded(checkInNumber){
            attendee.setCheckInNumber(checkInNumber);
            resolve(checkInNumber); //checkIn().then()을 호출할것이다..
          },
          function onRecordCheckInFailed(reason){
            attendee.undoCheckIn();
            reject(reason);
          }

        )
      });
    }
  }
};


Conference.checkInRecorder = function() {
  'use strict';

  var messages = {
    mustBeCheckedIn: '참가자는 체크인된 것으로 표시되어야 한다.',
    httpFailure: 'HTTP 요청 실패!'
  };

  return {
    getMessages: function() {
      return messages;
    },

    recordCheckIn: function(attendee) {
      return new Promise( function(resolve, reject) {
        if (attendee.isCheckedIn()) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange=function onreadystatechange() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(xhr.responseText);
              } else {
                reject(new Error(messages.httpFailure));
              }
            }
          };
          xhr.open("POST","/checkin/" + attendee.getId(),true);
          xhr.send();
        } else {
          reject(new Error(messages.mustBeCheckedIn));
        }
      });
    }
  };
};