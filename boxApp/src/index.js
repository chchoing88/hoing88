"use strict";

(function (_) {
  var btnStart = _.$("#btn_start");
  var frameElem = _.$("#box_frame");
  var btnToggle = _.$("#btn_toggle");
  var btnDelete = _.$("#btn_delete");
  var btnDivide = _.$("#btn_divide");

  var frame = Frame(frameElem);
  var boxApp = boxAppGenerator(Box, frame);

  boxApp.init();

  btnStart.addEventListener("click", function () {
    boxApp.move();
  });
  btnToggle.addEventListener("click", function () {
    boxApp.toggle();
  })
  btnDelete.addEventListener("click", function () {
    boxApp.delete();
  })
  btnDivide.addEventListener("click", function () {
    boxApp.divide();

  })

})(window.util);
