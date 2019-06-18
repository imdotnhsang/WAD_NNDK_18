var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Article = mongoose.model('Article');

router.get('/', (req, res) => {
    const account = req.user;

    if (account && account.userType === 'administrator') {
        res.redirect('/administrator/profile')
    } else {
        res.redirect('/auth/member-company')

    }
});

router.get('/profile', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        res.render(
            'administrator',
            {
                title: 'Profile',
                layout: 'layouts/profile',
                srcScript: '/javascripts/administrator/profile.js',
                adminAccount
            }
        );
    } else {
        res.redirect('/administrator');
    }
});

router.get('/news', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        res.render(
            'administrator',
            {
                title: 'News',
                layout: 'layouts/news',
                srcScript: '/javascripts/administrator/news.js',
                adminAccount
            }
        );
    } else {
        res.redirect('/administrator');
    }
});

router.get('/posts-approved', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        Article
            .find({
                process: 'published',
                publishedAt: { $gt: Date.now() },
                // administrator: adminAccount._id
            })
            .then(articleList => {
                res.render(
                    'administrator',
                    {
                        title: 'Posts Approved',
                        layout: 'layouts/postsApproved',
                        srcScript: '',
                        adminAccount,
                        articleList
                    }
                );
            })
    } else {
        res.redirect('/administrator/profile');
    }
});

router.get('/posts-published', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        Article
            .find({
                process: 'published',
                publishedAt: { $lte: Date.now() }
            })
            .populate('categories')
            .then(articleList => {
                res.render(
                    'administrator',
                    {
                        title: 'Posts Published',
                        layout: 'layouts/postsPublished',
                        srcScript: '',
                        adminAccount,
                        articleList
                    }
                );
            })
    } else {
        res.redirect('/administrator/profile');
    }
});

router.get('/posts-unapproved', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        Article
            .find({
                process: 'draft',
                reasonDenied: null
            })
            .then(articleList => {
                res.render(
                    'administrator',
                    {
                        title: 'Posts Unapproved',
                        layout: 'layouts/postsUnapproved',
                        srcScript: '',
                        adminAccount,
                        articleList
                    }
                );
            })
    } else {
        res.redirect('/administrator/profile');
    }
});

router.get('/categories', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        res.render(
            'administrator',
            {
                title: 'Categories',
                layout: 'layouts/categories',
                srcScript: '/javascripts/administrator/categories.js',
                adminAccount
            }
        );
    } else {
        res.redirect('/administrator');
    }
});

router.get('/tags', function (req, res) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        res.render(
            'administrator',
            {
                title: 'Tags',
                layout: 'layouts/tags',
                srcScript: '/javascripts/administrator/tags.js',
                adminAccount
            }
        );
    } else {
        res.redirect('/administrator');
    }
});

router.get('/users', function (req, res) {
    const adminAccount = req.user;
    const { right } = req.query;

    if (adminAccount && adminAccount.userType === 'administrator') {
        const userListCondition = { isActive: true, confirmed: true };
        let selectFields = '';

        switch (right) {
            case "subscriber":
                userListCondition.userType = "subscriber";
                selectFields = 'username fullname email userType expiredAt gender birthday';

                break;
            case "writer":
                userListCondition.userType = "writer";
                selectFields = 'username fullname email userType pseudonym expiredAt gender birthday';
                break;
            case "editor":
                userListCondition.userType = "editor";
                selectFields = 'username fullname categoriesManagement email userType expiredAt gender birthday';

                break;
            default:
                return res.redirect('/administrator/users?right=subscriber');
        }

        User
            .find(userListCondition)
            .select(selectFields)
            .then(userList => {
                console.log(userList);

                res.render(
                    'administrator',
                    {
                        title: 'Users',
                        layout: 'layouts/users',
                        srcScript: '/javascripts/administrator/users.js',
                        adminAccount,
                        userList
                    }
                );
            })
    } else {
        res.redirect('/administrator');
    }
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/auth/member-company');
});

router.get('/:other', function (req, res) {
    res.redirect('/administrator');
});

module.exports = router;