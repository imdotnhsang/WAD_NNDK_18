var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
    const account = req.user;
    
    res.render(
        'user',
        {
            title: 'Home',
            layout: 'layouts/home',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '',
            account,
            isDetailPage: false //kiểm tra phải là trang detail không, vì js có phần lấy acrticle Detail chỉ ở trang Detail mới có
        }
    );
});

router.get('/detail', function (req, res, next) {
    const account = req.user;

    const articleDetail = {
        title: 'Apple Pay is coming to New York City’s MTA transit system this summer',
        tags: ['Apple Pay', 'Apple 2019', 'New York'],
        comments: [{ username: 'leonguyen', content: 'The specital affects are amazing', createdAt: 1558802053334, avatar: '' },
        { username: 'ooahtaag', content: 'Given these phones are essentially the same specs as the brand spanking new Google Pixel 3a and 3a XL, you can save around $300 if you’re willing to take a calculated risk on a refurbished phone.', createdAt: 1558802053334, avatar: '' },
        { username: 'cognhcib', content: 'I can not believie it. What a beautiful thing!', createdAt: 1558802053334, avatar: '' },
        { username: 'vinhphat207', content: 'Oh my god! Are you kidding me? That is interstring the topic. I glad you like it.', createdAt: 1529773200000, avatar: '' },
        { username: 'hophong', content: 'It is the smartest, the best and It is very pretty.', createdAt: 1529773200000, avatar: '' }],
        publishDate: 1529773200000,
        content: "",
        abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)',
        isPremmium: true,
        categoryName: 'Apple',
        writerName: 'Sean Hollister',
        writerId: 'StarFire2258'
    };

    const fiveArticlesNextUp = {
        articleNextUp: [{ title: 'Apple’s Q2 earnings: iPhone sales continue to drop as services keep growing' },
        { title: 'The man who predicted Antennagate is no longer at Apple' },
        { title: 'Apple’s Aperture photo editing software will shutter for good after macOS Mojave' },
        { title: 'Apple explains why it’s cracking down on third-party screen time and parental control apps' },
        { title: 'Apple claims it isn’t scanning customers’ faces, after teen sues for $1 billion' }]
    };

    const sixArticlesMostRead = {
        articleMostRead: [{ title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1529773200000, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Samsung', publishDate: 1529773200000, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'SpaceX', publishDate: 1558802053334, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1529773200000, coverImage: '' }]
    };

    res.render(
        'user',
        {
            title: 'Detail',
            layout: 'layouts/detail',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/detail.css',
            account,
            articleDetail,
            fiveArticlesNextUp,
            sixArticlesMostRead,
            isDetailPage: true
        }
    );
});

router.get('/category', function (req, res, next) {
    const account = req.user;
    res.render(
        'user',
        {
            title: 'Category',
            layout: 'layouts/category',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/category.css',
            account,
            isDetailPage: false
        }
    );
});

router.get('/hashtag', function (req, res, next) {
    const account = req.user;

    res.render(
        'user',
        {
            title: 'Hashtag',
            layout: 'layouts/hashtag',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/hashtag.css',
            account,
            isDetailPage: false
        }
    );
});

router.get('/information', function (req, res, next) {
    const account = req.user;
    if (account) {
        res.render(
            'user',
            {
                title: 'Information',
                layout: 'layouts/information',
                srcScript: '/javascripts/guest-subscriber/script.js',
                hrefCss: '/stylesheets/guest-subscriber/information.css',
                account,
                isDetailPage: false
            }
        );
    } else {
        res.redirect('/home');
    }
});

router.get('/search', function (req, res, next) {
    const account = req.user;
    res.render(
        'user',
        {
            title: 'Search',
            layout: 'layouts/search',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/search.css',
            account,
            isDetailPage: false
        }
    );
});

router.get('/', function (req, res, next) {
    res.redirect('/home');
});

module.exports = router;