const mongoose = require('mongoose');
const { CommentSchema } = require('./Comment')

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    coverImage: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Number,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    comments: [{
        type: CommentSchema
    }],
    isPremium: {
        type: Boolean,
        default: false
    },
    process: { // draft, published
        type: String,
        required: true
    },
    reasonDenied: {
        type: String,
        required: false
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    editor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    administrator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
});

ArticleSchema.index(
    { title: "text", abstract: "text", content: "text"  },
    { weights: { title: 3, abstract: 2, content: 1 }}
);

const Article = mongoose.model('Article', ArticleSchema);

module.exports = {
    ArticleSchema, Article
}