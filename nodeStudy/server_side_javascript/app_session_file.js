/**
 * Created by merlin.ho on 2017. 4. 6..
 */
var express = require('express');
var session  = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret : '123asdf!@#$asdfzcv',
    resave : false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.get('/count',function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }

   res.send('count : '+req.session.count);
});

app.get('/auth/logout',function(req,res){
    delete req.session.displayName;
    res.redirect('/welcome');
});


app.get('/welcome',function(req,res){
    // 로그인성공했을때...
    if(req.session.displayName){
        res.send(`
            <h1>hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);

    } else{
        res.send(`
            <h1>welcome</h1>
            <a href="/auth/login">Login</a>
        `);
    }



});

// 비밀번호에서 좀 더 보안적으로 사용하는것
// 이 값과 사용자의 비밀번호를 더해서 md5하면 알아내기가 더 힘들다
// 소금을 친다.
// 사용자마다 다른 솔트를 구성하는 방법.
//var salt = '#$%^asdfzxcvasdf';

app.post('/auth/login',function(req,res){
    var users = [
        {
            username:'egoing',
            password:'Pw4/p88kbs/Q5IMylnwwIhX3jvlkiCZWEVz8N0zP3Xle5GfbH5VJCUbtml1FN6ZHkoiUNuYIUhLyqM/haPaESdjUNVWkE9KbXCPWIhU193Eip170kx9A1Aa6LjtIZt8Yp06zMoy5UR+kLkFPpRR8o4NosYk+qEh9G7wFXrvv+F0=',
            salt: '1zkG7UzvO42yydYwdbCVAgt/wZStLLu8Hcbw2+HWoEGCwOg58uGLNpJKZ2Ydo7Mu+x+N5F/T5x1pp4dJ2q6VdA==',
            displayName : 'Egoing'
            // 비밀번호 : 111
        }

    ];

    var uname = req.body.username;
    var pwd = req.body.password;

    for(var i=0; i<users.length; i++) {
        var user = users[i];
        if (uname === user.username) {
            // return 이 없다면 hasher로 전달해준 콜백함수는 나중에 실행되고 그 이후에 코드들이 먼저 실행이 될것이다. 비동기이기 때문에..
            // 나중에 hasher 의 콜백함수가 실행될것이다.. 그러면 원치 않은 다른 코드가 먼저 출력이 될수도있다.
            // 따라서 return을 적어주면
            // hasher가 실행될떄는 실행될 그 순간에는 이 함수(app.post의 콜백함수)가 끝내버리는게 좋다...그래서 해셔 앞에서 return을 붙여준다.
            // return을 만나면 그 뒤에 있는 코드는 실행하지 않는다...

           return hasher({password:pwd,salt:user.salt},function(err,pass,salt,hash){
                if(hash === user.password){
                    //인증된 사용자...

                } else{
                    // 인증되지 않은 사용자..
                }
            });
        }
    }

    // for(var i=0; i<users.length; i++){
    //     var user = users[i];
    //     if(uname === user.username && sha256(pwd+user.salt) === user.password){
    //         req.session.displayName = user.displayName;
    //         res.redirect('/welcome');
    //     }
    // }
});

app.get('/auth/login',function(req,res){
    var output = `
        <h1>login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output)
});

app.listen(3003,function(){
   console.log('connected 3003 port!!!');
});

