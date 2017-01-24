/**
 * Created by merlin.ho on 2017. 1. 24..
 */

process.on('tick',function(){
   console.log('exit 이벤트 발생');
});


setTimeout(function(){
    console.log('2초 후에 시스템 종료 시도함.');

    process.emit('tick');
},2000);

