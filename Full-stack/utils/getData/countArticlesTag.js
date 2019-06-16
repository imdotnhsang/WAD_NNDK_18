const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const countArticlesTag = (tagId) => {
    return Article.countDocuments({
        tags: tagId,
        publishedAt: { $ne: null},
        isPremium: false
    }, (err, countValue) => {
        if (err) {
            return -1;
        }
        return countValue;
    });
}

module.exports = countArticlesTag;