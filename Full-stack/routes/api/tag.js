const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

const router = express.Router();
const Tag = mongoose.model('Tag');

router.get('/get-all', (_, res) => {
    Tag
        .find({ isActive: true })
        .then(tagList => res.json(tagList))
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
});

router.post('/create', (req, res) => {
    let errors = {};

    let { title } = req.body;
    let slug = _.trim(title).replace(/ /g, '-').toLowerCase();

    if (_.isEmpty(title) || _.isEmpty(slug)) {
        errors.tag = 'Tag does not exist.'
        return res.status(400).json(errors);
    }

    Tag
        .findOne(
            {
                $and: [
                    { $or: [{ title }, { slug }] },
                    { isActive: true }
                ]
            }
        )
        .then(result => {
            if (result) {
                errors.tag = 'Tag already exist';
                return res.status(400).json(errors);
            }

            const newTag = new Tag({ title, slug });

            return newTag
                .save()
                .then(result => res.json(result))
        })
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
});

router.post('/delete', (req, res) => {
    let errors = {};
    let { id } = req.body;

    if (_.isEmpty(id)) {
        errors.id = 'Id does not exist.';
        return res.status(400).json(errors);
    }

    Tag
        .findOne({ _id: id, isActive: true })
        .then(result => {
            console.log(result);

            if (_.isEmpty(result)) {
                errors.id = 'Id not found.';
                return res.status(404).json(errors);
            }

            result.isActive = false;

            return result
                .save()
                .then(newResult => res.json(newResult))
        })
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
});

router.post('/update', (req, res) => {
    let errors = {};

    let { title, id } = req.body;
    let slug = _.trim(title).replace(/ /g, '-').toLowerCase();

    if (_.isEmpty(title) || _.isEmpty(slug) || _.isEmpty(id)) {
        errors.tag = 'Tag does not exist.'
        return res.status(400).json(errors);
    }

    Tag
        .findOne({ _id: id, isActive: true })
        .then(result => {
            if (_.isEmpty(result)) {
                errors.id = 'Id not found.';
                return res.status(404).json(errors);
            }

            result.title = title;
            result.slug = slug;

            return result
                .save()
                .then(newResult => res.json(newResult))
        })
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
})

module.exports = router;