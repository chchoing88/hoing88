"use strict";

(function(g) {
  g.Box = (function() {
    var defaultProps = {
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      color: "red",
      directionX: DIRECTION.RIGHT,
      directionY: DIRECTION.BOTTOM,
      speed: 10,
    };

    function Box(frame, props) {
      this._opts = Object.assign({}, defaultProps, props);
      this._frame = frame;
      this._dom = null;
      this._intervalId = 0;
    }

    Box.prototype = {
      _increaseX: function(){ return this._opts.left++ },
      _decreaseX: function(){ return this._opts.left-- },
      _increaseY: function(){ return this._opts.top++ },
      _decreaseY: function(){ return this._opts.top-- },
      move: function() {
        var self = this;
        var opts = self._opts;
        var crashFrameDirectionX = "";
        var crashFrameDirectionY = "";
        
        var left = (opts.directionX === DIRECTION.RIGHT)? this._increaseX.bind(self) :
                    this._decreaseX.bind(self);
        var top = (opts.directionY === DIRECTION.BOTTOM) ? this._increaseY.bind(self) : 
                    this._decreaseY.bind(self);

        this._intervalId = setInterval(function() {
          
          var leftValue = opts.left;
          var topValue = opts.top;

          crashFrameDirectionX = self._frame.checkX(leftValue, opts.width);
          crashFrameDirectionY = self._frame.checkY(topValue, opts.height);
          // console.log(crashFrameDirectionY);
          
          switch(crashFrameDirectionX){
            case DIRECTION.RIGHT : 
              left = self._decreaseX.bind(self);
              opts.directionX = DIRECTION.LEFT;
              break;
           
            case DIRECTION.LEFT :
              left = self._increaseX.bind(self);
              opts.directionX = DIRECTION.RIGHT;
              break;
            default :
              left = left;
              
          }

          switch(crashFrameDirectionY){
            case DIRECTION.TOP : 
              top = self._increaseY.bind(self);
              opts.directionY = DIRECTION.BOTTOM;
              break;
           
            case DIRECTION.BOTTOM :
              top = self._decreaseY.bind(self);
              opts.directionY = DIRECTION.TOP;
              break;
            
            default :
              top = top;
          }
          
          leftValue = left();
          topValue = top();
          self._dom.style.left = leftValue + "px";
          self._dom.style.top = topValue + "px";

        
        },opts.speed);
      },
      render: function() {
        var style = {
          left: this._opts.left + "px",
          top: this._opts.top + "px",
          width: this._opts.width + "px",
          height: this._opts.height + "px",
          backgroundColor: this._opts.color
        };
        this._dom = document.createElement("div");
        Object.assign(this._dom.style, style);
        this._dom.className = "box";
        console.log("a");

        this._frame.target.appendChild(this._dom);
      },
      delete: function() {
        this._dom.remove();
      },
      divide: function() {
        // width , height 를 반으로 나눈뒤.
        // 같은 걸 3개 인스턴스를 만든뒤.
        // 4개를 moveTo 해서 움직인다..
      },
      stop: function(){
        if(this._intervalId){
          clearInterval(this._intervalId)
        }
      },
      restart: function(){

        this.move();
      }
    };

    return Box;
  })();
})(window);