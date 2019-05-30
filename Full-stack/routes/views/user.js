var express = require('express');
var router = express.Router();

router.get('/home', function (req, res, next) {
    const account = req.user;

    console.log('account', account);
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