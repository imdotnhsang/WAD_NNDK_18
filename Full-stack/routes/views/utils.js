var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render(
    'utils',
    {
      title: 'Loading...',
      layout: 'layouts/utils',
      srcScript: '/javascripts/guest-subscriber/utils.js',
      hrefCss: '/stylesheets/guest-subscriber/utils.css'
    }
  );
});

module.exports = router;