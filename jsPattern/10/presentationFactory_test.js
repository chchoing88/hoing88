/**
 * Created by merlin.ho on 2017. 6. 11..
 */

describe('presentationFactory',function(){
  var factory = Conference.presentationFactory();  // create 메서드를 지닌 객체를 리턴한다...

  var baseParameter = {
    title : '자바스크립트를 멋지게 사용해보세요',
    presenter : '박길벗'
  };

  describe('create(objectLiteral)',function(){
    it('파라미터에 이상한 프로퍼티가 있으면 예외를 던진다.',function(){
      var badProp = 'badProperty';

      function createWithUnexpectedProperties(){
        var badPram = {};
        badPram[badProp] = 'unexpected!';
        factory.create(badPram);
      }

      expect(createWithUnexpectedProperties).toThrowError(
        Conference.presentationFactory.messages.unexpectedProperty + badProp
      );
    });

    describe('기본 프로퍼티만 있을 경우',function(){
      var fakePresentation = {title:'프리젠테이션을 베끼는 방법'},
        spyOnConstructor,
        returnedPresentation;

      beforeEach(function(){
       spyOnConstructor = spyOn(Conference,'Presentation').and.returnValue(fakePresentation);

       returnedPresentation = factory.create(baseParameter);
      });

      it('모든 값을 presentation 생성자에게 넘긴다.',function(){
        expect(spyOnConstructor).toHaveBeenCalledWith(baseParameter.title,baseParameter.presenter);
      });

      it('presentation 생성자를 딱 한 번만 호출한다.',function(){
        expect(spyOnConstructor.calls.count()).toBe(1)
      });

      it('생성한 Presentation을 반환한다',function(){
        expect(factory.create(baseParameter)).toBe(fakePresentation);
      });

    });
  });
});
