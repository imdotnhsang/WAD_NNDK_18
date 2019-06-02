var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


const { MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(_ => console.log("Connected to MongoDB."))
    .catch(err =>
        console.log("Connect to MongoDB with Error Message: ", err.errmsg)
    );

// var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routes
const pages = require('./routes/pages');
app.use('/', pages);

//
var multer  =   require('multer');
var path = require('path')
var crypto = require('crypto');

const destAvatar = path.join(__dirname, 'public/images/writer/');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, destAvatar);
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage });

app.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
  res.redirect('back')
});

// 
const api = require('./routes/api')
app.use('/api', api);

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
