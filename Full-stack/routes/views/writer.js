var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs')

const { getTagList } = require('../../utils');

router.get('/', (req, res) => {
    const account = req.user;
    console.log(account);
    if (account && account.userType === 'writer') {
        res.redirect('/writer/add-new-post')
    } else {
        res.redirect('/auth/member-company')
    }
});

router.get('/add-new-post', async function (req, res, next) {
    const tagList = await getTagList();
    const writerAccount = req.user;
    if (writerAccount && writerAccount.userType === 'writer') {
        res.render(
            'writer',
            {
                title: 'Add New Post',
                layout: 'layouts/addnewpost',
                srcScript: '/javascripts/writer/addNewPost.js',
                tagList,
                writerAccount
            }
        );
    } else {
        res.redirect('/writer');
    }
});

router.get('/posts-approved', function (req, res, next) {
    const writerAccount = req.user;
    if (writerAccount && writerAccount.userType === 'writer') {
        res.render(
            'writer',
            {
                title: 'Posts Approved',
                layout: 'layouts/postsApproved',
                srcScript: '',
                writerAccount
            }
        );
    } else {
        res.redirect('/writer');
    }
});

router.get('/posts-denied', function (req, res, next) {
    const writerAccount = req.user;
    if (writerAccount && writerAccount.userType === 'writer') {
        res.render(
            'writer',
            {
                title: 'Posts Denied',
                layout: 'layouts/postsDenied',
                srcScript: '',
                writerAccount
            }
        );
    } else {
        res.redirect('/writer');
    }
});
router.get('/posts-published', function (req, res, next) {
    const writerAccount = req.user;
    if (writerAccount && writerAccount.userType === 'writer') {
        res.render(
            'writer',
            {
                title: 'Posts Published',
                layout: 'layouts/postsPublished',
                srcScript: '',
                writerAccount
            }
        );
    } else {
        res.redirect('/writer');
    }
});

router.get('/posts-unapproved', function (req, res, next) {
    const writerAccount = req.user;

    if (writerAccount && writerAccount.userType === 'writer') {
        res.render(
            'writer',
            {
                title: 'Posts Unapproved',
                layout: 'layouts/postsUnapproved',
                srcScript: '',
                writerAccount
               
            }
        );
    } else {
        res.redirect('/writer');
    }
});
router.get('/profile', function (req, res) {
    const writerAccount = req.user;

    if (writerAccount && writerAccount.userType === 'writer') {
        res.render(
            'writer',
            {
                title: 'Profile',
                layout: 'layouts/profile',
                srcScript: '/javascripts/writer/profile.js',
                writerAccount
            }
        );
    } else {
        res.redirect('/writer');
    }
});
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/auth/member-company');
});

router.get('/:other', function (req, res) {
    res.redirect('/writer');
});

module.exports = router;