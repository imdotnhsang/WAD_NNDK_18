var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
    // const account = {
    //     email: 'hoangsang160898@gmail.com',
    //     fullname: "Nguyen Hoang Sang",
    //     userType: "subscriber",
    //     username: 'hoangsang160898',
    //     _id: "5ce2c8e719cb8c333e38dcd6"
    // }

    const account = req.user;
    
    res.render(
        'user',
        {
            title: 'Home',
            layout: 'layouts/home',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '',
            account
        }
    );
});

router.get('/detail', function (req, res, next) {
    // const account = {
    //     email: 'hoangsang160898@gmail.com',
    //     fullname: "Nguyen Hoang Sang",
    //     userType: "subscriber",
    //     username: 'hoangsang160898',
    //     _id: "5ce2c8e719cb8c333e38dcd6"
    // }
    const account = req.user;

    res.render(
        'user',
        {
            title: 'Detail',
            layout: 'layouts/detail',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/detail.css',
            account
        }
    );
});

router.get('/category', function (req, res, next) {
    // const account = {
    //     email: 'hoangsang160898@gmail.com',
    //     fullname: "Nguyen Hoang Sang",
    //     userType: "subscriber",
    //     username: 'hoangsang160898',
    //     _id: "5ce2c8e719cb8c333e38dcd6"
    // }

    const account = req.user;
    res.render(
        'user',
        {
            title: 'Category',
            layout: 'layouts/category',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/category.css',
            account
        }
    );
});

router.get('/hashtag', function (req, res, next) {
    // const account = {
    //     email: 'hoangsang160898@gmail.com',
    //     fullname: "Nguyen Hoang Sang",
    //     userType: "subscriber",
    //     username: 'hoangsang160898',
    //     _id: "5ce2c8e719cb8c333e38dcd6"
    // }
    const account = req.user;

    res.render(
        'user',
        {
            title: 'Hashtag',
            layout: 'layouts/hashtag',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/hashtag.css',
            account
        }
    );
});

router.get('/information', function (req, res, next) {
    // const account = {
    //     email: 'hoangsang160898@gmail.com',
    //     fullname: "Nguyen Hoang Sang",
    //     userType: "subscriber",
    //     username: 'hoangsang160898',
    //     _id: "5ce2c8e719cb8c333e38dcd6"
    // }

    const account = req.user;
    if (account) {
        res.render(
            'user',
            {
                title: 'Information',
                layout: 'layouts/information',
                srcScript: '/javascripts/guest-subscriber/script.js',
                hrefCss: '/stylesheets/guest-subscriber/information.css',
                account
            }
        );
    } else {
        res.redirect('/home');
    }
});

router.get('/search', function (req, res, next) {
    const account = {
        email: 'hoangsang160898@gmail.com',
        fullname: "Nguyen Hoang Sang",
        userType: "subscriber",
        username: 'hoangsang160898',
        _id: "5ce2c8e719cb8c333e38dcd6"
    }
    res.render(
        'user',
        {
            title: 'Search',
            layout: 'layouts/search',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/search.css',
            account
        }
    );
});

router.get('/', function (req, res, next) {
    res.redirect('/home');
});

module.exports = router;