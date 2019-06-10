const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

const router = express.Router();
const Tag = mongoose.model('Tag');

router.get('/count', (req, res) => {
    Tag.countDocuments({ isActive: true })
        .then(value => res.json(value))
        .catch(err => res.status(400).json(err));
});

router.get('/get-all', (req, res) => {
    Tag
        .find()
        .sort({ _id: -1})
        .then(tagList => res.json(tagList))
        .catch(err => res.status(400).json(err));
});

router.get('/get-page/:page', (req, res) => {
    const { page } = req.params;
    const tagsPerPage = 5;
    
    Tag
        .find({ isActive: true })
        .sort({ _id: -1})
        .skip((page - 1) * tagsPerPage)
        .limit(tagsPerPage)
        .select({
            '_id': true,
            'title': true,
            'slug': true
        })
        .then(tagList => res.json(tagList))
        .catch(err => res.status(400).json(err));
});

router.post('create-many', (req, res) => {
    const { tagList } = req.body;

    let docs = [];
    for (let tag of tagList) {
        let title =  _.trim(tag);
        let slug = createSlug(title);

        docs.push({ title, slug})
    }

    Tag.insertMany(docs, { ordered: false }, (err, result) => {
        console.log(err);
        console.log(result);
    })
})

router.post('/create', (req, res) => {
    let errors = {};

    let { title } = req.body; 

    title = _.trim(title); 
    let slug = createSlug(title);

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
                .then(tagCreated => {
                    const payload = { _id: tagCreated._id, title: tagCreated.title, slug: tagCreated.slug };
                    return res.json(payload)
                })
        })
        .catch(err => res.status(400).json({ ...errors, ...err.errors }));
});

router.post('/delete', (req, res) => {
    let errors = {};
    let { id } = req.body;

    const curAccount = req.user;
    if (!curAccount || curAccount.userType !== 'administrator') {
        errors.authorization = 'Authorization has failed.';
        return res.status(400).json(errors);
    }

    if (_.isEmpty(id)) {
        errors.id = 'Id does not exist.';
        return res.status(400).json(errors);
    }
    
    Tag.findByIdAndUpdate(id, { isActive: false })
        .then(tag => res.json(tag))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.post('/update', (req, res) => {
    let errors = {};

    let { title, id } = req.body;

    title = _.trim(title);
    let slug = createSlug(title);

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

            return Tag
                .findOne({
                    $and: [
                        { $or: [{ title }, { slug }] },
                        { isActive: true }
                    ]
                })
                .then(hasTag => {
                    if (hasTag) {
                        errors.title = 'Tag already exist.';
                        return res.status(400).json(errors);
                    }

                    result.title = title;
                    result.slug = slug;

                    return result
                        .save()
                        .then(newResult => res.json(newResult))
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ ...errors, ...err.errors });
        });
});

router.post('/active', (req, res) => {
    let { id } = req.body;

    const curAccount = req.user;
    if (!curAccount || curAccount.userType !== 'administrator') {
        errors.authorization = 'Authorization has failed.';
        return res.status(400).json(errors);
    }

    if (_.isEmpty(id)) {
        errors.id = 'Id does not exist.';
        return res.status(400).json(errors);
    }

    Tag.findByIdAndUpdate(id, { isActive: true })
        .then(tag => res.json(tag))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

module.exports = router;