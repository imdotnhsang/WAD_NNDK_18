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

router.get('/forgotpassword', function (req, res, next) {
  res.render(
    'auth',
    {
      title: 'Forgot Password',
      layout: 'layouts/forgotpwd',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});

router.get('/', function (req, res, next) {
  res.redirect('/auth');
});

module.exports = router;