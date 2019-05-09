var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/administrator/profile', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'Profile',
      layout: 'layouts/profile',
      srcScript: '/javascripts/profile.js'
    }
  );
});

module.exports = router;