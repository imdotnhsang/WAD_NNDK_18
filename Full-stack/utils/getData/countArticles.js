const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const countArticles = (articlesCondition) => {
    return Article.countDocuments(articlesCondition, (err, countValue) => {
        if (err) {
            return -1;
        }

        return countValue;
    });
}

module.exports = countArticles;