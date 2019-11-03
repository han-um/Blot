require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var session = require('express-session'); // 세션설정
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// ==================================================================
// router for 첨부파일
var attachedFilesRouter = require('./routes/attachedFilesRouter');
// ==================================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
//app.use(bodyParser.urlencoded({ extended: true}));
//app.use(bodyParser.json());

app.use('/api/project', indexRouter);
app.use('/api/user', usersRouter);
// ==================================================================
// 외부에서 첨부파일이 저장된 디렉토리에 접근하기 위한 라우터 path 설정
app.use('/api/files/attachedFiles', express.static('uploads'));

// 첨부파일 수신 시, 처리할 router 경로
app.use('/api/files', attachedFilesRouter);
// ===================================================================



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

var port = process.env.PORT || 3000;
var server = app.listen(port, () => console.log(`Express server has started on port ${port}`));

module.exports = app;