var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
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

router.get('/detail', function (req, res, next) {
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

router.get('/category', function (req, res, next) {
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

router.get('/hashtag', function (req, res, next) {
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

router.get('/information', function (req, res, next) {
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

router.get('/search', function (req, res, next) {
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

module.exports = router;