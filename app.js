var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var activityRouter = require('./routes/activity');
var userActivityRouter = require('./routes/user_activity');
var associationRouter = require('./routes/association');
var postRouter = require('./routes/post');
var commentRouter = require('./routes/comment');
var imagesRouter = require('./routes/images');

const apiResPonseMiddleware = require('./middleware/api-response');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 遍历各个模块的路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/activity', activityRouter);
app.use('/useractivity', userActivityRouter);
app.use('/association', associationRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/images', imagesRouter);

app.use(apiResPonseMiddleware);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('错误了哦~');
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
