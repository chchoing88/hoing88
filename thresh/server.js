//import express from 'express';

const express = require('express');
const app = express();
const port = 3000;
const router = require('./router')(app);
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
//바디 파서라는 것은 실제로 클라이언트에서 서버에게 요청을 줄때 바디 내용을 읽어줄수 있게 하는거..
// 서버에서 라우터를 뷰를 전달해줄때 핸들바
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine('.hbs',exphbs({
  defaultLayout:'main',
  extname : '.hbs',
  layoutsDir:__dirname + '/views/layouts/',
  partialsDir:__dirname+ '/views/partials/'
}));
app.set('view engine','.hbs');
app.use(express.static(path.join(__dirname,'public')));

const server = app.listen(3000,()=>{
  console.log('server start!!!' + port);
});

