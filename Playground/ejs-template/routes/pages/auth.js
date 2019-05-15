var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render(
    'pages/auth',
    {
      title: 'Sign In',
      layout: 'layouts/auth',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});

module.exports = router;