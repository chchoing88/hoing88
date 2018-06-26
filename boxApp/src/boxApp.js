"use strict";

(function (g) {
  /**
   * An app that manages boxes
   * @param {object} opts related boxes options
   * @return {object} return boxApp singleTon
   * @see see detailed options param README.md
   */
  g.boxAppGenerator = function (opts) {
    var _ = g.util;
    var _boxes = [];
    var _Box = opts.Box || {};
    var _frame = opts.frame || {};
    var _isStop = true;
    var _divideCount = 0;
    var _MAX_DIVIDE = opts.maxDivide || 4;

    var boxApp = {
      _initProps: {},
      /**
       * Instruct the boxes to move. 
       */
      move: function () {
        if (_isStop) {
          _boxes.forEach(function (box) {
            box.move();

          });
          _isStop = false;
        }
      },
      /**
       * reset and init boxApp 
       * @param {object} box options
       */
      init: function (props) {
        var box = new Box(_frame, props);
        box.render();
        this._initProps = props;
        _boxes.push(box);
      },
      /**
       * Instruct the boxes to divied. 
       */
      divide: function () {
        if (_divideCount < _MAX_DIVIDE) {
          var divideBoxes = [];
          _boxes.forEach(function (box) {

            divideBoxes = _.concat(divideBoxes, box.divide());

          });
          _boxes = divideBoxes;

          _divideCount++;
        }

      },
      /**
       * Instruct the boxes to delete. 
       */
      delete: function () {

        _boxes.forEach(function (box) {
          box.delete();
          box = null;
        });

        _boxes = [];
        _divideCount = 0;
        _isStop = true;
        this.init(this._initProps);
      },
      /**
       * Instruct the boxes toggle restart , stop
       */
      toggle: function () {
        if (_isStop) {
          _boxes.forEach(function (box) {
            box.restart();
          })
          _isStop = false;
        } else {
          _boxes.forEach(function (box) {
            box.stop();
          })
          _isStop = true;
        }
      }
    };

    return boxApp;
  };
})(window);
