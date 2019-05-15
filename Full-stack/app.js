const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// mongoose
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(_ => console.log("Connected to MongoDB."))
    .catch(err => console.log("Connect to MongoDB with Error Message: ", err.errmsg));

// models
const modelsPath = path.join(__dirname, "./models");
const fs = require('fs');

fs.readdirSync(modelsPath).map(file => {
    require('./models/' + file);
});

// view engine setup
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
const views = require('./routes/views');
const api = require('./routes/api')

app.use('/', views);
app.use('/api', api);

// app.use(function (req, res, next) { // link not found
//     res.redirect('/home');
// });

module.exports = app;
