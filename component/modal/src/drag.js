
function drag(){
  var _clickX;
  var _clickY;
  var _elemOffsetX;
  var _elemOffsetY;
  var _elem;

  function getCssProperty(selector, property){
    var element = selector;
    if(typeof selector === 'string'){
     element = document.querySelector(selector);
    }

    var pro = window.getComputedStyle(element,null).getPropertyValue(property);
    return isNaN(parseFloat(pro))? pro : parseFloat(pro);
  }

  //offset x,y : 부모기준 좌표 상대적
  //client x,y : 전체 기준 좌표 절대적
  //offsetTop,Left : 부모가 포지션 높이값 상대적 ( 보더 포함 )
  //client Top , Left : 박스모델 보더 값. 보더를 기준으로 컨텐츠의 레프트 , 탑 값.

  return {
    init : function(e ,elem){
      _clickX = e.clientX;
      _clickY = e.clientY;
      _elem = elem;
      // console.log(_elem);
      _elem.style.transitionDuration = '0s';
      _elemOffsetX = getCssProperty(elem,'left');
      _elemOffsetY = getCssProperty(elem,'top');
    },
    move : function(e){
      if(!(_elem instanceof Element)){
        return false;
      }
      var moveX = e.clientX,
        moveY = e.clientY,
        resultX = moveX - _clickX,
        resultY = moveY - _clickY;
      // if( !(beforeX == resultX && beforeY == resultY) && !(moveX == 0 && moveY ==0) ){
      if(!(moveX == 0 && moveY ==0) ){

//                    console.log('resultX :'+ resultX + ',' + 'resultY :' + resultY);
//                    console.log('elemOffsetX :'+ elemOffsetX + ',' + 'elemOffsetY :' + elemOffsetY);

        var left = (resultX + _elemOffsetX);
        var top = (resultY + _elemOffsetY);

        _elem.style.left = left+'px';
        _elem.style.top = top+'px';

      }
    },
    end : function(){
      if(_elem instanceof Element){
        _elem.style.transitionDuration = '0.5s';
      }
      _elem = '';
    }
  }
}

export default drag();




