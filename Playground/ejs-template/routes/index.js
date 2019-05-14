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
// subscriber
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


router.get('/writer/unapproved-post', function (req, res, next) {
  res.render(
    'pages/writer',
    {
      title: 'Unapproved Post',
      layout: 'layouts/unapprovedpost',
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

//guest 
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

router.get('/subscriber/hashtag', function (req, res, next) {
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

router.get('/sign/signin', function (req, res, next) {
  res.render(
    'pages/sign',
    {
      title: 'Sign In',
      layout: 'layouts/signin',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});

router.get('/sign/signup', function (req, res, next) {
  res.render(
    'pages/sign',
    {
      title: 'Sign Up',
      layout: 'layouts/signup',
      srcScript: '/javascripts/guest-subscriber/script.js',
      hrefCss: '/stylesheets/guest-subscriber/login.css'
    }
  );
});


module.exports = router;