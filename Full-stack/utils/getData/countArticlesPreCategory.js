const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const countArticlesPreCategory = (categoryId) => {
    return Article.countDocuments({
        categories: categoryId,
        publishedAt: { $ne: null},
        isPremium: true
    }, (err, countValue) => {
        if (err) {
            return -1;
        }

        return countValue;
    });
}

module.exports = countArticlesPreCategory;