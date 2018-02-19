import setHeight from './tools/set-height';
import getData from './tools/get-data';
import setFlipsnapAuto from './flipsnap-auto';

'use strict';
const DEF_OPTS = {
  selector : '.flipsnap',
  $context : '',
  fireEventType : 'flipsnap',
  responseEvents : ['default'],
  autoFlipsnap : false,
  autoInterval : 0
};


function setActive(that){
  let index = that._flipsnap.currentPoint;
  that.$currentItem = that.$flipsnapWrap.find('.flipsnap_item').removeClass('_active').eq(index).addClass('_active');
}


function setEvent(that){

  that._flipsnap.element.addEventListener('fspointmove', function() {
    setActive(that);
    setHeight(that);
    setFlipsnapData(that);

    let eventType = that._options.fireEventType;
    that._options.$context.trigger(eventType,that._flipsnapData);

  });
}


function factorySetEventHandler(that,eventName,callback){
  that._options.$context.on(eventName, callback);
}


function listenEvent(that){

  function clickTab(e,data){
    e.preventDefault();
    that._flipsnap.moveToPoint(data.index);
  }

  function clickPaging(e,data){
    e.preventDefault();
    that.$currentItem.find('.flipsnap_wrap').children().eq(data.currentPage - 1 ).removeClass('hide').siblings().addClass('hide');
  }

  that._options.responseEvents.forEach(function(event){

    switch (event){
      case 'clickTab' :
        factorySetEventHandler(that,event,clickTab);
        break;
      case 'extendNav' :
        factorySetEventHandler(that,event,clickPaging);
        break;
      default : break;
    }
  });


}

function judgmentPaging($currentItem){
  let length = $currentItem.find('.flipsnap_wrap').children().length;
  if(length > 1){
    return length;
  }

  return false;
}

function getCurrentPaging(that){
  let currentPage = 0;
  let isTotalPaging = !!that._flipsnapData.totalPaging;
  if(isTotalPaging){
    currentPage = that.$currentItem.find('.flipsnap_wrap').children().not('.hide').index();
    return currentPage;
  }

  return '';
}


function setFlipsnapData(that){

  let currentIndex = that._flipsnap.currentPoint;
  let $flipsnapItem = that.$flipsnapWrap.find('.flipsnap_item');
  let $currentItem = $flipsnapItem.eq(currentIndex);
  // 탭
  that._flipsnapData.tabData1 = getData($currentItem,'data-tab1');

  if(that._flipsnapData.tabData1 === ''){
    that._flipsnapData.tabData1 = that._flipsnap.currentPoint;
  }
  that._flipsnapData.tabData2 = getData($currentItem,'data-tab2');
  // 숫자 페이징
  that._flipsnapData.totalPaging = judgmentPaging(that.$currentItem);
  that._flipsnapData.currentPaging = getCurrentPaging(that);

  that._flipsnapData.currentPoint = that._flipsnap.currentPoint;

  that._flipsnapData.$flipsnapItems = that.$flipsnapItems; // if tab is using, this is use.

}

function autoFlicking(that){
  that._flipsnap.autoPlay(that._options.autoInterval , that._options.autoDuration);
}
function cancleAutoFlicking(that){
  that._flipsnap.cancleAutoPlay();
}


class FlipsnapCustom {

  constructor(options){
    var self = this;
    this._options = $.extend({},DEF_OPTS,options);
    this._$context = this._options.$context;
    this._selector = this._$context.selector + ' ' + this._options.selector;
    this._flipsnap = Flipsnap(this._selector , this._options.flipsnapOption);
    this.$flipsnapWrap = this._$context.find(this._options.selector);
    this.$flipsnapItems = this.$flipsnapWrap.find('.flipsnap_item');
    this.$currentItem = this.$flipsnapItems.eq(0);

    this._flipsnapData = {};


    setFlipsnapData(this);
    setActive(this);
    setEvent(this);
    listenEvent(this);

    let eventType = this._options.fireEventType;
    this._options.$context.trigger(eventType,this._flipsnapData);

    // auto play
    if(this._options.autoFlipsnap){
      setFlipsnapAuto();
      autoFlicking(this);

      this._flipsnap.element.addEventListener('fstouchmove', function(e) {
        cancleAutoFlicking(self);
      });
    }

  }


}


export default FlipsnapCustom;
