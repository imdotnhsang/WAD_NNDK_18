var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs')

const { getTagList } = require('../../utils');

router.get('/add-new-post', async function (req, res, next) {
    const tagList = await getTagList();

    res.render(
        'writer',
        {
            title: 'Add New Post',
            layout: 'layouts/addnewpost',
            srcScript: '/javascripts/writer/addNewPost.js',
            tagList
        }
    );
});

router.get('/posts-approved', function (req, res, next) {
    res.render(
        'writer',
        {
            title: 'Posts Approved',
            layout: 'layouts/postsApproved',
            srcScript: ''
        }
    );
});

router.get('/posts-denied', function (req, res, next) {
    res.render(
        'writer',
        {
            title: 'Posts Denied',
            layout: 'layouts/postsDenied',
            srcScript: ''
        }
    );
});
router.get('/posts-published', function (req, res, next) {
    res.render(
        'writer',
        {
            title: 'Posts Published',
            layout: 'layouts/postsPublished',
            srcScript: ''
        }
    );
});

router.get('/posts-unapproved', function (req, res, next) {
    res.render(
        'writer',
        {
            title: 'Posts Unapproved',
            layout: 'layouts/postsUnapproved',
            srcScript: ''
        }
    );
});

module.exports = router;