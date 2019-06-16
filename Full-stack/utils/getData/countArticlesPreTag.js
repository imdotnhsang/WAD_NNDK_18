const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const countArticlesPreTag = (tagId) => {
    return Article.countDocuments({
        tags: tagId,
        publishedAt: { $ne: null},
        isPremium: true
    }, (err, countValue) => {
        if (err) {
            return -1;
        }
        return countValue;
    });
}

module.exports = countArticlesPreTag;