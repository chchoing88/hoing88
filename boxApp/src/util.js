"use strict";

(function (g) {
  g.util = {
    /**
     * shorter return querySelector value
     * @param {string} element selector string
     * @return {element} dom element
     */
    $: function (element) {
      return document.querySelector(element);
    },
    /**
    * check target is array type 
    * @param {any} target - some any type
    * @return {boolean} if target type is array, return value true
    */
    isArray: function (target) {
      return Object.prototype.toString.call(target) === "[object Array]";
    },
    /**
     * check target is Object type 
     * @param {any} target - some any type
     * @return {boolean} if target type is object, return value true
     */
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
    /**
     * Creates a new array concatenating array with any additional arrays and/or values.
     * @param {array | any} 
     * @return {array} return the new concatenated array
     * @see lodash concat function
     */
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
    /**
     * Object assing, object deep copy
     * @param {object | any} 
     * @return {object} return the new object
     * @see Object.assign polyfill
     */
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
