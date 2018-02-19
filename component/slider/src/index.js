import Slider from './slider.js';
import './css/slider.css';

if(module.hot){
  module.hot.accept()
}


var merlin_slider = new Slider({
  selector : '.merlin_slider'
});
//
// clickPrev :  // '.btn_prev' //function(){console.log('asdf');}
// clickNext :


// 요 두개는 내장..
document.querySelector('.btn_prev').addEventListener('click',function(e){
  console.log('이전');
  merlin_slider.movePrev();
},false);


document.querySelector('.btn_next').addEventListener('click',function(e){
  console.log('다음');
  merlin_slider.moveNext();
},false);