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
      srcScript: '/javascripts/administrator/profile.js'
    }
  );
});

router.get('/administrator/news', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'News',
      layout: 'layouts/news',
      srcScript: '/javascripts/administrator/news.js'
    }
  );
});

router.get('/administrator/categories', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'Categories',
      layout: 'layouts/categories',
      srcScript: '/javascripts/administrator/categories.js'
    }
  );
});

router.get('/administrator/tags', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'Tags',
      layout: 'layouts/tags',
      srcScript: '/javascripts/administrator/tags.js'
    }
  );
});

router.get('/administrator/users', function (req, res, next) {
  res.render(
    'pages/administrator',
    {
      title: 'Users',
      layout: 'layouts/users',
      srcScript: '/javascripts/administrator/users.js'
    }
  );
});

module.exports = router;