/**
 * Created by merlin.ho on 2017. 3. 21..
 */

var fs = require('fs');
console.log(1);
var data = fs.readFileSync("data.txt", {encoding:'utf8'});

console.log(data);

console.log(2);

fs.readFile("data.txt",{encoding:'utf8'},function(err,data){
    console.log(3);
    console.log(data);
});

console.log(4);