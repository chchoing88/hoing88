/**
 * Created by merlin.ho on 2017. 5. 22..
 */
describe('Conference.checkInService',function(){
  'use strict';
  var checkInService,
    checkInRecorder,
    attendee;

  beforeEach(function(){
    checkInRecorder = Conference.checkInRecorder();
    checkInService = Conference.checkInService(checkInRecorder);
    attendee = Conference.attendee('형철','서');
  });

  describe('checkInService.checkIn(attendee)',function(){

    describe('checkInRecorder 성공 시',function(){
      var checkInNumber = 1234;

      beforeEach(function(){

        // checkInRecorder의 recordCheckIn을 호출하면 대답을 조작한다..
        // 대답을 프로미스 객체를 반환...
        // 그러면 성공 콜백이 checkInNumber를 파라미터로 받는다.
        spyOn(checkInRecorder,'recordCheckIn').and.callFake(function(){
          return Promise.resolve(checkInNumber);
        });
      });

      it('참가자를 체크한 것으로 표시한다.',function(){
        checkInService.checkIn(attendee);
        expect(attendee.isCheckedIn()).toBe(true);
      });
      it('체크인을 등록한다.',function(){
        checkInService.checkIn(attendee);
        expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
      });
      //새롭게 추가된 테스트
      it('참가자의 checkInNumber를 지정한다',function(done){
        //아래와 같이 코딩을 하게 되면 promise는 비동기이기 때문에 expect 한 이후에 then에 있는 콜백이 실행된다..
        //checkInService.checkIn(attendee);
        //expect(attendee.getCheckInNumber()).toBe(checkInNumber);

        // 하여 then에 있는 resolve함수가 호출된 이후에 expect를 할 필요가 있다..
        checkInService.checkIn(attendee).then(
          function onPromiseResolved(){
            expect(attendee.getCheckInNumber()).toBe(checkInNumber);
            done(); //done을 생략하면 재스민은 비동기 작업이 미처 다 끝나기도 전에 테스트를 종료한다.
          },
          function onPromiseRejected(){
            expect('이 실패 분기 코드가 실행됐다').toBe(false);
            done(); //
          }
        );
      });


    });
  });
});

describe('Conference.checkInrecorder',function() {
  'use strict';

  var attendee, checkInRecorder;
  beforeEach(function () {
    attendee = Conference.attendee('일웅', '이');
    attendee.setId(777);
    checkInRecorder = Conference.checkInRecorder();

    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  describe('recordCheckIn(attendee)', function () {

    it('HTTP 요청이 성공하여 참가자가 체크인되면 체크인 번호로 이루어진 프라미스를 반환한다', function () {
      var expectedCheckInNumber = 1234,
        request;
      attendee.checkIn();
      checkInRecorder.recordCheckIn(attendee).then(
        function promiseResolved(actualCheckInNumber) {
          expect(actualCheckInNumber).toBe(expectedCheckInNumber);
          done();
        },
        function promiseRejected() {
          expect('프라미스는 버려졌다').toBe(false);
        });
      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/checkin/' + attendee.getId());
      request.response({
        "status": 200,
        "contentType": "text/plain",
        "responseText": expectedCheckInNumber
      });
    });

  });
});
