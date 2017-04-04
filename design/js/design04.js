/**
 * Created by merlin.ho on 2017. 3. 1..
 */

// 복합체..

//복합체 패턴은 트리 구조에 사용되는 패턴인데요.
//사실 자바스크립트를 하는 사람이면 한 번 쯤은 써본 패턴일 겁니다. 써본 적이 없다고요? 써봤다니까요!

//바로 jQuery가 복합체 패턴을 따릅니다. jQuery는 하나의 태그를 선택하든, 여러 개의 태그를 동시에 선택하든 모두 같은 메소드를 쓸 수 있습니다. 예를 들면, $('#zero')로 하나의 태그를 선택할 수도 있고, $('p')로 모든 p 태그를 선택할 수도 있습니다. 하지만 개수와 상관 없이 모두 attr이나 css같은 메소드를 사용할 수 있습니다. 이제 직접 복합체 패턴을 사용한 객체를 만들어봅시다.

//로마 군단은 군단 아래에 10개의 대대(Cohort)가 있습니다. 한 개의 대대 아래에는 6개의 중대(Century), 한 개의 중대 아래에는 10개의 분대(Contuberium)가 있죠. 한 분대가 8명으로 이루어져 있으니까 총 군단의 군사 수는 8*10*6*10 = 4800명 정도 되겠네요. (실제로는 기병도 있고 해서 더 많습니다...)



//중대...
var Century = (function(){
    function Century(leader){
        this.leader = leader;
    }

    Century.prototype.getLeader = function(){
        return this.leader;
    };

    Century.prototype.getNumber = function(){
        return 80; //중대는 80명...
    };
    return Century;
})();

//대대
var Cohort = (function(){
    function Cohort(leader){
        this.leader = leader;
        this.centurys = [];
    }
    Cohort.prototype.getLeader = function(){
        return this.leader;
    };
    Cohort.prototype.getNumber = function(){
        var sum = 0;
        this.centurys.forEach(function(value , index , array){ // 매개변수 array 는 지금 적용되고 있는 this.centurys배열을 가리키고 있음...
            sum += value.getNumber();
        });
        return sum;
    };
    Cohort.prototype.addCentury = function(obj){
        this.centurys.push(obj);
        return this;
    };

    return Cohort;
})();

var Legion = (function() {
    function Legion(leader) {
        this.leader = leader;
        this.cohorts= [];
    }
    Legion.prototype.getLeader = function() {
        return this.leader;
    };
    Legion.prototype.getNumber = function() {
        var sum = 0;
        this.cohorts.forEach(function(cohort) {
            sum += cohort.getNumber();
        });
        return sum;
    };
    Legion.prototype.addCohort = function(cohort) {
        this.cohorts.push(cohort);
        return this;
    };
    return Legion;
})();

var century1 = new Century('Maximus');
var century2 = new Century('Tiberius');
var century3 = new Century('Lukius');
var century4 = new Century('Marcus');
var century5 = new Century('Pompeius');
var century6 = new Century('Zero');
var cohort1 = new Cohort('Vitellius');
var cohort2 = new Cohort('Otho');
var legion = new Legion('Galba');

cohort1.addCentury(century1).addCentury(century2);

console.log(cohort1.getNumber());

legion.addCohort(cohort1);
console.log(legion.getNumber());