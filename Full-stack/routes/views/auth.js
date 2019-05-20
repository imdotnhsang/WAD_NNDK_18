var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render(
    'auth',
    {
      title: 'Sign In',
      layout: 'layouts/auth',
      srcScript: '/javascripts/auth/index.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});

router.get('/forgotten-password', (req, res) => {
  res.render(
    'auth',
    {
      title: 'Forgotten Password',
      layout: 'layouts/forgottenPassword',
      srcScript: '/javascripts/auth/index.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});

// router.get('/', function (req, res, next) {
//   res.redirect('/auth');
// });

module.exports = router;