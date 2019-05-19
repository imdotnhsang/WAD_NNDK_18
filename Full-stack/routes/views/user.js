var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
    res.render(
        'user',
        {
            title: 'Home',
            layout: 'layouts/home',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '',
            isLogin: true,
            isPremium: true
        }
    );
});

router.get('/detail', function (req, res, next) {
    res.render(
        'user',
        {
            title: 'Detail',
            layout: 'layouts/detail',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/detail.css',
            isLogin: true,
            isPremium: true
        }
    );
});

router.get('/category', function (req, res, next) {
    res.render(
        'user',
        {
            title: 'Category',
            layout: 'layouts/category',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/category.css',
            isLogin: true,
            isPremium: true
        }
    );
});

router.get('/hashtag', function (req, res, next) {
    res.render(
        'user',
        {
            title: 'Hashtag',
            layout: 'layouts/hashtag',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/hashtag.css',
            isLogin: true,
            isPremium: true
        }
    );
});

router.get('/information', function (req, res, next) {
    res.render(
        'user',
        {
            title: 'Information',
            layout: 'layouts/information',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/information.css',
            isLogin: true,
            isPremium: true
        }
    );
});

router.get('/search', function (req, res, next) {
    res.render(
        'user',
        {
            title: 'Search',
            layout: 'layouts/search',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/search.css',
            isLogin: true,
            isPremium: true
        }
    );
});

router.get('/', function(req, res, next) {
    res.redirect('/home');
});

module.exports = router;