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
            account
        }
    );
});

router.get('/detail', function (req, res, next) {
    const account = req.user;

    const articleDetail = {
        title: 'Apple Pay is coming to New York City’s MTA transit system this summer',
        tags: ['Apple Pay', 'Apple 2019', 'New York'],
        comments: [{ username: 'leonguyen', content: 'The specital affects are amazing.', createdAt: 1558802053334, avatar: '' },
        { username: 'ooahtaag', content: 'Given these phones are essentially the same specs as the brand spanking new Google Pixel 3a and 3a XL, you can save around $300 if you’re willing to take a calculated risk on a refurbished phone.', createdAt: 1558802053334, avatar: '' },
        { username: 'cognhcib', content: 'I can not believie it. What a beautiful thing!', createdAt: 1558810668776, avatar: '' },
        { username: 'vinhphat207', content: 'Oh my god! Are you kidding me? That is interstring the topic. I glad you like it.', createdAt: 1558810668776, avatar: '' },
        { username: 'hophong', content: 'It is the smartest, the best and It is very pretty.', createdAt: 1558802053334, avatar: '' }],
        publishDate: 1558802053334,
        content: '<div class="picture-detail-news pl-4 pr-4 pb-4 pt-lg-0 pr-lg-0 pl-lg-0"><div class="img-detail-news"><img class="w-100" src="/images/products/listnews.jpg" alt=""></div><div class="author-img"><p class="m-0">Photo by Amelia Holowaty Krales / The Verge</p></div></div><div class="part1"><p><a href="">It’s been nearly two years</a> since we wrote that New York City would finally be upgrading its transit system to take “tap-to-pay” contactless payments, but Apple’s Tim Cook says it’s finally coming true — on the company’s <a href="">Q2 earnings call today</a>, the CEO told investors that Apple Pay will begin rolling out to New York City’s MTA transit system starting in “early summer” of this year, letting you tap a phone or watch to pay instantly.</p></a></div><div class="part2"><p>But it probably won’t just be Apple Pay, because a few quick web searches show that NYC has actually already announced a specific date for a contactless payment system that should support other phone-based wallets (perhaps rival Android Pay?) and even contactless credit cards.</p></div><div class="part3"><p><a href="">It’s called OMNY</a> (you know, like “omni” spelled with NY for New York), and it’s scheduled to launch May 31st — though admittedly only on Staten Island buses and the 4 5 6 subway lines between Grand Central-42 Street and Atlantic Av-Barclays Ctr to start. The full system won’t roll out till 2020, and it won’t let you use any passes or discounted fares until then, according to the MTA’s website. Existing swipe-based MetroCards should still work in the meanwhile, though.</p></div><div class="picture-detail-news pl-4 pr-4 pb-4 pt-lg-0 pr-lg-0 pl-lg-0"><div class="img-detail-news"><img class="w-100" src="/images/products/listnews.jpg" alt=""></div><div class="author-img"><p class="m-0">Photo by Amelia Holowaty Krales / The Verge</p></div></div><div class="part4"><p><a href="">Gothamist reported</a> that New Yorkers started spotted the new contactless readers rolling out at the initial wave of supported stations earlier this month, but they don’t appear to be activated quite yet. CBS NY also got a brief demo of a disembodied system, which you can <a href="">see right here.</a></p></div>',
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
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558810668776, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Apple', publishDate: 1558802053334, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Samsung', publishDate: 1558810668776, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'SpaceX', publishDate: 1558802053334, coverImage: '' },
        { title: 'Apple, Luminary, Spotify, and the podcast wars to come', categoryName: 'Tech', publishDate: 1558810668776, coverImage: '' }]
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
            sixArticlesMostRead
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
            account
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
            account
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
                account
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
            account
        }
    );
});

router.get('/', function (req, res, next) {
    res.redirect('/home');
});

module.exports = router;