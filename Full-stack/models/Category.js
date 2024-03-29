const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    description: String,
    isActive: {
        type: Boolean,
        default: true
    },
    subCategories: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Category'
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    Category, CategorySchema
}