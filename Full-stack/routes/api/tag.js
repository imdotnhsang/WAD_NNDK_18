const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

const router = express.Router();
const Tag = mongoose.model('Tag');

router.get('/get-all', (_, res) => {
    Tag
        .find()
        .then(tagList => res.json(tagList))
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
});

router.post('/create', (req, res) => {
    let errors = {};

    let title = _.get(req.body, 'title');

    if (_.isEmpty(title) || _.isEmpty(title.trim())) {
        errors.title = 'Title does not exist.'
        return res.status(400).json(errors);
    }

    title = title.trim();
    let slug = title.replace(/ /g, '-');

    const newTag = new Tag({ title, slug });

    newTag
        .save()
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
})

module.exports = router;