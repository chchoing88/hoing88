/**
 * Created by merlin.ho on 2017. 5. 20..
 */
// 부분 조합 같은 이름
// 멍키 패칭은 추가 프로퍼티를 객체에 붙이는 것이다. 다른 객체의 함수를 붙여 객체의 덩치를 불리는 일은 자바스크립트 언어가 제격이다.
// 빌린 함수에 다른 요건이 추가될 가능성은 항상 있다..
  // 따라서 패치를 관장하는 '빌려주는 객체'(휴먼)가 빌리는 객체(고릴라)가 요건을 충족하는지 알아보게 하는것이 가장 좋은 멍키 패칭 방법이다..

var MyApp = MyApp || {};

MyApp.Hand = function(){

  this.dataAboutHand = {}; // etc.
};
MyApp.Hand.prototype.arrangeAndMove = function(sign){
  this.dataAboutHand = '새로운 수화 동작';
};



MyApp.Human = function(handFactory){
  this.hands = [ handFactory(), handFactory() ];
};

MyApp.Human.prototype.useSignLanguage = function(message){
  var sign = {};
  // 메시지를 sign에 인코딩한다.
  this.hands.forEach(function(item){
    item.arrangeAndMove(sign);
  });

  return '손을 움직여 수화하고있어 무슨 말인지 알겠니?';
};

//// 빌리려는 객체가 요건이 충족이 되는가???
MyApp.Human.prototype.endowSigning = function(receivingObject){
  if(typeof receivingObject.getHandCount === 'function'
  && receivingObject.getHandCount() >= 2){
    receivingObject.useSignLanguage = this.useSignLanguage;
  }else{
    throw new Error("미안하지만 너에게 수화를 가르쳐줄 수는 없겠어.")
  }
};
////

MyApp.Gorilla = function(handFactory){
  this.hands = [ handFactory(),handFactory() ];
};
//// 고릴라는 내 손이 2개 이상 있다는 사실을 알려줄 함수가 필요하다... 그래야 휴먼한테 수화하는 방법을 배울 수 있다.
MyApp.Gorilla.prototype.getHandCount = function(){
  return this.hands.length;
};
////


MyApp.TeachSignLanguageTokoko = (function(){
  var handFactory  = function(){
    return new MyApp.Hand();
  };

  // ( 빈자의 의존성 주입 )
  var trainer = new MyApp.Human(handFactory);
  var koko = new MyApp.Gorilla(handFactory);

  //이부분이 멍키패치
  //koko.useSignLanguage = trainer.useSignLanguage;
  //해당 메서드를 받을 객체가 요건이 충족한지 별도의 로직을 거친다.
  // 요건이 충족하면 패치를 하고 아니면 에러 뿜뿜..
  trainer.endowSigning(koko);

  console.log(koko.useSignLanguage('안녕하세요!!'));

})();