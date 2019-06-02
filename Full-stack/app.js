// buit-in nodejs
const path = require('path');

// 3rd packages
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const fetch = require('node-fetch');

const session = require('express-session');
const passport = require('passport');

// mongoose
const MONGO_URI = process.env.MONGO_URI || config.MONGO_URI;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB.");
        app.emit('mongoStarted');
    })
    .catch(err => console.log("Connect to MongoDB with Error Message: ", err.errmsg));

// models
const modelsPath = path.join(__dirname, "./models");
const fs = require('fs');

fs.readdirSync(modelsPath).map(file => {
    require('./models/' + file);
});

require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const NODE_ENV = process.env.NODE_ENV || config.NODE_ENV;
console.log('NODE_ENV', NODE_ENV);

if (NODE_ENV === 'dev') {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// locals
const getCategoryList = require('./utils/getCategoryList');
app.use((req, res, next) => {
    getCategoryList()
        .then(categoryList => {
            res.locals.categoryList = categoryList;
            next();
        })
});

// routes
const views = require('./routes/views');
const api = require('./routes/api');

//
var multer  =   require('multer');

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

app.use('/', views);
app.use('/api', api);

// app.use(function (req, res, next) { // link not found
//     res.redirect('/home');
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;