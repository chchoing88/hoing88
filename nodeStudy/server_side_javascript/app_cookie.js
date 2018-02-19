/**
 * Created by merlin.ho on 2017. 3. 31..
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('123124124123aszs2r12')); // 쿠키를 구울때 서버에서 브라우저로 쿠키를 구울때 .암호화를 해서 그 암호화된 정보를 굽는다. 그러면 브라우저는 암호화된 상태로 저장을 했다가 서버에 뤼퀘스트 할때 암호화 된 정보를 그대로 보내주면 우리는 그 키값을 이용해서 암호화된 정보를 해석해서 원래 값으로 다시 바꿀수 있다. 열쇠 암호를 풀수 있는 열쇠..

var products = {
    1:{title:'The history of web 1'},
    2:{title:'The next web'}
};

// req : 요청이 들어오는거
// res : 요청을 내보내는거
app.get('/count',function(req,res){
    if(req.signedCookies.count){
        var count = parseInt(req.signedCookies.count);
    } else {
        var count = 0;
    }
    count = count + 1;
    res.cookie('count',count,{signed:true}); // 쿠키를 구운다..
    res.send('count : '+count);
});

app.get('/products',function(req,res){
    var output = '';

    for(var name in products){
        output += `
            <li>
                <a href="/cart/${name}">${products[name].title}</a>
            </li>`;

    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

app.get('/cart/:id',function(req,res){
    var id = req.params.id;
    if(req.signedCookies.cart){
        var cart = req.signedCookies.cart;
    } else{
        var cart = {};
    }
    if(!cart[id]){
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id])+1;
    res.cookie('cart',cart,{signed:true});
    res.redirect('/cart');
});

app.get('/cart',function(req , res){
    var cart = req.signedCookies.cart;
    if(!cart){
        res.send('empty');
    } else{
        var output = '';
        for (var id in cart){
            output += `<li>${products[id].title} (${cart[id]})</li>`
        }
    }
    res.send(`<h1>Cart</h1><ul>${output}</ul><a href="/products">products List</a>`)
});

app.listen(3003,function(){
   console.log('3003 connect!!');
});


