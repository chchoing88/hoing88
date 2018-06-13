/**
 * Created by merlin.ho on 2017. 7. 2..
 */


describe('attendeeProfileProxy(attendees, profileService,prefetchLimit)',
  function() {
    'use strict';

    var proxy = Conference.attendeeProfileProxy,
      profileService = Conference.attendeeProfileService(),
      attendees = [
        { attendeeId: 10, profileViews: "3" },
        { attendeeId: 11, profileViews: "0" },
        { attendeeId: 12 },
        { attendeeId: 13, profileViews: "3" },
        { attendeeId: 14, profileViews: "10"},
        { attendeeId: 15, profileViews: "2" },
        { attendeeId: 16, profileViews: "1" },
      ],
      spyOnProfileService;

    ////// 여기 시작
    function makeServiceReturn(attendeeId) {
      return "이 문자열이 ID가 " + attendeeId + "인 참가자에 대한 서비스의 실제 반환값이라고 가정한다.";
    }

    beforeEach(function() {
      spyOnProfileService = spyOn(profileService,'getProfile')
        .and.callFake(function(attendeeId) {
          return makeServiceReturn(attendeeId);
        });
    });

    /////////// 여기 끝

    describe('초기화', function () {
      it('prefetchLimit가 양수가 아니면 프로필을 전혀 선취하지 않는다', function() {
        var notPositiveNumbers = [-1,0,undefined,'abc', function() {}];
        notPositiveNumbers.forEach(function(prefetchLimit) {
          proxy(attendees, profileService, prefetchLimit);
        });
        expect(spyOnProfileService.calls.count()).toBe(0);
      });
      it('prefetchLimit가 참가자 인원수를 초과하면 전체 프로필을 선취한다', function() {
        proxy(attendees, profileService, attendees.length+1);
        expect(spyOnProfileService.calls.count()).toBe(attendees.length);
      });
      it("가장 인기 있는 프로필부터 'prefetchLimit'개 만큼 선취한다", function() {
        var prefetchLimit = 3;
        proxy(attendees, profileService, prefetchLimit);
        expect(spyOnProfileService.calls.count()).toBe(prefetchLimit);
        expect(spyOnProfileService).toHaveBeenCalledWith(14);
        expect(spyOnProfileService).toHaveBeenCalledWith(10);
        expect(spyOnProfileService).toHaveBeenCalledWith(13);
      });
    });


    /// 여기부터..,.,.,.
    describe('getProfile(attendeeId)', function() {
      var prefetchLimit = 3,
        proxyInstance;

      beforeEach(function() {
        proxyInstance = proxy(attendees, profileService, prefetchLimit);
      });

      it('요청 시 선취한 프로필을 반환한다', function() {
        var attendeeId = 13,
          // 프록시에 있는 getProfile을 호출하면 내부에 감싼 attendeeProfileService가 대신 값을 반환할 것이다...
          profile = proxyInstance.getProfile(attendeeId);
        // makeServiceReturn 의 정체 : 프록시 패턴 역시 진짜 할 일(프로필을 빼오는것 )은 실체(attendeeProfileService) 에 위임한다.
        expect(profile).toBe(makeServiceReturn(attendeeId));
        expect(spyOnProfileService.calls.count()).toBe(prefetchLimit);
      });
    });


  });