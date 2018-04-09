/**
 * Created by merlin.ho on 2017. 5. 22..
 * github - https://github.com/gilbutITbook/006844
 */
// 5장 콜백 패턴
// 참가자 목록을 보여주고 그중 한 사람 또는 여러사람을 선택 
// UI 배후의 체크인 기능은 checkInService 함수에 구현.
// 

var Conference = Conference || {};

Conference.attendee = function (firstName, lastName) {

  var checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None';

  return {
    getFullName: function () {
      return first + '' + last;
    },
    isCheckedIn: function () {
      return checkedIn;
    },
    checkIn: function () {
      checkedIn = true;
    }
  }

};

// 하나 또는 둘 이상의 attend 객체에 대해 checkIn 함수를 실행해야 한다. 
// 나중에 참가자 컬렉션(집단)을 처리하는 방식이 바뀔지 모르니 attend 객체 컬렉션을 캡슐화한 
// attendeeCollection 객체를 두는 것이 타당해 보인다. 
Conference.attendeeCollection = function () {

  var attendees = [];

  return {

    contains: function (attendee) {
      return attendees.indexOf(attendee) > -1; // 들어있니??

    },
    add: function (attendee) {
      if (!this.contains(attendee)) {
        attendees.push(attendee);
      }

    },
    remove: function (attendee) {
      var index = attendees.indexOf(attendee);

      if (index > -1) {
        attendees.splice(index, 1);
      }

    },
    iterate: function (callback) {   // 반복..
      // attendees의 각 attendee에 대해 콜백을 실행한다..
      attendees.forEach(callback);

    }

  }

};

// 체크인 로직을 attendeeCollection 에서 분리하여 코드를 재사용할 수도 있다.
// 외부 시스템의 체크인 등록 기능을 별도의 책임으로 보고 등록용 객체를 checkInService에 
// 주입하는게 언뜻 타당해 보인다.

Conference.checkInService = function (checkInRecorder) {
  // 주입한 checkInRecorder의 참조값을 보관한다.
  var recorder = checkInRecorder;

  return {
    checkIn: function (attendee) {
      attendee.checkIn();
      recorder.recordCheckIn(attendee);
    }
  }
};

Conference.checkInRecorder = function () {
  "use strict";

  return {
    recordCheckIn: function (attendee) {
      // 외부 서비스를 통해 체크인 등록한다
    }
  };
};


// 익명의 콜백 함수는 콜백만 따로 떼어낼 방법이 없어서 단위 테스트가 불가능 하다.
var attendees = Conference.attendeeCollection();

attendees.iterate(function doCheckIn(attend) { // 익명의 콜백함수 -> 디버깅 용이함을 위해 이름을 지정한다. 
  attend.checkIn();
})

// 최종

// Conference.attendee 참가자 객체
// Conference.attendeeCollection 참가자들 집단 객체
// Conference.checkInRecorder 외부 서비스를 통해 체크인 등록
// Conference.checkInService 참가자 체크인 뿐만 아니라 외부 서비스 체크인도 수행.
// 익명의 콜백함수에서 따로 모듈로 떼내었다.

var checkInService = Conference.checkInService(Conference.checkInRecorder());
var attendees = Conference.attendeeCollection();

attendees.iterate(checkInService.checkIn);

// 문제예방

// 콜백의 문제 : 콜백 화살(콜백 헬) 과 콜백 함수에서 가리키는 this
// 콜백 헬 해결 방안 : 익명함수를 사용하지 않고 이름있는 함수를 사용하자. 
// 또 중첩 콜백을 눌러 편 코드가 더 낫다.
// this 의 문제 : 일반적으로 this 값은 함수를 호출한 객체를 가리키지만 
// 콜백함수를 만들어 넣을때 어떤 객체를 참조하라고 직접 지정할 수는 없다.

// 객체에 this 를 사용하는 메소드가 있다면 그 메소드는 콜백함수로 실행할때 
// 주의 하자.

// 위 예제에서 this 의 문제점을 구현해보자.
// 만약에 참가자중에 checkIn 한 참가자를 구현하는 모듈을 만들어보자.

Conference.checkInAttendeeCounter = function () {
  var counter = 0;

  return {
    increment: function () {
      counter++;
    },
    getCounter: function () {
      return counter;
    },
    countIfCheckedIn: function (attend) {
      if (attend.isCheckedIn()) {
        this.increment();
      }
    }
  }
}

var counter = Conference.checkInAttendeeCounter();

attendees.iterate(counter.countIfCheckedIn);
counter.getCounter() // 0 <-- 에러....

// iterate 함수를 생각해보면 
function iterate(fn) {
  [].forEach(fn) // <-- 그냥 호출
}

// 메서드의 this는 어떤 객체가 호출해줘야 하는데 그렇지 않게되면
// this 는 window를 참조하게 된다. 

// 이런코드는 아래와 같이 해결할 수 있다. 
Conference.checkInAttendeeCounter = function () {
  var counter = 0;
  var self = { // < -- 본인 참조값을 self 변수로 받고 
    // .. old source return statement!!
    countIfCheckedIn: function (attend) {
      if (attend.isCheckedIn()) {
        self.increment(); // <-- 여기..서 그 참조값을 이용.
      }
    }
  }

  return self;
}

// 위 함수가 실행되고 종료되도 counter 와 self는 외부에서 참조하고 
// 있기 때문에 사라지지 않는다. 