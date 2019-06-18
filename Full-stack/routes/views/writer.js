const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const { getTagList } = require('../../utils');

router.get('/', (req, res) => {
    const account = req.user;
    console.log(account);
    if (account && account.userType === 'writer') {
        res.redirect('/writer/profile')
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
router.get('/edit-post', async function (req, res, next) {
    const tagList = await getTagList();
    const { id } = req.query;
    console.log(req.query);
    const writerAccount = req.user;

    if (writerAccount && writerAccount.userType === 'writer') {
        Article
            .findOne({
                _id: id,
                publishedAt: null,
                process: 'draft',
                reasonDenied: { $ne: null },
                writer: writerAccount._id
            })
            .populate('categories tags')
            .then(article => {
                console.log(article);

                let tagListValue = "";

                article.tags.forEach(tag => {
                    tagListValue += `${tag.title},`;
                })

                tagListValue = tagListValue.slice(0, -1);

                console.log(tagListValue);
                res.render(
                    'writer',
                    {
                        title: 'Edit Post',
                        layout: 'layouts/editpost',
                        srcScript: '/javascripts/writer/editPost.js',
                        tagList,
                        writerAccount,
                        article,
                        tagListValue
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/writer/profile');
            });
    } else {
        res.redirect('/writer/profile');
    }
});
router.get('/posts-approved', function (req, res, next) {
    const writerAccount = req.user;

    if (writerAccount && writerAccount.userType === 'writer') {
        Article
            .find({
                publishedAt: { $gt: Date.now() },
                process: 'published',
                reasonDenied: null,
                writer: writerAccount._id
            })
            .populate('categories tags')
            .select('title abstract coverImage createdAt categories tags slug')
            .sort({ createdAt: 'desc' })
            .then(articleList => {
                res.render(
                    'writer',
                    {
                        title: 'Posts Approved',
                        layout: 'layouts/postsApproved',
                        srcScript: '',
                        writerAccount,
                        articleList
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/writer/profile');
            })
    } else {
        res.redirect('/writer/profile');
    }
});

router.get('/posts-denied', function (req, res, next) {
    const writerAccount = req.user;
    if (writerAccount && writerAccount.userType === 'writer') {
        Article
            .find({
                publishedAt: null,
                process: 'draft',
                reasonDenied: { $ne: null },
                writer: writerAccount._id
            })
            .populate('categories tags')
            .select('title abstract coverImage createdAt categories tags slug reasonDenied')
            .sort({ createdAt: 'desc' })
            .then(articleList => {
                res.render(
                    'writer',
                    {
                        title: 'Posts Denied',
                        layout: 'layouts/postsDenied',
                        srcScript: '/javascripts/writer/postdenied.js',
                        writerAccount,
                        articleList
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/writer/profile');
            })
    } else {
        res.redirect('/writer/profile');
    }
});
router.get('/posts-published', function (req, res, next) {
    const writerAccount = req.user;

    if (writerAccount && writerAccount.userType === 'writer') {
        Article
            .find({
                publishedAt: { $lte: Date.now() },
                process: 'published',
                writer: writerAccount._id
            })
            .populate('categories tags')
            .select('title abstract coverImage publishedAt categories tags slug')
            .sort({ publishedAt: 'desc' })
            .then(articleList => {
                res.render(
                    'writer',
                    {
                        title: 'Posts Published',
                        layout: 'layouts/postsPublished',
                        srcScript: '',
                        writerAccount,
                        articleList
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/writer/profile');
            })
    } else {
        res.redirect('/writer/profile');
    }
});

router.get('/waiting-for-approval', function (req, res, next) {
    const writerAccount = req.user;

    if (writerAccount && writerAccount.userType === 'writer') {
        Article
            .find({
                publishedAt: null,
                process: 'draft',
                reasonDenied: null,
                writer: writerAccount._id
            })
            .populate('categories tags')
            .select('title abstract coverImage createdAt categories tags slug')
            .sort({ createdAt: 'desc' })
            .then(articleList => {
                res.render(
                    'writer',
                    {
                        title: 'Waiting For Approval',
                        layout: 'layouts/waitingApproval',
                        srcScript: '',
                        writerAccount,
                        articleList
                    }
                );
            })
            .catch(err => {
                console.log(err);
                res.redirect('/writer/profile');
            })
    } else {
        res.redirect('/writer/profile');
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