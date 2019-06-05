const express = require('express');
const router = express.Router();
const _ = require('lodash');

const mongoose = require('mongoose');
const Article = mongoose.model('Article');

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
    // let accountWriter = req.user;

    const errors = {};

    let { title, tags, categories, coverImage, content, abstract } = req.body;
    let process = 'editor';
    let writerId = '5cf3825bd75d653cd04fadcb';

    title = _.trim(title);
    let slug = title.replace(/ /g, '-').toLowerCase();

    if (_.isEmpty(title) || _.isEmpty(slug)) {
        errors.title = 'Title article does not exist.'
        return res.status(400).json(errors);
    }

    // if (!accountWriter || accountWriter.userType !== 'writer') {
    //     errors.article = 'Authorization has failed.';
    //     return res.status(400).json(errors);
    // } 

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
                    writerId
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
                        'writerId',
                        'editorId',
                        'administratorId'
                    ])

                    return res.json(payload);
                })
        })
        .catch(err => res.status(400).json(err));
});



module.exports = router;