const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const getCategoryList = () => {
    return Category
        .find({
            isActive: true,
            parentId: null
        })
        .populate('subCategories')
        .then(allCategories => allCategories);
}


module.exports = getCategoryList;