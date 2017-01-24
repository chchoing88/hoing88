/**
 * Created by merlin.ho on 2017. 1. 24..
 */

var Calc = require('./calc3');

var calc = new Calc();

calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달');
