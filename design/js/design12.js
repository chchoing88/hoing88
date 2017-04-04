/**
 * Created by merlin.ho on 2017. 3. 7..
 */

//전략 패턴

//도나우 군단과 무키아누스의 지지를 받는 베스파시아누스는 이제 로마로 진격합니다. 로마로 가는 방법은 여러 가지가 있습니다. 이스라엘에서 지중해를 통해 배로 이탈리아로 가거나, 터키를 거쳐서 육로로 갈 수 있습니다. 또 수도를 공략하는 방법도 여러가지가 있겠죠. 지도자라면 상관에 맞게 전략전술을 수정할 수 있어야합니다. 여러가지 전술을 빠르게 변경할 수 있는 디자인 패턴입니다.


//전략을 설정하는 부분 따로, 실행하는 부분 따로라서, 전략을 설정해두면 실행하기 전에 자유롭게 전략을 바꿀 수 있습니다. 실행한 후에도 바꿀 수 있고요.

var Strategy = (function(){
    function Strategy(){
        this.strategy = null;
    }

    // 전략 설정..
    Strategy.prototype.setStrategy = function(obj){
        this.strategy = obj;
    };
    // 전략 실행..
    Strategy.prototype.execute = function() {
        this.strategy.execute();
    };

    return Strategy;
})();

var ShipStrategy = (function(){
    function ShipStrategy(){}
    ShipStrategy.prototype.execute = function() {
        console.log('배로 이탈리아에 갑니다');
    };
    return ShipStrategy;
})();
var LandStrategy = (function(){
    function LandStrategy(){}
    LandStrategy.prototype.execute = function() {
        console.log('육로로 이탈리아에 갑니다');
    };
    return LandStrategy;
})();

// 결론...이렇게...
var strat = new Strategy();
var ship = new ShipStrategy();
var land  = new LandStrategy();

strat.setStrategy(ship);
strat.setStrategy(land);
strat.execute();