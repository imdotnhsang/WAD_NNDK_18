const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { pickUser } = require('../utils');
const { User } = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// passport.use('local.login', new LocalStrategy({
//     usernameField: 'usernameOrEmail',
//     passwordField: 'password',
//     passReqToCallback: true
// }, (req, usernameOrEmail, password, done) => {
//     const errors = {};

//     User
//         .findOne({
//             $and: [
//                 { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
//                 { isActive: true }
//             ]
//         }, (err, user) => {
//             if (err) {
//                 return done(err);
//             }

//             if (!user) {
//                 errors.usernameOrEmail = 'Username or email not found.';
//                 return done(errors);
//             }
//             if (!user.validPassword(password)) {
//                 errors.password = "Password incorrect.";
//                 return done(errors);
//             }

//             if (user.confirmed === false) {
//                 errors.confirmed = 'Account must be confirmed email.'
//                 return done(errors);
//             }

//             const payload = pickUser(user, user.userType);
            
//             return done(null, payload);
//         });
// }));
