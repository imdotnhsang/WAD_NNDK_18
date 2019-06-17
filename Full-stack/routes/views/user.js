var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');
const Category = mongoose.model('Category');
const Tag = mongoose.model('Tag');
const { countArticles } = require('../../utils');

router.get('/home', function (req, res, next) {
    const account = req.user;

    const waitting = Promise.all(
        [
            //fiveArticlesHot
            new Promise((resolve, reject) => {
                Article
                    .find({ publishedAt: { $lte: Date.now() } })
                    .select('title slug categories publishedAt coverImage')
                    .populate('categories')
                    .sort({ views: 'desc' })
                    .limit(5)
                    .then(fiveArticlesHot => resolve(fiveArticlesHot))
                    .catch(err => reject(err));
            }),

            // tenArticlesMostRead
            new Promise((resolve, reject) => {
                Article
                    .find({ publishedAt: { $lte: Date.now() } })
                    .select('title slug categories publishedAt coverImage')
                    .populate('categories')
                    .sort({ views: 'desc' })
                    .skip(5)
                    .limit(10)
                    .then(tenArticlesMostRead => resolve(tenArticlesMostRead))
                    .catch(err => reject(err));
            }),

            // tenArticlesLastest
            new Promise((resolve, reject) => {
                Article
                    .find({ publishedAt: { $lte: Date.now() } })
                    .select('title slug categories publishedAt coverImage')
                    .populate('categories')
                    .sort({ publishedAt: 'desc' })
                    .limit(10)
                    .then(tenArticlesLastest => resolve(tenArticlesLastest))
                    .catch(err => reject(err));
            }),

            // twelveArticlesCategory
            new Promise((resolve, reject) => {
                Category
                    .find({ isActive: true })
                    .limit(12)
                    .then(categoryList => {
                        return Promise.all(categoryList.map(category => {
                            return Article
                                .findOne({ categories: category._id })
                                .select('title slug publishedAt coverImage')
                                .sort({ publishedAt: 'desc' })
                                .then(article => ({ category, article }))
                        }))
                    })
                    .then(twelveArticlesCategory => resolve(twelveArticlesCategory))
                    .catch(err => reject(err));
            }),
        ]
    )

    return waitting
        .then(values => {
            console.log(values);
            let fiveArticlesHot = values[0];
            let tenArticlesMostRead = values[1];
            let tenArticlesLastest = values[2];
            let twelveArticlesCategory = values[3];

            console.log(twelveArticlesCategory);
            return res.render(
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
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/home');
        })

});

router.get('/article/:slug', function (req, res, next) {
    const account = req.user;

    const { slug } = req.params;

    const waitting = Promise.all(
        [
            // getTop6ArticlesMostRead
            new Promise((resolve, reject) => {
                Article
                    .find({ publishedAt: { $lte: Date.now() } })
                    .select('title slug categories publishedAt coverImage')
                    .populate('categories')
                    .sort({ views: -1 })
                    .limit(6)
                    .then(sixArticlesMostRead => resolve(sixArticlesMostRead))
                    .catch(err => reject(err));
            }),

            // details Article + fiveArticlesNextUp
            new Promise((resolve, reject) => {
                Article
                    .findOneAndUpdate({ slug, publishedAt: { $lte: Date.now() } }, { $inc: { views: 1 } })
                    .populate('tags')
                    .populate('categories')
                    .populate('comments.user', 'avatar fullname')
                    .populate('writer', '_id fullname pseudonym')
                    .then(articleDetail => {
                        if (!articleDetail) {
                            resolve({ articleDetail })
                        }

                        console.log(articleDetail.comments);

                        const targetCategory = articleDetail.categories[articleDetail.categories.length - 1];

                        return Article
                            .find({ categories: targetCategory._id, publishedAt: { $lte: Date.now() }, _id: { $ne: articleDetail._id } })
                            .populate('categories')
                            .limit(5)
                            .select('title slug')
                            .then(fiveArticlesNextUp => resolve({ articleDetail, fiveArticlesNextUp }))
                    })
                    .catch(err => reject(err));
            })

            //
        ]
    )

    return waitting
        .then(values => {
            console.log(values);

            let sixArticlesMostRead = values[0];
            let { articleDetail, fiveArticlesNextUp } = values[1];

            if (!articleDetail) {
                return res.redirect('/home');
            }

            return res.render(
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
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/home');
        })
});

router.get('/category/:slug/:page', function (req, res, next) {
    const account = req.user;

    const { slug, page } = req.params;

    let pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber)) {
        return res.redirect('/home');
    }

    let categoryDetail = {};

    let isAccPremium = false;
    if (account && account.expiredAt > Date.now()) {
        isAccPremium = true;
    }

    Category.findOne({ isActive: true, slug })
        .then(category => {
            if (!category) {
                return res.redirect('/home');
            }

            const categoryId = category._id;
            categoryDetail = category._doc;

            // query
            let articlesCateCondition = {
                categories: categoryId,
                publishedAt: { $lte: Date.now() },
            }
            let articlesCateSort = {};

            if (isAccPremium) {
                articlesCateSort = { isPremium: 'desc', publishedAt: 'desc' };
            } else {
                articlesCateCondition = { ...articlesCateCondition, isPremium: false };
                articlesCateSort = { publishedAt: 'desc' };
            }

            const waitting = Promise.all([
                // countArticlesCategory
                new Promise((resolve, reject) => {
                    resolve(countArticles(articlesCateCondition))
                }),

                // getArticleCategory(page)
                new Promise((resolve, reject) => {
                    Article
                        .find(articlesCateCondition)
                        .populate('tags')
                        .populate('categories')
                        .select('title slug categories abstract tags publishedAt coverImage isPremium')
                        .skip(10 * (pageNumber - 1))
                        .limit(10)
                        .sort(articlesCateSort)
                        .then(articlesCategory => resolve(articlesCategory))
                        .catch(err => reject(err));
                }),

                // getTop6ArticlesCategoryMostRead
                new Promise((resolve, reject) => {
                    Article
                        .find(articlesCateCondition)
                        .select('title slug categories publishedAt coverImage isPremium')
                        .populate('tags')
                        .populate('categories')
                        .sort({ views: 'desc' })
                        .limit(6)
                        .then(sixArticlesMostRead => resolve(sixArticlesMostRead))
                        .catch(err => reject(err));
                }),

                // twoArticlesNewest
                new Promise((resolve, reject) => {
                    Article
                        .find(articlesCateCondition)
                        .select('title categories slug publishedAt coverImage isPremium')
                        .populate('categories')
                        .limit(2)
                        .sort({ publishedAt: -1 })
                        .then(twoArticlesNewest => resolve(twoArticlesNewest))
                        .catch(err => reject(err));
                }),
            ])

            return waitting
                .then(values => {
                    let countArticlesCategoryValue = values[0];
                    let articlesCategory = values[1];
                    let sixArticlesMostRead = values[2];
                    let twoArticlesNewest = values[3];

                    // console.log('articlesCategory', articlesCategory);
                    // console.log('sixArticlesMostRead', sixArticlesMostRead);
                    // console.log('twoArticlesNewest', twoArticlesNewest);

                    if (articlesCategory.length === 0 || countArticlesCategoryValue === -1) {
                        return res.redirect('/home');
                    }

                    console.log(twoArticlesNewest);

                    return res.render(
                        'user',
                        {
                            title: 'Category',
                            layout: 'layouts/category',
                            srcScript: '/javascripts/guest-subscriber/script.js',
                            hrefCss: '/stylesheets/guest-subscriber/category.css',
                            account,
                            twoArticlesNewest,
                            categoryDetail,
                            articlesCategory,
                            sixArticlesMostRead,
                            countArticlesCategory: countArticlesCategoryValue,
                            pageCurrent: pageNumber
                        }
                    );
                })
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/home');
        })
});

router.get('/hashtag/:slug/:page', function (req, res, next) {
    const account = req.user;

    const { slug, page } = req.params;

    let pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber)) {
        return res.redirect('/home');
    }

    let hashTag = {};

    let isAccPremium = false;
    if (account && account.expiredAt > Date.now()) {
        isAccPremium = true;
    }

    Tag.findOne({ isActive: true, slug })
        .then(tag => {
            if (!tag) {
                return res.redirect('/home');
            }

            const tagId = tag._id;

            hashTag = tag;

            // query
            let articlesTagCondition = {
                tags: tagId,
                publishedAt: { $lte: Date.now() },
            }
            let articlesTagSort = {};

            if (isAccPremium) {
                articlesTagSort = { isPremium: 'desc', publishedAt: 'desc' };
            } else {
                articlesTagCondition = { ...articlesTagCondition, isPremium: false };
                articlesTagSort = { publishedAt: 'desc' };
            }

            const waitting = Promise.all([
                // countArticlesTag
                new Promise((resolve, reject) => {
                    resolve(countArticles(articlesTagCondition))
                }),
                // getArticleTag(page)
                new Promise((resolve, reject) => {
                    Article
                        .find(articlesTagCondition)
                        .populate('tags')
                        .populate('categories')
                        .select('title slug categories abstract tags publishedAt coverImage isPremium')
                        .skip(10 * (pageNumber - 1))
                        .limit(10)
                        .sort(articlesTagSort)
                        .then(articlesTag => resolve(articlesTag))
                        .catch(err => reject(err));
                }),
            ])

            return waitting
                .then(values => {
                    let countArticlesTagValue = values[0];
                    let articlesTag = values[1];


                    return res.render(
                        'user',
                        {
                            title: 'Hashtag',
                            layout: 'layouts/hashtag',
                            srcScript: '/javascripts/guest-subscriber/script.js',
                            hrefCss: '/stylesheets/guest-subscriber/hashtag.css',
                            account,
                            countArticlesTag: countArticlesTagValue,
                            resultArticlesHashtag: articlesTag,
                            hashTag,
                            pageCurrent: pageNumber
                        }
                    );
                })
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/home');
        })
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
                srcScript: '/javascripts/guest-subscriber/information.js',
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

    const { all, title, abstract, content, page } = req.query;

    console.log(req.query);

    let keySearch = all || title || abstract || content || '';
    keySearch.trim();

    let typeSearch;

    let pageNumber = parseInt(page, 10);
    if (keySearch.length > 0 && isNaN(pageNumber)) {
        return res.redirect('/home');
    }

    let searchArticlesCondition = null;

    let isAccPremium = false;
    if (account && account.expiredAt > Date.now()) {
        isAccPremium = true;
    }

    switch (keySearch) {
        case '':
            break;
        case all:
            typeSearch = 'all';

            searchArticlesCondition = {
                $text: { $search: keySearch, $diacriticSensitive: true },
                publishedAt: { $lte: Date.now() }
            }
            break;
        case title:
            typeSearch = 'title';

            searchArticlesCondition = {
                title: { $regex: keySearch, $options: 'i' },
                publishedAt: { $lte: Date.now() }
            }
            break;

        case abstract:
            typeSearch = 'abstract';

            searchArticlesCondition = {
                abstract: { $regex: keySearch, $options: 'i' },
                publishedAt: { $lte: Date.now() }
            }
            break;
        case content:
            typeSearch = 'content';

            searchArticlesCondition = {
                content: { $regex: keySearch, $options: 'i' },
                publishedAt: { $lte: Date.now() }
            }
            break;
        default:
            break;
    }

    let articlesSearchSort = {};
    if (isAccPremium) {
        articlesSearchSort = { isPremium: 'desc', publishedAt: 'desc' };
    } else {
        searchArticlesCondition = { ...searchArticlesCondition, isPremium: false };
        articlesSearchSort = { publishedAt: 'desc' };
    }


    if (searchArticlesCondition) {
        const waitting = Promise.all([
            //countArticlesSearch
            new Promise((resolve, reject) => {
                resolve(countArticles(searchArticlesCondition))
            }),

            // getArticlesSearch(page)
            new Promise((resolve, reject) => {
                Article
                    .find(searchArticlesCondition)
                    .populate('tags')
                    .populate('categories')
                    .select('title slug categories abstract tags publishedAt coverImage isPremium')
                    .skip(10 * (pageNumber - 1))
                    .limit(10)
                    .sort(articlesSearchSort)
                    .then(articlesCategory => resolve(articlesCategory))
                    .catch(err => reject(err));
            })
        ])

        waitting
            .then(values => {
                let countArticlesSearch = values[0];
                let resultArticlesSearch = values[1];

                res.render(
                    'user',
                    {
                        title: 'Search',
                        layout: 'layouts/search',
                        srcScript: '/javascripts/guest-subscriber/script.js',
                        hrefCss: '/stylesheets/guest-subscriber/search.css',
                        account,
                        keySearch,
                        typeSearch,
                        countArticlesSearch,
                        pageCurrent: pageNumber,
                        resultArticlesSearch
                    }
                );

            })
    } else {
        res.render(
            'user',
            {
                title: 'Search',
                layout: 'layouts/search',
                srcScript: '/javascripts/guest-subscriber/script.js',
                hrefCss: '/stylesheets/guest-subscriber/search.css',
                account,
                keySearch
            }
        );
    }
});

router.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/home');
});

module.exports = router;