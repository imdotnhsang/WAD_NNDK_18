const mongoose = require('mongoose');

const Article = mongoose.model('Article');

const countArticlesCategory = (categoryId) => {
    return Article.countDocuments({
        categories: categoryId,
        //publishedAt: { $ne: null}
    }, (err, countValue) => {
        if (err) {
            return -1;
        }

        return countValue;
    });
}

module.exports = countArticlesCategory;