/**
 * Created by merlin.ho on 2017. 5. 22..
 */

var Conference = Conference || {};

Conference.attendee = function(firstName , lastName){

  var checkedIn = false,
    first = firstName || 'None',
    last = lastName || 'None';

  return {
    getFullName: function(){
      return first + '' + last;
    },
    isCheckedIn: function(){
      return checkedIn;
    },
    checkIn: function(){
      checkedIn = true;
    }
  }

};

Conference.attendeeCollection = function(){

  var attendees = [];

  return {

    contains: function(attendee){
      return attendees.indexOf(attendee) > -1; // 들어있니??

    },
    add: function(attendee){
      if(!this.contains(attendee)){
        attendees.push(attendee);
      }

    },
    remove: function(attendee){
      var index = attendees.indexOf(attendee);

      if( index > -1 ){
        attendees.splice(index,1);
      }

    },
    iterate: function(callback){   // 반복..
      // attendees의 각 attendee에 대해 콜백을 실행한다..
      attendees.forEach(callback);

    }

  }

};

Conference.checkInService = function(checkInRecorder){
  // 주입한 checkInRecorder의 참조값을 보관한다.
  var recorder = checkInRecorder;

  return {
    checkIn: function(attendee){
      attendee.checkIn();
      recorder.recordCheckIn(attendee);
    }
  }
};

Conference.checkInRecorder = function() {
  "use strict";

  return {
    recordCheckIn: function(attendee) {
      // 외부 서비스를 통해 체크인 등록한다
    }
  };
};
