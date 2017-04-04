/**
 * Created by merlin.ho on 2017. 3. 1..
 */

//퍼사드 패턴


//퍼사드는 외관이라는 뜻인데 다른 패턴과는 달리 번역하지 않고 그대로 쓰이더라고요. 저도 그냥 따라서 쓰겠습니다. 외관이라는 이름답게 겉만 볼 수 있습니다. 속은 보이지 않죠. 복잡한 것들, 세부적인 것들은 감추고, 간단한 것만 보여주는 패턴입니다.

//갈바는 군단 편제를 마쳤습니다. 이제 로마로 진격합니다! 갈바 아래에는 세 개의 군단이, 그 아래에는 30개의 대대, 180개의 중대, 1800개의 분대가 있습니다. 황제인 갈바가 모든 분대에 지휘를 각각 내릴까요? 아니겠죠? 큰 틀의 지휘를 하면 군단장들이 명령을 받고, 다시 그 명령을 대대장들이 받고 이렇게 내려갈 겁니다.


var Galba = (function(){
    function Galba(){
        this.legion = [];
        this.legion.push(new Legion(1));
        this.legion.push(new Legion(2));
        this.legion.push(new Legion(3));
    }
    Galba.prototype.march = function(){
        this.legion.forEach(function(val , index , array){
            val.supply();
            val.makeFormation();
            val.goForward();
        });
    };
    Galba.prototype.attack = function(){};
    Galba.prototype.halt = function(){};
    Galba.prototype.retreat = function(){};

    return Galba;
})();

var Legion = (function(){
    function Legion(number){
        this.number = number;
    }

    Legion.prototype.supply = function() {
    };
    Legion.prototype.makeFormation = function() {
    };
    Legion.prototype.goForward = function() {
    };
    Legion.prototype.pullOutSword = function() {
    };
    Legion.prototype.runToEnemy = function() {
    };
    Legion.prototype.halt = function() {
    };
    Legion.prototype.retreat = function() {
    };


    return Legion;
})();

