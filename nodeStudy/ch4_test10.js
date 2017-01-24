/**
 * Created by merlin.ho on 2017. 1. 24..
 */
//버퍼 객체를 키기만 지정하여 만든 후 문자열을 씁니다

var output = '안녕1 !!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output,'utf8');
console.log('첫번째 버퍼의 문자열 : %s',buffer1.toString());


var buffer2 = new Buffer('안녕2 !!','utf8');
console.log('두번째 버퍼의 문자열 : %s',buffer2.toString());


console.log('버퍼 객체의 타입 : %s',Buffer.isBuffer(buffer2));

var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8',0,byteLen);
var str2 = buffer2.toString('utf8');

buffer1.copy(buffer2,0,0,len);
console.log('두번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf8'));

var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf8'));