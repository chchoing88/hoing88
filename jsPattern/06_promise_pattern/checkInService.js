/**
 * Created by merlin.ho on 2017. 5. 22..
 */
// 6장 프로미스 패턴
// promise는 비동기 작업과 그 결과를 갖고 해야 할 일을 캡슐화한 객체로서, 작업 완료시
// 이 객체에 캡슐화한 콜백을 호출한다. 

// 5장에서 recordCheckIn 함수를 지닌 checkInRecorder (외부 서비스를 이용한 등록) 객체가 있었다. 
// checkInService 함수에서는 참가자 정보를 등록으로 바꿔놓구 실제 기록 하는 recordCheckIn 함수를 실행.
// checkInService 함수는 저질러 놓고 잊어버리기라 호출 여부만 알면 그만이다. 
// 그러나 더 많은 일을 하고 싶을 떄가 있다. 에러처리 라던지, 또는 적업 성공시에 후속작업

// checkInRecorder 이 함수는 보통 XMLHttpRequest 로 체크인 등록 서버와 연동한다. 
// checkInRecorder는 요청을 보내놓고 onreadystatechange 이벤트를 귀 기울이다 결과의 성공/실패에 따라 조처를 한뒤 
// 자신의 호출부로 바통을 넘긴다. 

// 우리는 이렇게 하고 싶다. 
var test = {
  checkIn: function (attendee) {
    attendee.checkIn() // 참가자를 참석으로 표시해두고
    recorder.recordCheckIn(attendee).then(
      function () { }, // 성공하면 이렇게 하고
      function () { } // 실패하면 이렇게 하자. 
    );
  }
}

// 따라서 recordCheckIn은 Promise 객체가 반환되어야 한다. 
// Promise를 어떻게 해석할 것인가.. new Promise(function(resolve, reject){})..
// "나랑 약속하자 함수인자를 실행해서 조건에 따라 resolve와 reject를 실행시키길 약속해줘"

// recordCheckIn 로직을 비동기 처리한 다음(이때 then을 호출), 그 결과의 성공실패에 따라
// 지정된 콜백을 부른다
// 우리의 소원이 이루어지려면 recordCheckIn은 인자 2개(성공하면 호출할 함수와 실패하면 호출할 함수)를 받고
// then 메서드를 가진 객체를 반드시 반환해야 한다. 이것이 Promise의 핵심이다..

var Conference = Conference || {};

Conference.attendee = function (firstName, lastName) {
  'use strict';

  var attendeeId,
    checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None',
    checkInNumber;

  return {
    setId: function (id) {
      attendeeId = id;
    },
    getId: function () {
      return attendeeId;
    },

    getFullName: function () {
      return first + ' ' + last;
    },

    isCheckedIn: function () {
      return checkedIn;
    },

    checkIn: function () {
      checkedIn = true;
    },

    undoCheckIn: function () {
      checkedIn = false;
      checkInNumber = undefined;
    },

    setCheckInNumber: function (number) {
      checkInNumber = number;
    },

    getCheckInNumber: function () {
      return checkInNumber;
    }
  };
};


// 핵심은 Promise에 '이를 떄까지' 코드 결과를 체크하지 않는 것이다.
// checkInService.checkIn 이 then을 호출하여 수신한 값을 반환하게 한다.
// 귀결/성공 콜백으로 끝나면 귀결Promise를 , 버림/실패 콜백에 이르면 버림 Promise를 반환할 것이다.
// 콜백이 각자 Promise를 반환하도록 하면 이 Promise는 언젠가 then이 반환한 Promise의 귀결값이 될것이다.

var test2 = {
  checkIn: function (attendee) {
    attendee.checkIn();
    return recorder.recordCheckIn(attendee).then(
      function onRecordCheckInSucceeded(checkInNumber) {
        attendee.setCheckInNumber(checkInNumber);
        return Promise.resolve(checkInNumber);
      },
      function onRecordCheckInFailed(reason) {
        attendee.undoCheckIn();
        return Promise.reject(reason);
      });
  }
}

// 비동기 코드가 다 끝나면 반드시 이 함수를 호출해야하는 식
// done을 생략하거나 호출하지 않으면 비동기 작업이 미처 다 끝나기도 전에 끝나버리는 식
// 이런 코드다.
var dktechIn = {
  job: function(callback){

    var end = false;

    function next(){
      end = true;
    }

    if(typeof callback === 'function' && callback.length > 1){ // 인자를 하나 가지구 있다.
      // done 이라는 함수를 콜백의 인자로 넣어놨구나.
      callback(next);
      while(end === false){
        console.log('pending....')
      }

    } else {
      // 뭐 비동기가 아닌가보다 그냥 호출하고 끝내자...
      callback() // merlin 이라는 함수를 호출하는거구나..
    }
  }
}
dktechIn.job(
  function merlin(done) {
    //...
    test.then(
      function(){
        done();
      }
    )
  }
)





// 위 같은 코드를 만들려면....

// 이거슨 다른거~ 
// ch
Conference.checkInService = function (checkInRecorder) {
  'use strict';

  // 주입한 checkInRecorder의 참조값을 보관한다.
  var recorder = checkInRecorder;

  return {
    checkIn: function (attendee) {
      return new Promise(function checkInPromise(resolve, reject) {
        attendee.checkIn();
        recorder.recordCheckIn(attendee).then(
          //성공
          //attendee.setCheckInNumber,
          //실패
          //attendee.undoCheckIn
          function onRecordCheckInSucceeded(checkInNumber) {
            attendee.setCheckInNumber(checkInNumber);
            resolve(checkInNumber); //checkIn().then()을 호출할것이다..
          },
          function onRecordCheckInFailed(reason) {
            attendee.undoCheckIn();
            reject(reason);
          }

        )
      });
    }
  }
};


Conference.checkInRecorder = function () {
  'use strict';

  var messages = {
    mustBeCheckedIn: '참가자는 체크인된 것으로 표시되어야 한다.',
    httpFailure: 'HTTP 요청 실패!'
  };

  return {
    getMessages: function () {
      return messages;
    },

    recordCheckIn: function (attendee) {
      return new Promise(function (resolve, reject) {
        if (attendee.isCheckedIn()) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function onreadystatechange() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(xhr.responseText);
              } else {
                reject(new Error(messages.httpFailure));
              }
            }
          };
          xhr.open("POST", "/checkin/" + attendee.getId(), true);
          xhr.send();
        } else {
          reject(new Error(messages.mustBeCheckedIn));
        }
      });
    }
  };
};