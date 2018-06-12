"use strict";

(function (g) {
  g.boxAppGenerator = function (Box, frame) {
    var _ = g.util;
    var _boxes = [];
    var _Box = Box;
    var _frame = frame;
    var _isStop = true;
    var _diviedCount = 0;
    var _MAX_DIVIED = 4;

    var boxApp = {
      _initProps: {},
      move: function () {
        if (_isStop) {
          _boxes.forEach(function (box) {
            box.move();

          });
          _isStop = false;
        }
      },
      init: function (props) {
        var box = new Box(_frame, props);
        box.render();
        this._initProps = props;
        _boxes.push(box);
      },
      divide: function () {
        if (_diviedCount < _MAX_DIVIED) {
          var diviedBoxes = [];
          _boxes.forEach(function (box) {

            diviedBoxes = _.concat(diviedBoxes, box.divide());

          });
          _boxes = diviedBoxes;

          _diviedCount++;
        }

      },
      delete: function () {

        _boxes.forEach(function (box) {
          box.delete();
          box = null;
        });

        _boxes = [];
        _diviedCount = 0;
        _isStop = true;
        this.init(this._initProps);
      },
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
