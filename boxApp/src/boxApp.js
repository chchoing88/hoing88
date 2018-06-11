"use strict";

(function (g) {
  g.boxAppGenerator = function (Box, frame) {

    var _boxes = [];
    var _Box = Box;
    var _frame = frame;
    var _isStop = false;

    var boxApp = {
      _initProps: {},
      move: function () {
        _boxes.forEach(function (box) {
          box.move();
          console.log("박스가 움직입니다.");
        });
      },
      init: function (props) {
        var box = new Box(_frame, props);
        box.render();
        this._initProps = props;
        _boxes.push(box);
      },
      divide: function () {
        console.log("박스가 분리합니다.");
        var diviedBoxes = [];
        _boxes.forEach(function (box) {

          diviedBoxes = g.util.concat(diviedBoxes, box.divide());

        });
        _boxes = diviedBoxes;
        console.log(_boxes);
      },
      delete: function () {

        _boxes.forEach(function (box) {
          box.delete();
          box = null;
        });

        _boxes = [];
        this.init(this._initProps);
      },
      toggle: function () {
        if (!_isStop) {
          _boxes.forEach(function (box) {
            box.stop();
          })
          _isStop = true;
        } else {
          _boxes.forEach(function (box) {
            box.restart();
          })
          _isStop = false;
        }
      }
    };

    return boxApp;
  };
})(window);
