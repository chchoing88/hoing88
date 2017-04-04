/**
 * Created by merlin.ho on 2017. 3. 21..
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.locals.pretty = true;
app.set('view engine','jade');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.get('/',function(req,res){
    res.send('hello home page');
});
app.get('/template',function(req,res){
    res.render('index', {time:Date(),_title:'jade'});
});
app.get('/danamic',function(req,res){
    var lis = '';
    for ( var i = 0; i<5; i++){
        lis += '<li>coding</li>'
    }
    var output =
        `<!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>헬로 스태틱</title>
        </head>
        <body>
            헬로 다이나믹!!!
            
            <ul>
                ${lis}
            </ul>
        </body>
        </html>`;
    res.send(output);

});

app.get('/topic/:id',function(req,res){
    var topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ....'
    ];
    var output = `
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br>
    
    ${topics[req.params.id]}
`;
    res.send(output);
});
app.get('/topic/:id/:mode',function(req,res){
    res.send(req.params.id +','+req.params.mode)
});
app.get('/login',function(req,res){
    res.send('login please');
});

app.get('/form',function(req,res){
    res.render('form');
});
app.get('/form_receiver',function(req,res){
    var title = req.query.title;
    var desc = req.query.desc;
    res.send(title+','+desc);
});
app.post('/form_receiver',function(req,res){
    var title = req.body.title;
    var desc = req.body.desc;
    res.send(title + ',' + desc);
});
app.listen(4000,function(){
    console.log('Connect 4000 port!')
});
