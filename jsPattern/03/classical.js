/**
 * Created by merlin.ho on 2017. 5. 20..
 */
//개방 폐쇄 원칙을 제대로 실천한 사례...
function Marsupial(name , nocturnal){
  if(!(this instanceof Marsupial)){
    throw new Error("이 객체는 new를 사용하여 생성해야 합니다");
  }
  this.name = name;
  this.nocturanl = nocturnal;
}

Marsupial.prototype.isAwake = function(isNight){
  return isNight == this.isNocturnal;
};

function Kangaroo(name){
  if(!(this instanceof Kangaroo)){
    throw new Error("이 객체는 new를 사용하여 생성해야 합니다");
  }
  this.name = name;
  this.isNocturnal = false;
}

Kangaroo.prototype = new Marsupial();  // 추후에 constructor를 바꿔줘야...

Kangaroo.prototype.hop = function(){
  return this.name + " 가 껑충 뛰었어요!";
};

var jester = new Kangaroo("제스터");
console.log(jester.name);

var isNightTiem = false;
console.log(jester.isAwake(isNightTiem)); //true
console.log(jester.hop());

console.log( jester instanceof Kangaroo);
console.log( jester instanceof Marsupial);