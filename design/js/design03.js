/**
 * Created by merlin.ho on 2017. 3. 1..
 */

//적응자 패턴
//객체를 생성하는 패턴이 아니다.
//기존에 있던 구조를 새 구조로 유연하게 전환하거나 새 구조에서 기존의 구조로 전환하는 데 사용하는 패턴입니다.

//현재 시스템은 현 황제를 자동적으로 지지하는 시스템이고, 신규 시스템은 새 황제를 추대할 수 있게 하는 시스템입니다.
//뒤의 인자만 바꾸면 시스템을 전환할 수 있게 만들고 싶습니다.


var SenateSystem = (function(){
    function SenateSystem(adapter){
        this.adapter = adapter;
    }
    SenateSystem.prototype.vote = function(){
        this.adapter.vote();

    }
    return SenateSystem;
})();

var currentAdapter = {
     vote : function(){
        console.log('현재 황제에 투표를 합니다!!');
    }
};
var rufusAdapter = {
   vote : function(){
      console.log('루푸스 에게 투표를 합니다!!');
  }
};


//결론은...? 이렇게 되고 싶어요~

var senateSystem = new SenateSystem(currentAdapter); // 현재 시스템
console.log(senateSystem.vote());
senateSystem = new SenateSystem(rufusAdapter); // 루푸스 어댑트
console.log(senateSystem.vote());

var galbaAdapter = {
    vote: function() {
        console.log('갈바를 황제로 추대합시다');
    }
};
senateSystem = new SenateSystem(galbaAdapter);
senateSystem.vote(); // 갈바를 황제로 추대합시다.