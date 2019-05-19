var express = require('express');
var router = express.Router();

router.get('/auth', function (req, res, next) {
  res.render(
    'auth',
    {
      title: 'Sign In',
      layout: 'layouts/auth',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});

router.get('/resetpassword', function (req, res, next) {
  res.render(
    'auth',
    {
      title: 'Reset Password',
      layout: 'layouts/resetpwd',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css',
      emailResetPwd:'1612556@gmail.com'
    }
  );
});
router.get('/forgottenpassword', function (req, res, next) {
  res.render(
    'auth',
    {
      title: 'Forgotten Password',
      layout: 'layouts/forgottenpwd',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css',
      emailResetPwd:'1612556@gmail.com'
    }
  );
});
router.get('/', function (req, res, next) {
  res.redirect('/auth');
});

module.exports = router;