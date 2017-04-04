/**
 * Created by merlin.ho on 2017. 3. 3..
 */

//반복자 패턴에 대해 알아보겠습니다. 순서가 있는 것들(수열, 배열 등)을 편리하게 탐색할 수 있는 패턴입니다.



var Beehives = (function(){
    function Beehives(arrayHive){
        this.hives = arrayHive.slice(0);
        this.index = 0;

    }

    Beehives.prototype.next = function(){
        var str = this.hives[this.index] + '에서 꿀을 걷습니다.';
        console.log(str);
        this.index++;
    };
    Beehives.prototype.done = function(){
        return this.index === this.hives.length;
    };
    return Beehives;
})();

//결과....
var beehives = new Beehives(['hive1', 'hive2', 'hive3', 'hive4', 'hive5', 'hive6', 'hive7', 'hive8', 'hive9']);
beehives.next(); // hive1에서 꿀을 걷습니다
console.log(beehives.done()); //false...