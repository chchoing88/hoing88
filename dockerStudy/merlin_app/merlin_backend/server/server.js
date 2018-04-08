'use strict';

const express = require('express');
const mongoose            = require( 'mongoose' );
const database            = mongoose.connection;

// 상수
const PORT = 3000;
const HOST = '0.0.0.0';

// 앱
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

//데이터베이스 설정
database.on( 'error', console.error );
database.once( 'open', () => {console.log( 'Connected to mongo server' );} );
mongoose.connect( "mongodb://mongo-db:27017/test" );

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);