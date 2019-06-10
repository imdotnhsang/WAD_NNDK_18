const express = require('express');
const router = express.Router();
const _ = require('lodash');

const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Article = mongoose.model('Article');

router.post('/create', (req, res) => {
    const errors = {};
    const { userId, content, articleId } = req.body;

    // const curAccount = req.user;
    // if (!curAccount || curAccount._id !== userId) {
    //     errors.authorization = 'Authorization has failed.';
    //     return res.status(400).json(errors);
    // }


    if (_.isEmpty(userId) || _.isEmpty(content)) {
        errors.comment = 'Comment is invalid.';
        return res.status(400).json(errors);
    }


    const newComment = new Comment({ content, user: userId});

    Article
        .findById(articleId)
        .then(article => {
            if (!article) {
                errors.article = 'Article is invalid.';
                return res.status(400).json(errors);
            }

            article.comments.push(newComment);

            return article.save()
                .then(articleUpdated => {
                    const payload = _.pick(articleUpdated, [
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
                        'editorId',
                        'administratorId'
                    ])

                    return res.json(payload);
                })
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;