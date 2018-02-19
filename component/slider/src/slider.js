import getStyle from './getStyle.js';
import setStyle from './setStyle.js';
import extend from './extend.js';

const DEF_OPTS = {
  selector : '.merlin_slider',
  speed : '350'
};

function setItemWidth(that){
  var wrapWidth = getStyle(that._selector,'width');
  var sliderItems = that._sliderWrap.querySelectorAll('.slider_item');
  setStyle(sliderItems,{
    width : wrapWidth+'px'
  })
}

function setTotalWidth(that){

  var length = getLength(that,'.slider_item');
  var width = getStyle(that.realSliderItems[0],'width') * length;
  setStyle(that._sliderWrap,{
    'width':width+'px'
  });
}


function getLength(that,selector){
  if(typeof selector === 'string'){
   return that._sliderWrap.querySelectorAll(selector).length;
  }

}

function setClone(that){

  var firstItem = that.realSliderItems[0].cloneNode(true);
  var lastItem = that.realSliderItems[that.length-1].cloneNode(true);

  that._sliderWrap.appendChild(firstItem);
  that._sliderWrap.insertBefore(lastItem,that.realSliderItems[0]);

  that._totalSliderItems = that._sliderWrap.querySelectorAll('.slider_item');
}


function initEnd(that){
  setStyle(that._selector,{
    visibility:'visible'
  })
}



function Slider(options){

  this._options = extend({},DEF_OPTS,options);
  this._selector = document.querySelector(this._options.selector);
  this._sliderWrap = this._selector.querySelector('.slider');
  this.realSliderItems = this._sliderWrap.querySelectorAll('.slider_item');
  this._totalSliderItems = this.realSliderItems;
  this.length = this.realSliderItems.length;
  this.currentIndex = 0;
  this._isMoving = false;

  this.init();

}

Slider.prototype = {

  init : function(){
    setClone(this);
    setItemWidth(this);
    setTotalWidth(this);

    this.setPositionAt(this.currentIndex);

    initEnd(this);

  },
  setPositionAt : function(index){
    var currentOffsetLeft = this.realSliderItems[index].offsetLeft;
    setStyle(this._sliderWrap,{
      transform : 'translate3d('+'-'+currentOffsetLeft +'px, 0px, 0px)'
    })
  },

  moveAt : function(index , callback){
    var that = this;
    setStyle(this._sliderWrap,{
      'transition-duration': that._options.speed + 'ms'
    });
    
    var nextOffsetLeft = this._totalSliderItems[index].offsetLeft;
    setStyle(this._sliderWrap,{
      transform : 'translate3d('+'-'+nextOffsetLeft +'px, 0px, 0px)'
    });

  // 트렌지션 엔드 이벤트가 있어요...
    setTimeout(function(){
      setStyle(that._sliderWrap,{
        'transition-duration':'0ms'
      });
      if(callback instanceof Function){
        callback();
      }
      that._isMoving = false;
    },that._options.speed)
    
  },

  moveNext : function(){
    // 3->1,,,2->0
    if(this._isMoving !== false){
      return;
    }

    this._isMoving = true;
    var that = this;
    if(this.currentIndex === (this.length-1) ){

      this.moveAt(this.length+1 , function(){
        var firstOffsetLeft = that.realSliderItems[0].offsetLeft;
        setStyle(that._sliderWrap,{
          transform : 'translate3d('+'-'+firstOffsetLeft +'px, 0px, 0px)'
        });
      });

      this.currentIndex = 0;
    }
    else{
      this.moveAt(this.currentIndex + 2);
      this.currentIndex += 1;
    }



  },
  movePrev : function(){
    if(this._isMoving !== false){
      return;
    }
    this._isMoving = true;
    var that = this;

    if(this.currentIndex === 0 ){

      this.moveAt(0 , function(){
        var lastOffsetLeft = that.realSliderItems[2].offsetLeft;
        setStyle(that._sliderWrap,{
          transform : 'translate3d('+'-'+lastOffsetLeft +'px, 0px, 0px)'
        });
      });

      this.currentIndex = 2;
    }
    else{
      this.moveAt(this.currentIndex);
      this.currentIndex -= 1;
    }

  },
  getSlideItem : function(){
    return this.length;
  }
};


export default Slider;