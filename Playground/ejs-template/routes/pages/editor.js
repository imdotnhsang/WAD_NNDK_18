var express = require('express');
var router = express.Router();

router.get('/blog-post', function (req, res, next) {
    res.render(
        'pages/editor',
        {
            title: 'Blog Post',
            layout: 'layouts/maincontent',
            srcScript: ''
        }
    );
});

router.get('/profile', function (req, res, next) {
    res.render(
        'pages/editor',
        {
            title: 'Profile',
            layout: 'layouts/profile',
            srcScript: '/javascripts/editor/profile.js'
        }
    );
});



module.exports = router;