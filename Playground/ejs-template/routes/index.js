var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// ADMINISTRATOR

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

router.get('/writer/add-new-post', function (req, res, next) {
  res.render(
    'pages/writer',
    {
      title: 'Add new post',
      layout: 'layouts/addnewpost',
      srcScript: '/javascripts/writer/addnewpost.js'
    }
  );
});

// SUBSCRIBER
router.get('/subscriber/home', function (req, res, next) {
  res.render(
    'pages/subscriber',
    {
      title: 'Home',
      layout: 'layouts/home',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: ''

    }
  );
});

router.get('/subscriber/detail', function (req, res, next) {
  res.render(
    'pages/subscriber',
    {
      title: 'Detail',
      layout: 'layouts/detail',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/detail.css'
    }
  );
});

router.get('/subscriber/category', function (req, res, next) {
  res.render(
    'pages/subscriber',
    {
      title: 'Category',
      layout: 'layouts/category',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/category.css'

    }
  );
});

router.get('/subscriber/hashtag', function (req, res, next) {
  res.render(
    'pages/subscriber',
    {
      title: 'Hashtag',
      layout: 'layouts/hashtag',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/hashtag.css'

    }
  );
});

router.get('/subscriber/information', function (req, res, next) {
  res.render(
    'pages/subscriber',
    {
      title: 'Information',
      layout: 'layouts/information',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/information.css'

    }
  );
});

router.get('/subscriber/search', function (req, res, next) {
  res.render(
    'pages/subscriber',
    {
      title: 'Search',
      layout: 'layouts/search',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/search.css'
    }
  );
});

//GUEST
router.get('/guest/home', function (req, res, next) {
  res.render(
    'pages/guest',
    {
      title: 'Home',
      layout: 'layouts/home',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: ''
    }
  );
});

router.get('/guest/detail', function (req, res, next) {
  res.render(
    'pages/guest',
    {
      title: 'Detail',
      layout: 'layouts/detail',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/detail.css'
    }
  );
});

router.get('/guest/category', function (req, res, next) {
  res.render(
    'pages/guest',
    {
      title: 'Category',
      layout: 'layouts/category',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/category.css'
    }
  );
});

router.get('/guest/hashtag', function (req, res, next) {
  res.render(
    'pages/guest',
    {
      title: 'Hashtag',
      layout: 'layouts/hashtag',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/hashtag.css'
    }
  );
});

router.get('/guest/information', function (req, res, next) {
  res.render(
    'pages/guest',
    {
      title: 'Information',
      layout: 'layouts/information',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/information.css'
    }
  );
});

router.get('/guest/search', function (req, res, next) {
  res.render(
    'pages/guest',
    {
      title: 'Search',
      layout: 'layouts/search',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/search.css'
    }
  );
});

//USER
router.get('/user/home', function (req, res, next) {
  res.render(
    'pages/user',
    {
      title: 'Home',
      layout: 'layouts/home',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: ''
    }
  );
});

router.get('/user/detail', function (req, res, next) {
  res.render(
    'pages/user',
    {
      title: 'Detail',
      layout: 'layouts/detail',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/detail.css'
    }
  );
});

router.get('/user/category', function (req, res, next) {
  res.render(
    'pages/user',
    {
      title: 'Category',
      layout: 'layouts/category',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/category.css'
    }
  );
});

router.get('/user/hashtag', function (req, res, next) {
  res.render(
    'pages/user',
    {
      title: 'Hashtag',
      layout: 'layouts/hashtag',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/hashtag.css'
    }
  );
});

router.get('/user/information', function (req, res, next) {
  res.render(
    'pages/user',
    {
      title: 'Information',
      layout: 'layouts/information',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/information.css'
    }
  );
});

router.get('/user/search', function (req, res, next) {
  res.render(
    'pages/user',
    {
      title: 'Search',
      layout: 'layouts/search',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/search.css'
    }
  );
});

//AUTH
router.get('/auth', function (req, res, next) {
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

//WRITER
router.get('/writer/approved-post', function (req, res, next) {
  res.render(
    'pages/writer',
    {
      title: 'Approved Post',
      layout: 'layouts/approvedpost',
      srcScript: ''
    }
  );
});

router.get('/writer/denied-post', function (req, res, next) {
  res.render(
    'pages/writer',
    {
      title: 'Denied Post',
      layout: 'layouts/deniedpost',
      srcScript: ''
    }
  );
});
router.get('/writer/published-post', function (req, res, next) {
  res.render(
    'pages/writer',
    {
      title: 'Published Post',
      layout: 'layouts/publishedpost',
      srcScript: ''
    }
  );
});

router.get('/writer/unapproved-post', function (req, res, next) {
  res.render(
    'pages/writer',
    {
      title: 'Unapproved Post',
      layout: 'layouts/unapprovedpost',
    }
  );
});

module.exports = router;