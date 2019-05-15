var express = require('express');
var router = express.Router();

router.get('/profile', function (req, res, next) {
    res.render(
        'administrator',
        {
            title: 'Profile',
            layout: 'layouts/profile',
            srcScript: '/javascripts/administrator/profile.js'
        }
    );
});

router.get('/news', function (req, res, next) {
    res.render(
        'administrator',
        {
            title: 'News',
            layout: 'layouts/news',
            srcScript: '/javascripts/administrator/news.js'
        }
    );
});

router.get('/categories', function (req, res, next) {
    res.render(
        'administrator',
        {
            title: 'Categories',
            layout: 'layouts/categories',
            srcScript: '/javascripts/administrator/categories.js'
        }
    );
});

router.get('/tags', function (req, res, next) {
    res.render(
        'administrator',
        {
            title: 'Tags',
            layout: 'layouts/tags',
            srcScript: '/javascripts/administrator/tags.js'
        }
    );
});

router.get('/users', function (req, res, next) {
    res.render(
        'administrator',
        {
            title: 'Users',
            layout: 'layouts/users',
            srcScript: '/javascripts/administrator/users.js'
        }
    );
});

module.exports = router;