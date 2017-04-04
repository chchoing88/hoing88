/**
 * Created by merlin.ho on 2017. 3. 29..
 */

var OriendtDB = require('orientjs');

var server = OriendtDB({
    host : '0.0.0.0',
    port : 2424,
    username : 'root',
    password : 'root'
});

var db = server.use('o2');

/*var rec = db.record.get('#34:0')
    .then(
        function(record){
            console.log('Loaded Record:', record);
        }
    );*/

/*
 * CREATE
 * READ
 * UPDATE
 * DELETE
 *
 * CRUD
 */

// CREATE
/*var sql = 'select from topic';
db.query(sql).then(function(results){
    console.log(results);
});*/

/*var sql = 'select from topic where @rid=:id';
var param = {
    params:{
        id:'#34:0'
    }
};
db.query(sql,param).then(function(results){
    console.log(results);
});*/
/*
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
var param = {
    params:{
        title:'express',
        desc:'express is framework for web'
    }
};

db.query(sql,param).then(function(results){
    console.log(results);
});*/


/*
var sql = 'update topic set title=:title where @rid=:rid';
db.query(sql,{params:{title:'ExpressJs',rid:'#34:0'}}).then(function(results){
    console.log(results);
});*/


/* var sql = 'delete from topic where @rid=:rid';
 db.query(sql,{params:{rid:'#36:0'}}).then(function(results){
 console.log(results);
 });*/
