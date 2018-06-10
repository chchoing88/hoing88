"use strict";

(function(g) {
  g.Frame = function(elem) {
    var frame = {
      target: elem,
      left: 0,
      top: 0,
      right: 500,
      bottom: 400,
      check: function(left, top, width, height){
        var bottom = top + height;
        var right = left + width; 

        if( this.top === top ){
          return DIRECTION.TOP;
        }else if( this.right === right){
          return DIRECTION.RIGHT;
        }else if( this.bottom === bottom ){
          return DIRECTION.BOTTOM;
        }else if( this.left === left ){
          return DIRECTION.LEFT;
        }
        
        return "";
      }
    };

    return frame;
  };
})(window);
