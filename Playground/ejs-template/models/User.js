const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: false },
    userType: { type: String, required: true }, // subscriber, writer, editer, administrator
    pseudonym: { type: String, required: false },
    categoriesManagement: { type: [mongoose.Schema.Types.ObjectId], required: false },
    createdAt: { type: Date, default: Date.now() },
    expiredAt: { type: Date, required: false },
    isActive: { type: Boolean, default: false }
});

UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = {
    User, UserSchema
}