const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date().getTime()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
    Comment, CommentSchema
}