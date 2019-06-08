const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

TagSchema.index({ title: 1 }, { unique: true, dropDups: true })
TagSchema.index({ slug: 1 }, { unique: true, dropDups: true })

const Tag = mongoose.model('Tag', TagSchema);

module.exports = {
    TagSchema, Tag
}