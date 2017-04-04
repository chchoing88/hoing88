/**
 * Created by merlin.ho on 2017. 3. 24..
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var OriendtDB = require('orientjs');


var server = OriendtDB({
    host : '0.0.0.0',
    port : 2424,
    username : 'root',
    password : 'root'
});

var db = server.use('o2');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','jade');
app.set('views','./views_orientdb');
app.locals.pretty = true;

app.get('/topic/add',function(req,res){
    var sql = 'select from topic';
    db.query(sql).then(function(topics){

        res.render('add',{topics:topics});
    });
});

app.post('/topic/add',function(req,res){
    var title = req.body.title;
    var desc = req.body.desc;
    var author = req.body.author;
    var sql = 'insert into topic (title,description,author) values (:title,:desc,:author)';
    db.query(sql,{
        params:{
            title:title,
            desc:desc,
            author:author
        }
    }).then(function(results){
        //res.send(results[0]['@rid']);
        res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']))
    });

});

app.get('/topic/:id/edit',function(req,res){
    var sql = 'select from topic';
    var id = req.params.id;
    db.query(sql).then(function(topics){
        var sql = 'select from topic where @rid=:rid';
        db.query(sql,{params:{rid:id}}).then(function(topic){

            res.render('edit',{topics:topics,topic:topic[0]});
        });
    });
});

app.post('/topic/:id/edit',function(req,res){
    var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid';
    var id = req.params.id;
    var title = req.body.title;
    var desc = req.body.desc;
    var author = req.body.author;
    db.query(sql,{
        params:{
            t:title,
            d:desc,
            a:author,
            rid:id
        }
    }).then(function(topics){

        res.redirect('/topic/'+encodeURIComponent(id));
    });
});

app.get('/topic/:id/delete',function(req,res){
    var sql = 'select from topic';
    var id = req.params.id;
    db.query(sql).then(function(topics){
        var sql = 'select from topic where @rid=:rid';
        db.query(sql,{params:{rid:id}}).then(function(topic){

            res.render('delete',{topics:topics,topic:topic[0]});
        });
    });
});

app.post('/topic/:id/delete',function(req,res){
    var sql = 'delete from topic WHERE @rid=:rid';
    var id = req.params.id;

    db.query(sql,{
        params:{
            rid:id
        }
    }).then(function(topics){

        res.redirect('/topic/');
    });
});



app.get(['/topic','/topic/:id'],function(req,res){
    var sql = 'select from topic';
    db.query(sql).then(function(topics){

        var id = req.params.id;
        if(id){
            var sql = 'select from topic where @rid=:rid';
            db.query(sql,{params:{rid:id}}).then(function(topic){

                res.render('view',{topics:topics,topic:topic[0]});
            });
        }else{
            res.render('view',{topics:topics});
        }


    });

});



app.listen(5000,function(){
   console.log('5000 port start');
});
