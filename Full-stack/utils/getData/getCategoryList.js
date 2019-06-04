const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const getCategoryList = () => {
    return Category
        .find({
            isActive: true,
            parentId: null
        })
        .select({
            _id: 1,
            title: 1,
            slug: 1,
            subCategories: 1
        })
        .populate('subCategories', '_id title slug parentId')
        .then(allCategories => allCategories);
}


module.exports = getCategoryList;