const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = {
    TagSchema, Tag
}