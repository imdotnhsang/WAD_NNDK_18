const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const countArticlesCategory = (articlesCateCondition) => {
    return Article.countDocuments(articlesCateCondition, (err, countValue) => {
        if (err) {
            return -1;
        }

        return countValue;
    });
}

module.exports = countArticlesCategory;