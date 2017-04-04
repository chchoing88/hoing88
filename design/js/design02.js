/**
 * Created by merlin.ho on 2017. 3. 1..
 */

//빌더...

//빌더 패턴은 옵션이 많을때 사용합니다.
// 큰 유형은 같지만 세부사항이 다를때 사용한다.



// makeLegion을 구현해보자
var makeLegion = function(Leader){
    var leader = Leader;
    var adjutants = null;
    var army = 0;

    return {
        setAdjutant : function(adjutant){
            //console.log(this);
            adjutants = adjutant;
            return this;
        },
        setArmy : function(number){
            army = number;
            return this; //현재 리턴되는 객체가 반환된다....
        },
        build : function(){
            // return {
            //     leader : leader,
            //     adjutants : adjutants,
            //     army : army
            // }

            return new Legion(leader, adjutants, army);
        }
    }
};


//위의 build 메서드에서 리턴될 인스턴스를 싱글턴 말고 new로 생성되는 객체로 만들어보자.
// 왜냐 ..아래 리턴되는 군단에 공격하라는 메서드를 추가하고 싶다...
// 클래스를 하나 만든다...군단에 관련된...
var Legion = (function(target){ //target이 되는 객체를 받을 수 있다....
    function Legion(leader, adjutants, army){
        this.leader = leader;
        this.adjutants = adjutants || null;
        this.army = army || 0;
    }
    Legion.prototype.attack = function(){
        console.log('Legion attack!!!');
    }

    return Legion;

})();

//var a = makeLegion('ho');
//a.setAdjutant();
// 결과..

var galbaLegion = makeLegion('galba').setAdjutant(['ho','cho','Ro']).setArmy(8000).build();
var rufusLegion = makeLegion('rufus').setArmy(10000).build();

console.log(galbaLegion);
console.log(rufusLegion);

//바뀐 점은 Legion을 따로 생성자 객체로 만들어 prototype을 사용할 수 있게 되었다는 거죠.
//이렇게 빌더 패턴을 사용하면 손쉽게 옵션을 바꿔가며 객체를 만들 수 있습니다.