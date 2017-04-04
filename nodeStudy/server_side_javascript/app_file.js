/**
 * Created by merlin.ho on 2017. 3. 24..
 */

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine','jade');
app.set('views','./view_file');
app.locals.pretty = true;

app.get('/topic/new',function(req,res){
    fs.readdir('data',function(err ,files){
        if(err){
            console.log(err);
            res.status(500).send('internal server error');
        }
        res.render('new',{topics:files});
    });
});
app.get(['/topic','/topic/:id'],function(req,res){
    fs.readdir('data',function(err ,files){
        if(err){
            console.log(err);
            res.status(500).send('internal server error');
        }
        var id = req.params.id;
        if(id){
            // id값이 있을 때
            fs.readFile('data/'+id,'utf8',function(err ,data){
                if(err){
                    console.log(err);
                    res.status(500).send('internal server error');
                }
                res.render('view',{topics:files ,title:id, desc:data});
            });
        }else {
            //id 값이 없을때
            res.render('view',{topics:files,title:'welcome',desc:'desc'});
        }


    });
});

app.post('/topic',function(req,res){
    var title = req.body.title;
    var desc = req.body.desc;
    fs.writeFile('data/'+title,desc,function(err){
        if(err){
            res.status(500).send('internal server error');
        }
        res.redirect('/topic/'+title);
    });

});

app.listen(5000,function(){
   console.log('5000 port start');
});
