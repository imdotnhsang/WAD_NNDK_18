var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');
const { getTagList } = require('../../utils');

router.get('/', (req, res) => {
    const account = req.user;
    // console.log(account);

    if (account && account.userType === 'editor') {
        res.redirect('/editor/profile')
    } else {
        res.redirect('/auth/member-company')
    }
});

router.get('/edit-post', async function (req, res, next) {
    const account = req.user;
    console.log(account);

    if (account && account.userType === 'editor') {
        Article.findOne()
            .then(article => {
                res.render(
                    'editor',
                    {
                        title: 'Edit Post',
                        layout: 'layouts/editpost',
                        srcScript: '/javascripts/editor/editpost.js',
                        account,
                        article
                    }
                );
            })



    } else {
        res.redirect('/editor');
    }
});

router.get('/posts-approved', function (req, res, next) {
    const account = req.user;

    if (account && account.userType === 'editor') {
        res.render(
            'editor',
            {
                title: 'Posts Approved',
                layout: 'layouts/postsApproved',
                srcScript: '',
                account
            }
        );
    } else {
        res.redirect('/editor');
    }
});

router.get('/posts-denied', function (req, res, next) {
    const account = req.user;

    if (account && account.userType === 'editor') {
        res.render(
            'editor',
            {
                title: 'Posts Denied',
                layout: 'layouts/postsDenied',
                srcScript: '',
                account
            }
        );
    } else {
        res.redirect('/editor');
    }

});
router.get('/posts-published', function (req, res, next) {
    const account = req.user;
    if (account && account.userType === 'editor') {
        res.render(
            'editor',
            {
                title: 'Posts Published',
                layout: 'layouts/postsPublished',
                srcScript: '',
                account
            }
        );
    } else {
        res.redirect('/editor');
    }
});

router.get('/posts-unapproved', function (req, res, next) {
    const account = req.user;
    if (account && account.userType === 'editor') {
        res.render(
            'editor',
            {
                title: 'Posts Unapproved',
                layout: 'layouts/postsUnapproved',
                srcScript: '',
                account
            }
        );
    } else {
        res.redirect('/editor');
    }
});

router.get('/profile', function (req, res) {
    const account = req.user;

    if (account && account.userType === 'editor') {
        res.render(
            'editor',
            {
                title: 'Profile',
                layout: 'layouts/profile',
                srcScript: '/javascripts/editor/profile.js',
                account
            }
        );
    } else {
        res.redirect('/editor');
    }
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/auth/member-company');
});

router.get('/:other', function (req, res) {
    res.redirect('/editor');
});
module.exports = router;