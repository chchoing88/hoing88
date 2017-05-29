/**
 * Created by merlin.ho on 2017. 5. 20..
 */


//함수형 상속을 하면 데이터를 숨긴 채 접근을 다스릴 수 있다...

var AniamlKingdom = AniamlKingdom || {};

AniamlKingdom.marsupial = function(name , nocturnal) {

  var instanceName = name,
    instanceIsNocturnal = nocturnal;

  return {
    getName : function () {
      return instanceName;
    },
    getIsNocturnal : function () {
      return instanceIsNocturnal;
    }
  }
};

AniamlKingdom.kangaroo = function(name){
  var baseMarsupial = AniamlKingdom.marsupial(name , false);

  baseMarsupial.hop = function(){
    return baseMarsupial.getName() + '가 껑충 뛰없어요!';
  };

  return baseMarsupial;
};

var jester = AniamlKingdom.kangaroo('제스터');
console.log(jester.getName());
console.log(jester.getIsNocturnal());
console.log(jester.hop());