const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    userType: { type: String, required: true },
    pseudonym: { type: String, required: false},
    categoriesManagement: { type: [mongoose.Schema.Types.ObjectId], required: false },
    createdAt: { type: Date, default: Date.now() },
    expiredAt: { type: Date, required: false } 
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User, UserSchema
}