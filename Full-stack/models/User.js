const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Desc:
// required: fullname, username, email, userType, password
// default: isActive, createAt
// other: birthday, pseudonym, expiredAt, categoriesManagement

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
        type: Number,
        required: false
    },
    gender: { // 0: Male, 1: Female
        type: Boolean,
        required: false
    },
    userType: { // subscriber, writer, editor, administrator
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    pseudonym: { // writer
        type: String,
        required: false
    },
    expiredAt: { // subscriber
        type: Number,
        required: false
    },
    categoriesManagement: { // editor
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    },
    OTP: {
        code: {
            type: String,
            required: true
        },
        expiredAt: {
            type: Number,
            required: true
        }
    }
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