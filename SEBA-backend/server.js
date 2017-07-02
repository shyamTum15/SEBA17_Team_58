var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
const flash = require('connect-flash');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var localStrategy = require('passport');
var cookieParser = require('cookie-parser');
var path = require('path');

var config = "mongodb://localhost:27017/events";
mongoose.connect(config)
    .connection
         .on('connected',function(){
         	console.log("successfully connected to "+config);
         })
         .on('error',function(){
         	console.log("database error "+err);
         })
var app = express();
var port = 3000;
app.get('/',function(req,res){
    res.send("Hello from Seba Team 58...");
});
var router = require('./routes');
var routerUser = require('./routesUser');

//middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

///express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// app.use(expressValidator());

// View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({defaultLayout:'layout'}));
// app.set('view engine', 'handlebars');

app.use('/api/events',router);
app.use('/api/users',routerUser);
app.use(cookieParser());


app.listen(port, function(){
	console.log("server is running on port "+ port);
})

///middleware for express session
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

///Connect Flash middleware
app.use(flash());

//Global Vars
app.use(function(req,res,next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
})