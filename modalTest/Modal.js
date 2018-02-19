
////// UI들. 참고 jquery ui
A.ui= A.ui || {};

// 장인의 청사진..
A.ui.ModalMaster = function(){

  // 디폴트값...
  this.template = '<div class="merlin_modal1 modal_dimmed"><div class="inner_modal"><strong class="tit_merlin">안녕하세요 멀린 모달이예요 ~</strong><a href="javascript:;" class="btn_addModal">중첩 모달을 열어볼까요?</a><a href="javascript:;" class="btn_close">닫기</a></div></div>';
  this.modalSelector = '.merlin_modal1';
  this.contentsSelector = '.inner_modal';
  this.closeBtnSelector = '.btn_close';
  this.masterTools = {
    show : A.tools.show,
    remove : A.tools.remove
  };

};
// 장인의 공통점..
A.ui.ModalMaster.prototype = {

  _makeModalDom: function (target) {
    var strTemplate = target.modal.template;
    var wrappingElem = target.dom; //HTMLelement object
    var div = document.createElement('div');
    div.innerHTML = strTemplate;
    wrappingElem.appendChild(div.childNodes[0]);

  },
  _eventBinding: function (target) {
    var self = this;
    var modal = target.modal;
    var closeBtn = document.querySelector(modal.closeBtnSelector);
    var closedimmed = document.querySelector(modal.modalSelector);

    function remove(e) {
      if(e.target === this) {
        modal.tools.remove(modal.modalSelector);
        eventDel();
      }
    }
    function eventDel(){
      closeBtn.removeEventListener('click',remove,false);
      closedimmed.removeEventListener('click',remove,false);
    }

    closeBtn.addEventListener('click',remove,false);
    closedimmed.addEventListener('click',remove,false);

  },
  _setOption: function (target ,options) {


    target.modal = target.modal || {};
    options = options || {};
    target.modal = {
      template : (options.template)? options.template : this.template,
      modalSelector : (options.modalSelector)? options.modalSelector : this.modalSelector,
      closeBtnSelector : (options.closeBtnSelector)? options.closeBtnSelector : this.closeBtnSelector,
      contentsSelector : (options.contentsSelector)? options.contentsSelector : this.contentsSelector

    };
    options.tools = options.tools || {};
    target.modal.tools ={
      show : (options.tools.show)? options.tools.show : this.masterTools.show,
      remove : (options.tools.remove)? options.tools.remove : this.masterTools.remove
    }

  },

  _makeModal: function (target, options) {

    // 옵션 셋팅
    this._setOption(target ,options);
    // 모달을 만들고
    this._makeModalDom(target);

    // 이벤트를 붙여..
    this._eventBinding(target);

    return this;
  },
  _show: function(){
    this.modal.tools.show(this.modal.modalSelector);
  }

};

// 모달 장인 생성...
A.modalMaster = new A.ui.ModalMaster();

A.prototype.modal = function(options){
  var self = this;

  // 장인..모달을 만들어 주십쇼.
  var modalMaster = A.modalMaster._makeModal(this,options);

  this.show = function show(callback){
    modalMaster._show.apply(self);

    if(typeof callback === 'function'){
      var modal = document.querySelector(self.modal.modalSelector);
      callback(modal);
    }

  };
  return this;
};


////사용자...





// 개념..
// dom 마다 객체를 생성하니 그 녀석에게 modal의 기본 옵션을 심어주는 modal장인을 만들자.
// 기본 행위는 ... 똑같으니 dom객체에게 줄 필요는 없어보이는데...
// 옵션으로 줬을때는 그 아이만 따로 가지고 있었음 좋겠는데...

