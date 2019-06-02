const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const findSubCategories = (parentId) => {
    return new Promise((resolve, reject) => {
        Category
            .find({
                parentId,
                isActive: true
            })
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

const getCategoryList = () => {
    return Category
        .find({
            isActive: true
        })
        .exists('parentId', false)
        .select({
            _id: true,
            title: true,
            slug: true
        })
        .then(categoryList => {
            return Promise.all(categoryList.map((category) => {
                return findSubCategories(category._id)
                    .then(subCategories => ({
                        ...category._doc,
                        subCategories
                    }));
            }))
        })
}

module.exports = getCategoryList;