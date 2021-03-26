var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlQuery = require('./public/javascripts/SQL.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  res.append('Access-Control-Allow-Origin' ,'*');
  res.append('Access-Control-Allow-Content-Type' ,'*');
  res.append('Access-Control-Allow-Headers' ,'*');
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/api/getQuestions/",async (req,res) => {
  let pageIndex = req.query.pageIndex ? req.query.pageIndex : 0

  let getQuestions_str = `select * from questions limit ${[pageIndex * 10]},10`;
  let getQuestions_res = await sqlQuery(getQuestions_str)

  res.json(getQuestions_res)
})








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

module.exports = app;
