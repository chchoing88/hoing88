/**
 * Created by merlin.ho on 2017. 6. 24..
 */
function SportsCompare(elem){

  if(!(this instanceof SportsCompare)){
    return new SportsCompare(elem);
  }

//    private

  var MAX_WIDTH = 65,
    MIN_WIDTH = 17.5;

  var self = this,
    _wrapElements,
    _listElements,
    _currentSelectedElement,
    _currentSelectedIndex,
    _basePageX,
    _isAngleOk,
    _firstTouchPoint,
    _totalDistX,
    _directionX = 0,
    _currentSelectedWidth = MAX_WIDTH,
    _nextSelectedWidth = MIN_WIDTH;

  function _init(){
    _wrapElements = $(elem);
    _listElements = _wrapElements.children('.list_schedule');
    _currentSelectedElement = _wrapElements.find('.selected_list');
    _currentSelectedIndex = _currentSelectedElement.index();

    _wrapElements[0].addEventListener('touchstart',self,false);

  }

  function _getPage(event, page) {
    return event.changedTouches ? event.changedTouches[0][page] : event[page];
  }



  // touchmove 가 적용될때..x값..
  function _setX(moveX,direction){


    var nextSelectedElement;
    var notSelectedElement;

    if(direction === 'left'){ // 다음께 확장..
      nextSelectedElement = _currentSelectedElement.next();
      notSelectedElement = _currentSelectedElement.prev();
    }else if(direction === 'right'){ // 이전께 확장..
      nextSelectedElement = _currentSelectedElement.prev();
      notSelectedElement = _currentSelectedElement.next();
      moveX = moveX * -1;
    }



    if( Math.abs(moveX) === MAX_WIDTH ){
      _currentSelectedWidth = MAX_WIDTH;
      _nextSelectedWidth = MIN_WIDTH;

      _currentSelectedElement.addClass('selected_list').css({'width': MAX_WIDTH +'%'}).siblings().removeClass('selected_list').css({'width':MIN_WIDTH+'%'});



    }else{

      _currentSelectedWidth = (parseFloat(_currentSelectedWidth) + moveX).toFixed(1);
      _nextSelectedWidth = (parseFloat(_nextSelectedWidth) - moveX).toFixed(1);

      if( _currentSelectedWidth >= MIN_WIDTH && _currentSelectedWidth <= MAX_WIDTH) {
        _currentSelectedElement.css({'width': _currentSelectedWidth + '%'});
        nextSelectedElement.css({'width': _nextSelectedWidth + '%'});
        notSelectedElement.css({'width': '17.5%'});

      }
    }

  }

  function _hasNext(element){
    if(element.next().index() !== -1 ){
      return true;
    }
    return false;
  }

  function _hasPrev(element){
    if(element.prev().index() !== -1 ){
      return true;
    }
    return false;
  }

  function _moveToTab(index){
    var destinationElement = _listElements.eq(index);
    var cssSetting = {
      'transition-duration':'0.3s',
      'transition-property' : 'all',
      'transition-timing-function':'ease-in-out'
    };

    _listElements.css(cssSetting);

    _currentSelectedElement = destinationElement;
    _currentSelectedIndex = index;

    if(_directionX < 0 ){
      _setX(MAX_WIDTH);
    }else if(_directionX > 0 ){
      _setX(MAX_WIDTH)
    }

  }

  function _touchMoveTab(moveX,index){
    // if -2(음수)가 넘어오면 다음꺼 보기위한것 select된 녀석은 2% 빼고 다음껀 2%늘린다..
    // max 65% , min 17.5%
    var direction;
    _listElements.css({'transition-duration':'0s'});

    if( index == 0 ){
      // 첫번째 탭
      direction = 'left';
    }else if(index == 1){
      // 가운데 탭
      if(_totalDistX < 0){
        //처음 터치 이후 계속 왼편에 머무르고 있어요~
        direction = 'left';
      }else if(_totalDistX > 0){
        //처음 터치 이후 계속 오른편에 머무르고 있어요~
        direction = 'right';
      }
    }else if( index == 2){
      // 마지막 탭
      direction = 'right';
    }

    _setX(moveX,direction);
  }

  function _touchStart(event){
    // 움직일 준비가 되었는가..
    // 각도가 범위안에 오면 움직이고 그렇지 않으면 움직이지 않는다...
    _firstTouchPoint = _basePageX = _getPage(event,'pageX');

    _isAngleOk = false;

    _wrapElements[0].addEventListener('touchmove',self,false);
    _wrapElements[0].addEventListener('touchend',self,false);
  }

  function _touchMove(event){

    var pageX = _getPage(event, 'pageX'),
      pageY = _getPage(event, 'pageY'),
      distX,
      moveX,
      viewWidth;


    if(_isAngleOk){
      distX = pageX - _basePageX; // 기존 스타트 x 지점부터 움직이는 x 지점을 뺀다...
      _totalDistX = pageX - _firstTouchPoint;
      if(distX == 0){
        _directionX = 0;
      }else if( distX < 0 ){
        _directionX = -1; // left
        // console.log('left ing');
      }
      else if( distX > 0 ){
        _directionX = 1; // right
        // console.log('right ing');
      }
      viewWidth = window.innerWidth * 0.65;
      moveX = ((distX / viewWidth * 100)/2);

      _touchMoveTab(+moveX.toFixed(1),_currentSelectedIndex); // x 축의 값을 셋팅한다...넓이 등등..

    }else{
      //각도가 충족이 되면..움직일 준비를 하라...
      if(true){
        _isAngleOk = true;
      }
    }

    _basePageX = pageX;

  }

  function _touchEnd(event){

    var newPoint;

    _wrapElements[0].removeEventListener('touchmove',self,false);
    _wrapElements[0].removeEventListener('touchend',self,false);

    if(_firstTouchPoint !== _basePageX){
      if(_directionX === 1){
        newPoint = _currentSelectedElement.prev().index();
      }else if(_directionX === -1){
        newPoint = _currentSelectedElement.next().index();
      }else if(_directionX === 0){
        newPoint = _currentSelectedElement.index();
      }
    }else{
      newPoint = _currentSelectedElement.index();
    }

    if( newPoint < 0 ){
      newPoint = _currentSelectedElement.index();
    }

    _moveToTab(newPoint);

  }

  function _clickMove(e){
    var targetDom = e.currentTarget;
    var point = $(targetDom).parents('.list_schedule').index();
    _moveToTab(point);
  }

  // 초기 셋팅
  _init();

  // public
  self.handleEvent = function(event){
    console.log(event.type);
    switch(event.type){
      case 'touchstart':
        _touchStart(event);
        break;
      case 'touchmove' :
        _touchMove(event);
        break;
      case 'touchend' :
        _touchEnd(event);
        break;
    }
  };

  self.moveToTab = _moveToTab;

  return self;
}