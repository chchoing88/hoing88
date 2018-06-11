"use strict";

(function (g) {
  g.Frame = function (elem) {
    var frame = {
      target: elem,
      left: 0,
      top: 0,
      right: elem.offsetWidth,
      bottom: elem.offsetHeight,
      checkX: function (left, width) {
        var right = left + width;

        if (this.right === right) {
          return DIRECTION.RIGHT;
        } else if (this.left === left) {
          return DIRECTION.LEFT;
        }

        return "";
      },
      checkY: function (top, height) {
        var bottom = top + height;
        if (this.top === top) {
          return DIRECTION.TOP;
        } else if (this.bottom === bottom) {
          return DIRECTION.BOTTOM;
        }

        return "";
      }
    };

    return frame;
  };
})(window);
