const express = require('express');
const router = express.Router();
const _ = require('lodash');
const createSlug = require('slug');

const mongoose = require('mongoose');
const Category = mongoose.model('Category');

router.post('/create', (req, res) => {
    const errors = {};
    let { title, parentId } = req.body;

    const accountAdmin = req.user;
    if (!accountAdmin || accountAdmin.userType !== 'administrator') {
        errors.category = 'Authorization has failed.';
        return res.status(400).json(errors);
    } 

    title = _.trim(title);
    let slug = createSlug(slug);

    if (_.isEmpty(title) || _.isEmpty(slug)) {
        errors.title = 'Title category does not exist.'
        return res.status(400).json(errors);
    }

    Category
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
                errors.category = 'Category already exist';
                return res.status(400).json(errors);
            }

            if (_.isEmpty(parentId)) {
                const newCategory = new Category({
                    title,
                    slug
                })

                return newCategory
                    .save()
                    .then(categoryCreated => {
                        const payload = _.pick(categoryCreated, ['_id', 'title', 'slug', 'subCategories']);
                        return res.json(payload);
                    })
            }

            Category
                .findOne({
                    _id: parentId,
                    isActive: true
                })
                .then(result => {
                    if (!result) {
                        errors.parentId = 'Parent category does not exist';
                        return res.status(400).json(errors);
                    }

                    const newCategory = new Category({
                        title,
                        slug,
                        parentId
                    });
                    return newCategory
                        .save()
                        .then(categoryCreated => {
                            const payload = _.pick(categoryCreated, ['_id', 'title', 'slug', 'subCategories']);

                            result.subCategories.push(payload._id);
                            return result.save()
                                .then(() => res.json(payload))
                        })
                })

        })
        .catch(err => res.status(400).json(err));
});

router.post('/update', (req, res) => {
    const errors = {};
    let { title, id } = req.body;

    const accountAdmin = req.user;
    if (!accountAdmin || accountAdmin.userType !== 'administrator') {
        errors.category = 'Authorization has failed.';
        return res.status(400).json(errors);
    } 
    
    title = _.trim(title);
    let slug = createSlug(title);

    if (_.isEmpty(title) || _.isEmpty(slug)) {
        errors.title = 'Title category does not exist.'
        return res.status(400).json(errors);
    }

    if (_.isEmpty(id)) {
        errors.category = 'Cannot find category to edit.';
        return res.status(400).json(errors);
    }

    Category
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
                errors.category = 'Category already exist';
                return res.status(400).json(errors);
            }

            return Category
                .findById(id)
                .then(category => {
                    if (!category) {
                        errors.category = 'Cannot find category to edit.';
                        return res.status(400).json(errors);
                    }

                    category.title = title;
                    category.slug = slug;

                    return category
                        .save()
                        .then(categoryUpdated => {
                            const payload = _.pick(categoryUpdated, ['_id', 'title', 'slug', 'subCategories']);
                            return res.json(payload);
                        })
                })
        })
        .catch(err => res.status(400).json(err));
});

router.get('/get-all', (req, res) => {
    Category
        .find({ isActive: true, parentId: null })
        .select({
            _id: 1,
            title: 1,
            slug: 1,
            subCategories: 1
        })
        .populate('subCategories', '_id title slug parentId')
        .then(allCategories => {
            return res.json(allCategories);
        })
        .catch(err => res.status(400).json(err));

})



module.exports = router;