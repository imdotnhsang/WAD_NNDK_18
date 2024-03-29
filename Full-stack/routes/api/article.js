const express = require('express');
const router = express.Router();
const _ = require('lodash');
const createSlug = require('slug');

const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Tag = mongoose.model('Tag');

const path = require('path');
const multer = require('multer');
const destAvatar = path.join(__dirname, '../../public/images/writer/');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destAvatar);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/upload-image', upload.array('flFileUpload', 12), (req, res) => {
    res.redirect('back');
});

router.post('/create', (req, res) => {
    let accountWriter = req.user;
    const errors = {};

    if (!accountWriter || accountWriter.userType !== 'writer'){
        errors.account = 'Authorization fail.';
        return res.status(400).json(errors)
    }


    let { title, tagListOld, tagListNew, categories, coverImage, content, abstract } = req.body;
    let process = 'draft';
    let writer = accountWriter._id;

    title = _.trim(title);
    let slug = createSlug(title);

    if (_.isEmpty(title) || _.isEmpty(slug)) {
        errors.title = 'Title article does not exist.'
        return res.status(400).json(errors);
    }

    let tagDocs = [];
    for (let tag of tagListNew) {
        let title =  _.trim(tag);
        let slug = createSlug(title);
        tagDocs.push({ 
            title, slug
        })
    }

    Tag
        .insertMany(tagDocs,  { ordered: false }, (err, tagListCreated) => {
            if (err) {
                console.log(err);
                return res.status(400).json(err);
            }

            let tags = [...tagListOld, ...tagListCreated.map(tag => tag._id.toString())];

            Article
                .findOne({ $or: [{ title }, { slug }] })
                .then(result => {
                    if (result) {
                        errors.article = 'Article already exist';
                        return res.status(400).json(errors);
                    }

                    const newArticle = new Article(
                        {
                            title,
                            slug,
                            tags,
                            categories,
                            coverImage,
                            content,
                            abstract,
                            process,
                            writer
                        }
                    );

                    return newArticle.save()
                        .then(articleCreated => {
                            const payload = _.pick(articleCreated, [
                                '_id',
                                'title',
                                'slug',
                                'tags',
                                'categories',
                                'coverImage',
                                'content',
                                'abstract',
                                'views',
                                'comments',
                                'isPremium',
                                'process',
                                'reasonDenied',
                                'writer',
                                'administratorId'
                            ])

                            return res.json(payload);
                        })
                })
                .catch(err => res.status(400).json(err));
        })
});

router.post('/update', (req, res) => {
    let account = req.user;
    const errors = {};

    if (!account || account.userType === 'subscriber'){
        errors.account = 'Authorization fail.';
        return res.status(400).json(errors)
    }

    const payload = _.pick(req.body, [
        'publishedAt', 
        'title', 
        'tagListOld', 
        'tagListNew', 
        'categories', 
        'coverImage', 
        'content', 
        'abstract', 
        'id', 
        'reasonDenied', 
        'process',
        "editor",
        "isPremium"
    ]);

    const { typeUpdate } = req.body;
    
    if (payload.title) {
        payload.title = _.trim(payload.title);
        payload.slug = createSlug(payload.title);
    
        if (_.isEmpty(payload.title) || _.isEmpty(payload.slug)) {
            errors.title = 'Title article does not exist.'
            return res.status(400).json(errors);
        }
    }


    if (payload.process === "published") {
        payload.publishedAt = parseInt(payload.publishedAt, 10);
        if (account.userType === 'writer') {
            errors.account = 'Authorization fail.';
            return res.status(400).json(errors)
        } else if (_.isNaN(payload.publishedAt)) {
            errors.publishedAt = 'Invalid date time publish.';
            return res.status(400).json(errors)
        }
    }

    let tagDocs = [];
    for (let tag of payload.tagListNew) {
        let title =  _.trim(tag);
        let slug = createSlug(title);
        tagDocs.push({ 
            title, slug
        })
    }

    Tag
        .insertMany(tagDocs,  { ordered: false }, (err, tagListCreated) => {
            if (err) {
                console.log(err);
                return res.status(400).json(err);
            }

            let tags = [...payload.tagListOld, ...tagListCreated.map(tag => tag._id.toString())];

            payload.tags = tags;

            if (typeUpdate === 'editPost') {
                payload.reasonDenied = undefined;
            }

            const articleId = payload.id;

            Article
                .findById(articleId)
                .then(article => {
                    if (!article) {
                        errors.article = "Article not found.";
                        return res.status(404).json(errors);
                    }

                    const keys = Object.keys(payload);

                    for (let key of keys) {
                        article[key] = payload[key];
                    }

                    return article.save()
                        .then(result => {
                            console.log(result);
                            return res.json(result)
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err)
                });
        })
});

router.post('/delete', (req, res) => {
    const errors = {};
    let account = req.user;

    if (!account || account.userType !== 'administrator'){
        errors.account = 'Authorization fail.';
        return res.status(400).json(errors)
    }

    const { id } = req.body;

    Article
        .findByIdAndUpdate(id, { process: 'deleted' })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
});

module.exports = router;