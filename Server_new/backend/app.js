require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var splitter = require("sentence-splitter");
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api/project', indexRouter);
app.use('/api/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 27017;

var server = app.listen(port, () => console.log(`Express server has started on port ${port}`));

module.exports = app;

// splitter test
/*
var server = app.listen(3000, function(){
    console.log("[Server] Express server has started on port 3000");
    
    var simplePost="Her email is Jane.Doe@example.com... I sent her an email. How are you?";
    console.log(simplePost);
    let sentences = splitter.split(simplePost);
    
    console.log(sentences.length);
    for(var i=0; i<sentences.length; i++) {
        if(i%2 == 1) continue;
        console.log(sentences[i].raw);
    }
    
});
*/


