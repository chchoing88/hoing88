/**
 * Created by merlin.ho on 2017. 6. 14..
 */

/**
 * 샌드박스 도구 생성과 테스팅
 * attendeeNames 라는 도구를 만들자.
 * 이미 만들어진 attendeeWebApi 객체의 getAll() 메서드는 attendee 객체의 배열로 귀결하는 프라미스를 반환한다.
 * 이 attendeeNames 도구는 attendeeWebApi의 퍼사드로 삼아 필요한 기능을 표시한다.
 * 
 * 여기서!! 퍼사드로 삼는다 라는 것은
 * attendeeWebApi 이 아이를 좀더 손 쉽고 내 목적에 맞게끔 한번 더 wrapping 한다? 재구성한다? 이렇게 생각하면 좋을 듯 하다.
 * 프로그래밍을 잘 모르는 사용자에게도 손쉽게 최소한의 API만 공개한다.
 */

var Conference = Conference || {};
Conference.WidgetTools = Conference.WidgetTools || {};

Conference.WidgetTools.attendeeNames = function (sandbox, injectedAttendeeWebApi) {

  'use strict';

  // attendeeApi를 선택적으로 주입할 수 있게 코딩한다 단위 테스트 할때 유용하다.
  var attendeeWebApi = injectedAttendeeWebApi || Conference.attendeeWebApi();

  sandbox.attendeeNames = {
    getAll: function gatAll() {
      return attendeeWebApi.getAll()
        .then(function extractNames(attendees) {
          //각 참가자의 전체 성명만 추출하여 반환한다
          var names = [];
          attendees.forEach(function addName(attendee) {
            names.push(attendee.getFullName());
          });

          return names;
        });
    }
  }
};
