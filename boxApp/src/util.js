"use strict";

(function (g) {
  g.util = {
    $: function (element) {
      return document.querySelector(element);
    },
    isArray: function (target) {
      return Object.prototype.toString.call(target) === '[object Array]';
    },
    concat: function () {
      var result = [];
      var args = Array.prototype.slice.call(arguments)

      while (args.length) {
        var item = args.shift();
        if (this.isArray(item)) {
          while (item.length) {
            result.push(item.shift());
          }
        } else {
          result.push(item);
        }
      }

      return result;
    },
    assign: function () {  // deep copy

    }
  };
})(window);
