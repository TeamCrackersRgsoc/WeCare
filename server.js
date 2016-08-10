var express = require('express');
var app = express();
var ejs = require('ejs');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect("mongodb://localhost/wecareAuth");
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser()); 
app.use(flash());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret : 'wecarengoauthproject', cookie : { maxAge : 86400000}}));
app.use(passport.initialize())
app.use(passport.session());
require('./config/passport')(passport);


require('./app/routes.js')(app, passport);

app.listen(3000, function () {
	console.log("running on port 3000");
})