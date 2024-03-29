const mongoose = require('mongoose');
const { CommentSchema } = require('./Comment')

const ArticleSchema = mongoose.Schema({
    title: { type: String, required: true },
    tags: { type: [String], required: false },
    coverImage: { type: String, required: true },
    publishDate: { type: Date, required: false },
    content: { type: String, required: true },
    abstract: { type: String, required: true },
    views: { type: Int32Array, default: 0 },
    comments: { type: [CommentSchema], required: false },
    isPremium: { type: Boolean, default: false },
    status: { type: String, required: true }, // publish, edit, admin
    reasonDenied: { type: String, default: '' },
    createdAt: { type: Date, required: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true }, //subcate
    writerId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = {
    ArticleSchema, Article
}