/**
 * Created by merlin.ho on 2017. 1. 24..
 */

var fs = require('fs');

// 파일을 동기식 IO로 읽어 들입니다.
// 이 코드가 실행되면 파일을 다 읽을 때까지 대기 합니다.
//var data = fs.readFileSync('../test.html','utf-8');

//console.log(data);


fs.readFile('../test.html','utf-8',function(err , data){
    console.log(data);
});

console.log('aaaa');

