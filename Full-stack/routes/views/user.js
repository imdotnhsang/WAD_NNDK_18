var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');

router.get('/home', function (req, res, next) {
    const account = req.user;

    //Lấy 5 bài có views nhiều nhất trong tuần qua
    const fiveArticlesHot = [
        {
            title: 'Apple has edged out a number ofthird-party screen time and parental control apps: report',
            categoryName: 'Apple',
            publishDate: 1558802053334,
            coverImage: ''
        },
        {
            title: 'Samsung delays Galaxy Fold indefinitely:‘We will take measures to strengthen the display’',
            categoryName: 'Samsung',
            publishDate: 1558810668776,
            coverImage: ''
        },
        {
            title: 'Nvidia’s new GTX 1660 Ti and 1650 could power your next budget gaming laptop',
            categoryName: 'Tech',
            publishDate: 1558802053334,
            coverImage: ''
        },
        {
            title: 'How to organize your Google Photos collection',
            categoryName: 'Google',
            publishDate: 1558810668776,
            coverImage: ''
        },
        {
            title: 'Avengers: Endgame — our spoiler-free review',
            categoryName: 'Review',
            publishDate: 1558802053334,
            coverImage: ''
        }
    ];

    //Lấy 10 bài mới đăng gần nhất tất cả chuyên mục
    const tenArticlesLastest = [{ title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' },
    { title: 'FCC approves SpaceX’s plans to fly internet-beaming satellites in a lower orbit', categoryName: 'Space', publishDate: 1558802053334, coverImage: '' }];

    //Lấy 10 bài đọc nhiều nhất tất cả chuyên mục
    const tenArticlesMostRead = [{ title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'DJI denies that it’s discontinuing its iconic Photom drones', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' }];

    //Lấy 12 chuyên mục có view lớn (tổng view các bài của chuyên mục đó) rồi lấy bài đọc mới nhất của chuyên mục đó. Lưu ý là không lấy chuyên mục cha, chỉ lấy chuyên mục con
    const twelveArticlesCategory = [{ title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Robot toy company Anki is going out of business', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' }]

    res.render(
        'user',
        {
            title: 'Home',
            layout: 'layouts/home',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '',
            account,
            fiveArticlesHot,
            tenArticlesLastest,
            tenArticlesMostRead,
            twelveArticlesCategory
        }
    );
});

router.get('/article/:slug', function (req, res, next) {
    const account = req.user;

    const { slug } = req.params;

    //Lấy đại 5 bài trong cũng chuyên mục (nếu là chuyên mục con thì lấy 5 thằng chỉ cùng chuyên mục con)
    const fiveArticlesNextUp = [{ title: 'Apple’s Q2 earnings: iPhone sales continue to drop as services keep growing' },
    { title: 'The man who predicted Antennagate is no longer at Apple' },
    { title: 'Apple’s Aperture photo editing software will shutter for good after macOS Mojave' },
    { title: 'Apple explains why it’s cracking down on third-party screen time and parental control apps' },
    { title: 'Apple claims it isn’t scanning customers’ faces, after teen sues for $1 billion' }];

    //Lấy 6 bài đọc nhiều nhất chuyên mục cha của thằng chuyên mục con của bài detail (nếu là chuyên mục cha rồi thì lấy các bài cùng chuyên mục cha đó)
    const sixArticlesMostRead = [{ title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558810668776, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Samsung', publishDate: 1558810668776, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'SpaceX', publishDate: 1558802053334, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558810668776, coverImage: '' }];

    Article.findOneAndUpdate({ slug }, {$inc: { views: 1 }})
        .populate('tags')
        .populate('categories')
        .populate('writer', '_id fullname pseudonym')
        .then(article => {
            if (!article) {
                return res.redirect('/home');
            }

            console.log(article);

            return res.render(
                'user',
                {
                    title: 'Detail',
                    layout: 'layouts/detail',
                    srcScript: '/javascripts/guest-subscriber/script.js',
                    hrefCss: '/stylesheets/guest-subscriber/detail.css',
                    account,
                    articleDetail: article,
                    fiveArticlesNextUp,
                    sixArticlesMostRead
                }
            );
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/home');
        })
});

router.get('/category', function (req, res, next) {
    const account = req.user;

    const articlesCategory = {
        categoryName: 'Apple',
        descriptionCategory: 'The latest tech news about the world is best (and sometimes worst) hardware, apps, and much more. From top companies like Google and Apple to tiny startups vying for your attention, Verge Tech has the latest in what matters in technology daily.',
        twoArticlesHot: [{ title: 'Apple has edged out a number of third-party screen time and parental control apps: report 1', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '' },
        { title: 'Apple has edged out a number of third-party screen time and parental control apps: report 2', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '' }]
    }

    //Lấy tất cả các bài trong chuyên mục (nếu chuyên mục con thì chỉ lấy chuyên mục con, còn nếu chuyên mục cha thì lấy tất cả các bài của chuyên mục con)
    const resultArticlesCategory = [{ title: 'Apple Pay is coming to New York City’s MTA transit system this summer', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 2', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 3 ', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 4', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 5', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 6', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 7', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 8', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 9', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 10', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
    { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 10', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] }];

    //Lấy 6 bài đọc nhiều nhất cùng chuyên mục (nếu chuyên mục con thì chỉ lấy chuyên mục con, còn nếu chuyên mục cha thì lấy tất cả các bài của chuyên mục con)
    const sixArticlesMostRead = [{ title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558802053334, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558810668776, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Samsung', publishDate: 1558810668776, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'SpaceX', publishDate: 1558802053334, coverImage: '' },
    { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558810668776, coverImage: '' }]

    res.render(
        'user',
        {
            title: 'Category',
            layout: 'layouts/category',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/category.css',
            account,
            articlesCategory,
            resultArticlesCategory,
            sixArticlesMostRead
        }
    );
});

router.get('/category/:slug', function (req, res, next) {
    const account = req.user;


});

router.get('/hashtag', function (req, res, next) {
    const account = req.user;

    //Lấy tất cả các bài thuộc hashtag này
    const resultArticlesHashtag = {
        nameHashtag: 'Apple 2019',
        result: [{ title: 'Apple Pay is coming to New York City’s MTA transit system this summer', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 2', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 3 ', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 4', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 5', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 6', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 7', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 8', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 9', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 10', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] }]
    }

    res.render(
        'user',
        {
            title: 'Hashtag',
            layout: 'layouts/hashtag',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/hashtag.css',
            account,
            resultArticlesHashtag
        }
    );
});

router.get('/information', function (req, res, next) {
    const account = req.user;

    console.log(account);

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
    const account = req.user;

    //Lấy tất cả các bài dựa trên keyword tìm kiếm đã nhập
    const resultArticlesSearch = {
        keySearch: 'Apple',
        result: [{ title: 'Apple Pay is coming to New York City’s MTA transit system this summer', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 2', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 3 ', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 4', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 5', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 6', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 7', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 8', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 9', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] },
        { title: 'Apple Pay is coming to New York City’s MTA transit system this summer 10', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '', abstract: 'Hello OMNY (you know, like “omni” spelled with NY for New York)', tags: ['Apple Pay', 'Apple 2019'] }]
    }

    res.render(
        'user',
        {
            title: 'Search',
            layout: 'layouts/search',
            srcScript: '/javascripts/guest-subscriber/script.js',
            hrefCss: '/stylesheets/guest-subscriber/search.css',
            account, resultArticlesSearch
        }
    );
});

router.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/home');
});

module.exports = router;