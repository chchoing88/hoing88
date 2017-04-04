/**
 * Created by merlin.ho on 2017. 3. 2..
 */

//안녕하세요. 이번 시간에는 명령 패턴에 대해 알아보겠습니다. 명령 패턴은 이름 그대로 명령을 내리는 패턴입니다. 퍼사드 패턴 시간에 갈바가 군단에게 명령을 내리는 것 같이요. 다른 점은 명령이 독립적으로 있기 때문에 얼마든지 새로운 명령을 추가할 수 있다는 점입니다. 또한 undo 메소드를 만들어서 잘못된 명령을 내렸을 때 이전으로 되돌릴 수 있죠. 코드로 보겠습니다.


var Vitellius = (function(){
    function Vitellius(){

    }
    Vitellius.prototype.approve = function(commander){
        commander.execute();
    };

    return Vitellius;
})();

var Commander = (function(){
    function Commander(){
        this.command = [];

    }

    Commander.prototype.execute = function(){
      this.command.forEach(function(val){
          val();
      })
    };

    Commander.prototype.do = function(command , arg){
        this.command.push(function(){
            command.call(null,arg);
        })

    };

    Commander.prototype.undo = function(){
        this.command.pop();
    };

    return Commander;
})();

var strategy = {
    climbAlps: function() {
        console.log('알프스를 오릅니다');
    },
    prepareSupply: function(number) {
        console.log('보급품을 ' + number + '만큼 준비합니다');
    },
    attackRome: function() {
        console.log('로마를 공격합니다');
    }
};

var vitellius = new Vitellius();
var caecina = new Commander();
//전략을 짠다...
caecina.do(strategy.prepareSupply,5000);
caecina.undo(); // strategy.prepareSupply(5000) cancel;
caecina.do(strategy.prepareSupply,3000);
caecina.do(strategy.climbAlps);
caecina.do(strategy.attackRome);

//전략을 짰으니..왕이 승인을 한다...
vitellius.approve(caecina); // 그럼 caecina가 자동으로 실행한다.

//나중에 명령을 더 추가하고 싶으면 strategy 객체에 추가하면 됩니다. Commander는 명령을 총체적으로 관리하는 객체이고 strategy는 명령을 모아둔 객체입니다. 비텔리우스는 사용자라고 생각하면 됩니다. 사용자가 어떤 동작을 하면(위의 코드처럼 approve 함수를 호출한다든지, 버튼에 이벤트리스너를 연결한 후 버튼을 누른다든지) Commander는 명령을 실행하는 겁니다.


