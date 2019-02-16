var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql'); // MS Sql Server client


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bankRouter = require('./routes/bank');

var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
// Connection string parameters.
global.connection = mysql.createConnection({
  host: 'ec2-23-21-165-188.compute-1.amazonaws.com',
  user: 'mbfqfcdptylngh',
  password: 'cb8728d1f2c34c8cc1b0891f6b99757240c3ce5996b7821e6d8539498a2845fe',
  database: 'd2uv20f2cqaj1u'
})

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
    console.log("error");
  }
  else {
    console.log('Connected Succesfully.!');
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bank', bankRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
