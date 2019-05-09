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

router.get('/administrator/news', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'News',
      layout: 'layouts/news',
      srcScript: '/javascripts/news.js'
    }
  );
});

router.get('/administrator/categories', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'Categories',
      layout: 'layouts/categories',
      srcScript: '/javascripts/categories.js'
    }
  );
});

module.exports = router;