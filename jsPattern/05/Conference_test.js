/**
 * Created by merlin.ho on 2017. 5. 22..
 */

describe('Conference.attendeeCollection',function(){
  describe('contains(attendee)',function(){

  });

  describe('add(attendee)',function(){

  });

  describe('remove(attendee)',function(){

  });

  describe('iterate(callback)',function(){
    var collection, callbackSpy;

    //도우미 함수..
    function addAteddsToCollection(attendeeArray){
      attendeeArray.forEach(function(attendee){
        collection.add(attendee);
      });
    }


    function verifyCallbackWasExcutedForEachAttendee(attendeeArray){

      //각원소마다 한번씩 스파이가 호출되었는지 확인한다...
      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

      //각 호출마다 spy에 전달한 첫 번째 인자가 해당 attendee인지 확인한다.
      var allCalls = callbackSpy.calls.all();
      for(var i = 0; i < allCalls.length; i++){
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }

    beforeEach(function(){
      collection = Conference.attendeeCollection(); // 객체...반환.
      callbackSpy = jasmine.createSpy();
    });

    it('빈 컬렉션에서는 콜백을 실행하지 않는다.',function(){
      collection.iterate(callbackSpy);

      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('원소가 하나뿐인 컬렉션은 콜백을 한번만 실행한다.',function(){
      var attendees = [
        Conference.attendee('윤지','김')
      ];

      addAteddsToCollection(attendees);
      collection.iterate(callbackSpy);
      verifyCallbackWasExcutedForEachAttendee(attendees);
    });

    it('컬렉션 원소마다 한 번씩 콜백을 한다.',function(){
      var attendees = [
        Conference.attendee('Tom','Kazansky'),
        Conference.attendee('Charlotte','Blackwood'),
        Conference.attendee('태영','김')
      ];
      addAteddsToCollection(attendees);
      collection.iterate(callbackSpy);
      verifyCallbackWasExcutedForEachAttendee(attendees);
    });
  });

  describe('Conference.checkInService',function(){
    // checkInService 에다가 외부 시스템의 체크인 등록 기능인 checkInRecorder의 인스턴스를 주입..
    var checkInService,
      checkInRecorder,
      attendee;

    beforeEach(function(){
      checkInRecorder = Conference.checkInRecorder();
      spyOn(checkInRecorder,'recordCheckIn'); // spyOn(someObject, 'someFunction')
      // checkInreCorder를 주입하면서
      // 이 함수의 recordCheckIn 함수에 스파이를 심는다.
      checkInService = Conference.checkInService(checkInRecorder);

      attendee = Conference.attendee('형철','서');
    });

    describe('checkInService.checkIn(attendee)',function(){
      it('참가자를 체크인 처리한 것으로 표시한다.',function(){
        checkInService.checkIn(attendee);
        expect(attendee.isCheckedIn()).toBe(true);
      });

      it('체크인을 등록한다.',function(){
        checkInService.checkIn(attendee);
        expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee); // ??
      });
    });

  });
});
