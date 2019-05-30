var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.user) {
        res.redirect('/administrator/profile')
    } else {
        res.render(
            'auth',
            {
                title: 'Administrator',
                layout: 'layouts/administrator',
                srcScript: '/javascripts/auth/administrator.js',
                hrefCss: '/stylesheets/guest-subscriber/auth.css'
            }
        )
    }
});

router.get('/profile', function (req, res, next) {
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

router.get('/news', function (req, res, next) {
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

router.get('/categories', function (req, res, next) {
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

router.get('/tags', function (req, res, next) {
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

router.get('/users', function (req, res, next) {
    const adminAccount = req.user;

    if (adminAccount && adminAccount.userType === 'administrator') {
        res.render(
            'administrator',
            {
                title: 'Users',
                layout: 'layouts/users',
                srcScript: '/javascripts/administrator/users.js',
                adminAccount
            }
        );
    } else {
        res.redirect('/administrator');
    }
});

router.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/administrator');
});

router.get('/:other', function (req, res, next) {
    res.redirect('/administrator');
});

module.exports = router;