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
    }
});

const Category = mongoose.model('Category', CategorySchema); 

module.exports = {
    Category, CategorySchema
}