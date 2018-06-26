"use strict";
/**
 * Frame-Related Objects 
 * @param {element} elem - dom element object
 * @return {object} return the frame object
 * 
 */
(function (g) {
  g.Frame = function (elem) {
    var frame = {
      target: elem,
      left: 0,
      top: 0,
      right: elem.offsetWidth,
      bottom: elem.offsetHeight,
      /**
       * Whether x-axis is touched
       * @param {number} left - box's current left value
       * @param {number} width - box's current width value
       * @return {string} default empty string, touched direction string
       */
      checkX: function (left, width) {
        var right = left + width;

        if (this.right === right) {
          return DIRECTION.RIGHT;
        } else if (this.left === left) {
          return DIRECTION.LEFT;
        }

        return "";
      },
      /**
       * Whether y-axis is touched
       * @param {number} top - box's current top value
       * @param {number} height - box's current height value
       * @return {string} default empty string, touched direction string
       */
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
