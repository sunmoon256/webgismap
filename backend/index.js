var express = require('express');
var app = express();
var home = require('./router/home');
var user = require('./router/user');

app.use('/', home);

app.use('/user', user);

app.listen(3001);
