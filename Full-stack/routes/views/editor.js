var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');
const { getTagList } = require('../../utils');

router.get('/', (req, res) => {
    const account = req.user;
    if (account && account.userType === 'editor') {
        res.redirect('/editor/profile')
    } else {
        res.redirect('/auth/member-company')
    }
});

router.get('/view-post', async function (req, res) {
    const tagList = await getTagList();
    const account = req.user;

    const { id } = req.query;

    if (account && account.userType === 'editor') {
        Article
            .findOne({
                _id: id,
                process: 'draft',
                reasonDenied: null,
                // categoriesManagement
            })
            .populate('categories tags')
            .then(article => {
                console.log(article);

                let tagListValue = "";

                article.tags.forEach(tag => {
                    tagListValue += `${tag.title},`;
                })

                tagListValue = tagListValue.slice(0, -1);

                res.render(
                    'editor',
                    {
                        title: 'View Post',
                        layout: 'layouts/viewpost',
                        srcScript: '/javascripts/editor/viewpost.js',
                        tagList,
                        account,
                        article,
                        tagListValue
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/editor/profile');
            });

    } else {
        res.redirect('/editor/profile');
    }
});

router.get('/posts-approved', function (req, res, next) {
    const account = req.user;

    if (account && account.userType === 'editor') {
        Article
            .find({
                process: 'published',
                publishedAt: { $gt: Date.now() },
                editor: account._id
            })
            .populate('categories tags')
            .then(articleList => {
                res.render(
                    'editor',
                    {
                        title: 'Posts Approved',
                        layout: 'layouts/postsApproved',
                        srcScript: '',
                        account,
                        articleList
                    }
                );
            })
    } else {
        res.redirect('/editor');
    }
});

router.get('/posts-denied', function (req, res, next) {
    const account = req.user;

    if (account && account.userType === 'editor') {
        Article
            .find({
                process: 'draft',
                reasonDenied: { $ne: null },
                editor: account._id
            })
            .populate('categories tags')
            .then(articleList => {
                res.render(
                    'editor',
                    {
                        title: 'Posts Denied',
                        layout: 'layouts/postsDenied',
                        srcScript: '',
                        account,
                        articleList
                    }
                );
            })
    } else {
        res.redirect('/editor');
    }
});
router.get('/posts-published', function (req, res, next) {
    const account = req.user;
    if (account && account.userType === 'editor') {
        Article
            .find({
                process: 'published',
                publishedAt: { $lte: Date.now() },
                editor: account._id
            })
            .populate('categories tags')
            .then(articleList => {
                res.render(
                    'editor',
                    {
                        title: 'Posts Published',
                        layout: 'layouts/postsPublished',
                        srcScript: '',
                        account,
                        articleList
                    }
                );
            })
    } else {
        res.redirect('/editor');
    }
});

router.get('/posts-unapproved', function (req, res, next) {
    const account = req.user;
    if (account && account.userType === 'editor') {
        Article
            .find({
                process: 'draft',
                reasonDenied: null,
                // categoriesManagement
            })
            .populate('categories tags')
            .select('title abstract coverImage createdAt categories tags slug')
            .sort({ createdAt: 'desc' })
            .then(articleList => {
                res.render(
                    'editor',
                    {
                        title: 'Posts Unapproved',
                        layout: 'layouts/postsUnapproved',
                        srcScript: '',
                        account,
                        articleList
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/editor/profile');
            })

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