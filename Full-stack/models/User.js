const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    userType: { // subscriber, writer, editor, administrator
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: false
    },
    pseudonym: { // writer
        type: String,
        required: false
    },
    expiredAt: { // subscriber
        type: Date,
        required: false
    },
    categoriesManagement: { // editor
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
});

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = {
    User, UserSchema
}