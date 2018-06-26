/**
 * Created by merlin.ho on 2017. 6. 13..
 */

//WidgetSandbox 생성자 함수는 new 키워드를 사용해야 하고 적어도 하나의 인자 즉 샌드박스에
// 격리할 위젯 생성함수를 받도록 작성한다..

describe('Conference.WidgetSandbox',function(){

  'use strict';

  describe('생성자 함수',function(){

    var widgetFcnSpy;

    beforeEach(function(){
      // 테스트가 실제 도구에 구애받지 않게
      // 테스트 도구를 추가한다.

      Conference.WidgetTools.tool1 = function(sandbox){
        return {};
      };
      Conference.WidgetTools.tool2 = function(sandbox){
        return {};
      };

      //위젯 함수 역할을 대시할 스파이를 만든다..
      widgetFcnSpy = jasmine.createSpy();
    });

    afterEach(function(){
      // 테스트 도구를 삭제한다..
      delete Conference.WidgetTools.tool1;
      delete Conference.WidgetTools.tool2;
    });


    it('new 키워드로 실행하지 않으면 예외를 던진다.',function(){
      expect(function shouldThrow(){
        var sandbox = Conference.WidgetSandbox();
      }).toThrowError(Conference.WidgetSandbox.messages.mustBeCalledWithNew);
    });

    it('위젯함수가 누락되면 에러를 던진다',function(){
      [null,undefined,1,"Something",false].forEach(function testInvalid(notAfcn){
        expect(function shouldThrow(){
          var sandbox = new Conference.WidgetSandbox(notAfcn);
        }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);

      });
    });

    it('sandbox를 인자로 위젯 함수를 실행한다.',function(){
      var widgetFcn = jasmine.createSpy();
      var sandbox = new Conference.WidgetSandbox(widgetFcn);

      expect(widgetFcn).toHaveBeenCalledWith(sandbox);
    });


    describe('new WidgetSandbox(toolsArray,widgetModule)',function(){

      it('위젯 함수가 누락되면 예외를 던진다.',function(){
        [null,undefined,1,"Something",false].forEach(function testInvalid(val){
          expect(function shouldThrow(){
            var sandbox = new Conference.WidgetSandbox('tool1','tool2',val)
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it('sandbox를 인자로 위젯 함수를 실행한다.',function(){
        var widgetFcn = jasmine.createSpy();
        var sandbox = new Conference.WidgetSandbox('tool1','tool2',widgetFcn);

        //

        expect(widgetFcn).toHaveBeenCalledWith(sandbox);
      });

      it('올바르지 않은 도구를 지정하면 예외를 던진다.',function(){
        var badTool = 'badTool';
        expect(function shouldThrow(){
          var sandbox = new Conference.WidgetSandbox(['tool1',badTool],widgetFcnSpy)
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool + badTool);


      });

      it('도구 모듈 함수를 sandbox에서 실행한다.',function(){

        spyOn(Conference.WidgetTools,'tool1');
        spyOn(Conference.WidgetTools,'tool2');

        var sandbox = new Conference.WidgetSandbox(['tool1','tool2'],widgetFcnSpy);

        expect(Conference.WidgetTools.tool1).toHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2).toHaveBeenCalledWith(sandbox);

      });

    });

    describe('new WidgetSandbox("tool1",...,"toolN",widgetModule)',function(){
      // 도구 목록을 개별 인자 형태로 넘겼을 때 작동 여부를 테스트..
      it('위젯 함수가 누락되면 예외를 던진다.',function(){
        [null,undefined,1,"Something",false].forEach(function testInvalid(val){
          expect(function shouldThrow(){
            var sandbox = new Conference.WidgetSandbox('tool1','tool2',val)
          }).toThrowError(Conference.WidgetSandbox.messages.fcnMustBeProvided);
        });
      });

      it('sandbox를 인자로 위젯 함수를 실행한다.',function(){
        var widgetFcn = jasmine.createSpy();
        var sandbox = new Conference.WidgetSandbox('tool1','tool2',widgetFcn);

        //

        expect(widgetFcn).toHaveBeenCalledWith(sandbox);
      });

      it('올바르지 않은 도구를 지정하면 예외를 던진다.',function(){
        var badTool = 'badTool';
        expect(function shouldThrow(){
          var sandbox = new Conference.WidgetSandbox('tool1',badTool,widgetFcnSpy);
        }).toThrowError(Conference.WidgetSandbox.messages.unknownTool + badTool)
      });

      it('도구 모듈 함수를 sandbox에서 실행한다.',function(){
        spyOn(Conference.WidgetTools,'tool1');
        spyOn(Conference.WidgetTools,'tool2');

        var sandbox = new Conference.WidgetSandbox('tool1','tool2',widgetFcnSpy);

        expect(Conference.WidgetTools.tool1).toHaveBeenCalledWith(sandbox);
        expect(Conference.WidgetTools.tool2).toHaveBeenCalledWith(sandbox);
      });

    });

  });


});