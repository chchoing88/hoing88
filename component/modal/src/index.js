import A from './modal';
import './css/modal.css';
import './scss/test1.scss';

if(module.hot){
  module.hot.accept()
}

// if (module.hot) {
//   var hotEmitter = require("webpack/hot/emitter");
//   hotEmitter.on("webpackHotUpdate", function(currentHash) {
//     document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
//       const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
//       link.href = nextStyleHref
//     })
//   })
// }

// if (module.hot) {
//   const hotEmitter = require("webpack/hot/emitter");
//   const DEAD_CSS_TIMEOUT = 2000;
//
//   hotEmitter.on("webpackHotUpdate", function(currentHash) {
//     document.querySelectorAll("link[href][rel=stylesheet]").forEach((link) => {
//       const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
//       const newLink = link.cloneNode();
//       newLink.href = nextStyleHref;
//
//       link.parentNode.appendChild(newLink);
//       setTimeout(() => {
//         link.parentNode.removeChild(link);
//       }, DEAD_CSS_TIMEOUT);
//     });
//   })
// }


// 커스텀 modal setting 시작
var merlinModalSetting = {
  template : '<div class="merlin_modal2 modal_dimmed"><div class="inner_smodal" draggable="true">멀린의 중첩모달 입니다. <a href="javascript:;" class="btn_close">닫기</a></div></div>',
  modalSelector : '.merlin_modal2',
  // closeBtnSelector : '.btn_close2',
  contentsSelector : '.inner_smodal',
  tools : {
    show : showFromTop,
    remove : removeToTop
  }
};

function showFromTop(selector){
  var elem = A.tools.show(selector);

  setTimeout(function(){
    elem.classList.add('top_to_bottom');
  },500);


}

function removeToTop(selector){
  var element = selector;
  if(typeof selector === 'string'){
    element = document.querySelector(selector);
  }
  element.classList.remove('top_to_bottom');
  setTimeout(function(){
    var parent = element.parentElement;
    parent.removeChild(element);
  },500);
}

// 커스텀 modal setting 종료

//// 범위를 줄여서 버튼을 찾자~
function secondModal(){
  var secondBtn = document.querySelector('.btn_addModal');
  secondBtn.addEventListener('click',function(){
    var merlinModal2 = A('.merlin_modal1').modal(merlinModalSetting);
    merlinModal2.show();
  });
}

/////////////
var btn = document.querySelector('#modalBtn');

btn.addEventListener('click',function(){

  var merlinModal = A('#modalWrap').modal();

  merlinModal.show(secondModal);
});


/*
function startModal(modalInfo){


  var btnaa = document.querySelector(btn);

  btnaa.addEventListener('click',function(){

    var merlinModal = A(wrap).modal();

    merlinModal.show(startModal());
  });
}

var modalSet = {
  wrap :['.#modalWrap','.merlin_modal1'],
  btn : ['#modalBtn','.btn_addModal'],
  setting : [undefined,merlinModalSetting]
};



startModal(modalSet);*/
