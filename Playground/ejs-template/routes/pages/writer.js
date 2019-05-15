var express = require('express');
var router = express.Router();

router.get('/add-new-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Add new post',
            layout: 'layouts/addnewpost',
            srcScript: '/javascripts/writer/addnewpost.js'
        }
    );
});

router.get('/approved-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Approved Post',
            layout: 'layouts/approvedpost',
            srcScript: ''
        }
    );
});

router.get('/denied-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Denied Post',
            layout: 'layouts/deniedpost',
            srcScript: ''
        }
    );
});
router.get('/published-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Published Post',
            layout: 'layouts/publishedpost',
            srcScript: ''
        }
    );
});

router.get('/unapproved-post', function (req, res, next) {
    res.render(
        'pages/writer',
        {
            title: 'Unapproved Post',
            layout: 'layouts/unapprovedpost',
        }
    );
});

module.exports = router;