const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');

const getTagList = () => {
    return Tag
        .find()
        .sort({
            _id: -1
        })
        .select({
            '_id': true,
            'title': true,
            'slug': true
        })
        .then(tagList => tagList);
}

module.exports = getTagList;