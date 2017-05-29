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


// php 만든 웹 페이지는 프로그래밍적으로 만들어서 동적,,java , 파이썬 , 루비건...(동적인 정보 )
// 사람이 한번 작성한것이 정적 ( 언제나 똑같이 보인다. )
// 정적인 파일은 내용을 수정하면 바로 반영할수 있다
// 동적으로 처리하면 우리가 작성했던 코드가 다시 실행되야 하기 때문에 노드 app을 껏다 켜야한다.
// 정적인건 요청이 들어올때마다 노드가 잡아서 던져주기 때문에 app을 껏다 키지 않아도 된다.
// 정적인건 못하는것들이 있다. 일일이 다 손으로 적어주어야 한다는점... ex) for문을 쓰지 못한다.
// 동적으로 만들어주면 개발언어를 쓸수 있다.. 정확히 원하는 만큼 반복이나 현재시간을 출력할수 있다..