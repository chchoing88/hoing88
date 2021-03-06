/**
 * Created by merlin.ho on 2017. 5. 11..
 */
describe('Aop',function(){
  var targetObj,
    excutionPoints; // 실행 이벤트가 담긴 배열

  var argPassingAdvice, // 타깃에 인자를 전달할 어드바이스
    argsToTarget; // targetObj.targetFn 에 전달할 인자들

  var targetFnReturn = 1;

  var Target = function(){
    var self = this;
    this.targetFn = function(){
      expect(this).toBe(self);
    }
  };

  beforeEach(function() {
    targetObj = {
      targetFn: function () {
        excutionPoints.push('targetFn');
        argsToTarget = Array.prototype.slice.call(arguments,0);

        return targetFnReturn;
      }
    };

    excutionPoints = [];

    argPassingAdvice = function(targetInfo){
      return targetInfo.fn.apply(this, targetInfo.args);
    }
  });
  describe('Aop.around(fnName, advice, targetObj)',function(){

    it('타깃 함수를 해당 객체의 콘텍스트에서 실행한다.',function(){
      var targetInstance = new Target();
      var spyOnInstance = spyOn(targetInstance,'targetFn').and.callThrough();
      Aop.around('targetFn',argPassingAdvice,targetInstance);
      targetInstance.targetFn();

      expect(spyOnInstance).toHaveBeenCalled();
    });

    it('어드바이스를 타깃의 콘텍스트에서 실행한다',function(){
      var advice = function(){
        expect(this).toBe(targetObj);
      };

      Aop.around('targetFn',advice,targetObj);
      targetObj.targetFn();
    });



    it('타깃의 반환값도 어드바이스에서 참조할 수 있다',function(){
      Aop.around('targetFn',argPassingAdvice,targetObj);
      var returnedValue = targetObj.targetFn();

      expect(returnedValue).toBe(targetFnReturn);
    });

    it('어드바이스에서 타깃으로 일반 인자를 넘길 수 있다',function(){
      Aop.around('targetFn',argPassingAdvice, targetObj);
      targetObj.targetFn('a','b');
      expect(argsToTarget).toEqual(['a','b']);
    });

    it('타깃 함수를 호출 시 어드바이스를 실행하도록 한다',function(){

      var targetObj = {
        targetFn : function(){}
      };

      var excutedAdvice = false;
      var advice = function(){
        excutedAdvice = true;
      };

      Aop.around('targetFn',advice,targetObj);

      targetObj.targetFn();
      expect(excutedAdvice).toBe(true);
    });

    it('타깃 함수 호출 시 어드바이스를 실행하도록 한다',function(){
      var wrappingAdvice = function(targetInfo){
        excutionPoints.push('wrappingAdvice - 처음');
        targetInfo.fn();
        excutionPoints.push('wrappingAdvice - 끝');
      };

      Aop.around('targetFn', wrappingAdvice , targetObj);
      targetObj.targetFn();

      expect(excutionPoints).toEqual(
        ['wrappingAdvice - 처음','targetFn','wrappingAdvice - 끝']
      );
    });

    it('마지막 어드바이스가 기존 어드바이스에 대해 실행되는 방식으로 체이닝할 수 있다.',function(){
      var adviceFactory = function(adviceID){
        return (function(targetInfo){
          excutionPoints.push('wrappingAdvice - 처음 ' + adviceID);
          targetInfo.fn();
          excutionPoints.push('wrappingAdvice - 끝 ' + adviceID);
        });
      };

      // function(){
      //   var targetContext = {};
      //   advice.call(targetContext, {fn:originalFn});
      // };

      Aop.around('targetFn',adviceFactory('안쪽'), targetObj);
      Aop.around('targetFn',adviceFactory('바깥쪽'), targetObj);
      targetObj.targetFn();

      expect(excutionPoints).toEqual([
        'wrappingAdvice - 처음 바깥쪽',
        'wrappingAdvice - 처음 안쪽',
        'targetFn',
        'wrappingAdvice - 끝 안쪽',
        'wrappingAdvice - 끝 바깥쪽'
      ]);


    });

  });

  describe('Aop.next(context,targetInfo)',function(){
    var advice = function(targetInfo){
      return Aop.next.call(this,targetInfo);
    };
    var originalFn;
    beforeEach(function(){
      originalFn = targetObj.targetFn;
      Aop.around('targetFn',advice,targetObj);
    });

    it('targInfo.fn에 있는 함수를 호출한다',function(){
      targetObj.targetFn();
      expect(excutionPoints).toEqual(['targetFn']);
    });


  });



});