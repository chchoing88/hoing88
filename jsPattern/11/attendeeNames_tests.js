/**
 * Created by merlin.ho on 2017. 6. 14..
 */

describe('Conference.WidgetTools.attendee',function(){
  'use strict';

  var attendeeWebApi,
    sandbox;

  beforeEach(function(){
    attendeeWebApi = Conference.attendeeWebApi();

    // post 메서드는 호출되면 안된다..
    // 그래도 혹시 모르니 스파이를 심어두어 확인한다..

    spyOn(attendeeWebApi,'post');

    //attendeeNames를 단위 테스트하고자 sandbox는 빈 객체로 지정한다..

    sandbox = {};
  });

  afterEach(function(){
    // 테스트할 때마다 post가 호출되지 않았는지 확인한다.
    expect(attendeeWebApi.post).not.toHaveBeenCalled();
  });

  it('주어진 sandbox 객체에 자신을 추가한다..',function(){
    Conference.WidgetTools.attendeeNames(sandbox, attendeeWebApi);

    expect(sandbox.attendeeNames).not.toBeUndefined();
  });

  describe('attendeeNames.getAll()',function(){

    var attendees,
      attendeeNames;

    beforeEach(function(){
      Conference.WidgetTools.attendeeNames(sandbox,attendeeWebApi);

      //테스트 참가자 배열을 채워 넣는다.
      attendees = [
        Conference.attendee("태희","김"),
        Conference.attendee("윤지","김"),
        Conference.attendee("정윤","김")
      ]
      //테스트 참가자 배열에서 이름을 추출한다..
      attendeeNames = [];

      attendees.forEach(function getNames(attendee){
        attendeeNames.push(attendee.getFullName());
      });
    });

    it('참가자 없을 경우 빈 배열로 귀결한다.',function(done){

      spyOn(attendeeWebApi,'getAll').and.returnValue(
        new Promise(function(resolve,reject){
          resolve([]);
        })
      );

      console.log(sandbox.attendeeNames.getAll());

      sandbox.attendeeNames.getAll().then(function resolve(names){
        expect(names).toEqual([]);
        done();
        },
      function rejected(reason){
        expect('실패함').toBe(false);
        done();
      });
    });

    it('참가자가 있을 경우 해당 이름으로 귀결한다..',function(){});

    it('어떤 사유로 인해 버려진다.',function(){});
  });
});
