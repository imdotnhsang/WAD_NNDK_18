const express = require('express');
const router = express.Router();
const _ = require('lodash');

const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const findSubCategories = (parentId) => {
    return new Promise((resolve, reject) => {
        Category
            .find({ parentId, isActive: true })
            .select({
                _id: true,
                title: true,
                slug: true,
            })
            .then(subCategories => {
                const result = subCategories.map(subCategory => subCategory._doc);
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
}

router.get('/get-all', (req, res) => {
    Category
        .find({ isActive: true })
        .exists('parentId', false)
        .select({
            _id: true,
            title: true,
            slug: true
        })
        .then(categoryList => {
            return Promise.all(categoryList.map((category) => {
                return findSubCategories(category._id)
                    .then(subCategories => ({ ...category._doc, subCategories }));
            }))
        })
        .then(allCategories => res.json(allCategories))
        .catch(err => res.status(400).json(err));
});

router.post('/create', (req, res) => {
    const errors = {};
    let { title, parentId } = req.body;

    const accountAdmin = req.user;

    if (!accountAdmin || accountAdmin.userType !== 'administrator') {
        errors.category = 'Authorization has failed.';
        return res.status(400).json(errors);
    } 

    title = _.trim(title);
    let slug = title.replace(/ /g, '-').toLowerCase();

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
                const newCategory = new Category({ title, slug })

                return newCategory
                    .save()
                    .then(categoryCreated => {
                        const payload = {
                            _id: categoryCreated._id,
                            title: categoryCreated.title,
                            slug: categoryCreated.slug,
                            parentId: categoryCreated.parentId
                        };

                        return res.json(payload);
                    })
            } else {
                Category
                    .findOne({ _id: parentId, isActive: true })
                    .then(result => {
                        if (!result) {
                            errors.parentId = 'Parent category does not exist';
                            return res.status(400).json(errors);
                        }

                        const newCategory = new Category({ title, slug, parentId });
                        return newCategory
                            .save()
                            .then(categoryCreated => {
                                const payload = {
                                    _id: categoryCreated._id,
                                    title: categoryCreated.title,
                                    slug: categoryCreated.slug,
                                    parentId: categoryCreated.parentId
                                };
                                return res.json(payload);
                            })
                    })
            }
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
    let slug = title.replace(/ /g, '-').toLowerCase();

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

            Category
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
                            const payload = {
                                _id: categoryUpdated._id,
                                title: categoryUpdated.title,
                                slug: categoryUpdated.slug,
                                parentId: categoryUpdated.parentId
                            };

                            return res.json(payload);
                        })
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;