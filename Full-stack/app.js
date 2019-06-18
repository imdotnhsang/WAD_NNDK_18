// buit-in nodejs
const path = require('path');

// 3rd packages
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const passport = require('passport');

require('./configs/models');
require('./configs/mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV', NODE_ENV);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
}));

// passport
require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session());

// // locals
const { getCategoryList } = require('./utils');
app.use((req, res, next) => {
    getCategoryList()
        .then(categoryList => {
            res.locals.categoryList = categoryList;
            // console.log(categoryList);
            
            next();
        })
});

// routes
const views = require('./routes/views');
const api = require('./routes/api');
const actions = require('./routes/actions');

app.use('/', views);
app.use('/actions', actions);
app.use('/api', api);

module.exports = app;