var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')

var index = require('./routes/index');
var todo = require('./routes/todos');

var app = express();

mongoose.connect('mongodb://yosua1011:9aibrlGqtcMfJz3H@todo-api-shard-00-00-trzeo.mongodb.net:27017,todo-api-shard-00-01-trzeo.mongodb.net:27017,todo-api-shard-00-02-trzeo.mongodb.net:27017/test?ssl=true&replicaSet=todo-api-shard-0&authSource=admin', (err) => {
  if (!err) {
    console.log('Database connected')
  } else {
    console.log('Error while connecting to database')
  }
})

// mongoose.connect('mongodb://localhost/todoyosua', (err) => {
//   if (!err) {
//     console.log('Database connected')
//   } else {
//     console.log('Error while connecting to database')
//   }
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', index);
app.use('/todo', todo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
