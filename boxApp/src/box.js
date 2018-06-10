"use strict";

(function(g) {
  g.Box = (function() {
    var defaultProps = {
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      color: "red",
      direction: DIRECTION.BOTTOM_RIGHT,
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
        var checkFrame = "";
        var left = this._increaseX.bind(self);
        var top = this._increaseY.bind(self);
        this._intervalId = setInterval(function() {
          
          switch(checkFrame){
            case DIRECTION.TOP : 
              top = self._increaseY.bind(self);
              break;
            case DIRECTION.RIGHT : 
              left = self._decreaseX.bind(self);
              break;
            case DIRECTION.BOTTOM :
              top = self._decreaseY.bind(self);
              break;
            case DIRECTION.LEFT :
              left = self._increaseX.bind(self);
              break;
            default :
              left = left;
              top = top;
          }
          
          var leftValue = left();
          var topValue = top();
          self._dom.style.left = leftValue + "px";
          self._dom.style.top = topValue + "px";

          checkFrame = self._frame.check(leftValue, topValue, self._opts.width, self._opts.height);
          console.log(checkFrame);

        },this._opts.speed);
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
