"use strict";

(function (g) {
  g.util = {
    $: function (element) {
      return document.querySelector(element);
    },
    isArray: function (target) {
      return Object.prototype.toString.call(target) === "[object Array]";
    },
    isObject: function (target) {
      var type = Object.prototype.toString.call(target);
      if (type === null || type === undefined) {
        throw new TypeError("this target type is" + type + " target should not null and undefined")
      }

      if (typeof target === "object") {
        return true;
      }

      return false;

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
      var args = Array.prototype.slice.call(arguments);
      var result = {};
      var i = 0;
      var length = args.length;
      if (this.isObject(args[0])) {
        result = args[0];
      }

      for (i = 1; i < length; i++) {
        for (var key in args[i]) {
          if (Object.prototype.hasOwnProperty.call(args[i], key)) {
            result[key] = args[i][key];
          }

        }
      }



      return result;

    }
  };
})(window);
