import getData from './tools/get-data';

'use strict';

const DEF_OPTS = {
  selector : '.tab_flex',
  $context : '',
  tabName : 'main',
  responseEvent : '',
  fireEventType : 'tab'
};

function setFlexTabPosition(_$tabWraps , $item){
  let $moveWrap = _$tabWraps.find('.list_tab');

  if(_$tabWraps.hasClass('tab_flex') || _$tabWraps.hasClass('tab_barrow')) {
    let halfW = ($item.innerWidth()) / 2,
      parentHalfW = ($moveWrap.innerWidth()) / 2,
      posX = $item[0].offsetLeft,
      moveX = posX - parentHalfW + halfW;

    $moveWrap.scrollLeft(moveX);
  }
}



function setArrSubTabList(that){
  let tabList = [];

  that._$tabWraps.each((index , tabwrap) => {
    let dataTab1 = getData($(tabwrap),'data-tab1');
    tabList[dataTab1] = $(tabwrap);
  });
  return tabList;
}

function setCurrentSubTab(that,data){

  let $currentSubTab = that._$tabWraps;
  // show hide
  if(that._$tabWraps.length >= 1){
    that._subTabList.forEach(($subTab , index)=>{
      if(data.tabData1 === index){
        $subTab.removeClass('hide');
        $currentSubTab = $subTab;
      }else{
        $subTab.addClass('hide');
      }
    });
  }

  //this._$tabItems resetting ...
  that._$tabItems = $currentSubTab.find('li');
}




function setOn(that,index){

  let $activeItem = that._$tabItems.eq(index);
  $activeItem.addClass('on').siblings().removeClass('on');

  setFlexTabPosition(that._$tabWraps,$activeItem);
}

// read data of flipsnapItem and set tab data panel...
function setMainDataPanel(that, data){
  data.$flipsnapItems.each((index, item) => {
    let dataTab1 = getData($(item),'data-tab1');
    let $targetTabItem = that._$tabItems.eq(dataTab1);

    if( dataTab1 !== undefined && ($targetTabItem.attr('data-panel') === undefined)){
      $targetTabItem.attr('data-panel', index);
    }
  });
  that._isSetPanel = true;
}

function setSubDataPanel(that , data){

  data.$flipsnapItems.each((index, item) => {
    let dataTab1 = getData($(item),'data-tab1');
    let dataTab2 = getData($(item),'data-tab2');

    let $targetSubTabWrap = that._subTabList[dataTab1];

    if(dataTab1 !== '' && ($targetSubTabWrap !== undefined)){
      let $tabItems = $targetSubTabWrap.find('li');
      let $targetTabItem = $tabItems.eq(dataTab2);
      if( dataTab2 !== '' && ($targetTabItem.attr('data-panel') === undefined)){
        $targetTabItem.attr('data-panel', index);
      }
    }
  });

  that._isSetPanel = true;
}

function listenEvent(that){
  let eventType = that._options.responseEvent;
  if(that._tabName === 'main') {
    that._$context.on(eventType, function (e, data) {

      setOn(that,data.tabData1);

      if( !that._isSetPanel ){
        setMainDataPanel(that , data);
      }
    });
  }
  if(that._tabName === 'sub'){
    that._$context.on(eventType, function (e, data) {
      setCurrentSubTab(that,data);
      setOn(that,data.tabData2);

      if( !that._isSetPanel ){
        setSubDataPanel(that , data);
      }
    });
  }
}

function setEvent(that){
  let $link = that._$tabItems.find('a');

  $link.on('click',function(){
    let moveIndex = parseInt($(this).parent('li').attr('data-panel'),10);

    if(isNaN(moveIndex)){
      moveIndex = $(this).parent('li').index();

    }

    let eventType = that._options.fireEventType;
    that._$context.trigger(eventType,{index : moveIndex});
  });
}

class Tab {

  constructor(options) {

    this._options = $.extend({},DEF_OPTS,options);
    this._$context = this._options.$context;
    this._$tabWraps = this._$context.find(options.selector);
    this._tabName = options.tabName;
    this._$tabItems = this._$tabWraps.find('li');
    this._isSetPanel = false;
    listenEvent(this);
    setEvent(this);

    if(this._tabName === 'sub'){
      this._subTabList = setArrSubTabList(this);
    }
  }

}

export default Tab;






