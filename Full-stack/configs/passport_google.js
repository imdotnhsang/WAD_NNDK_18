const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const passport = require('passport');
const { pickUser } = require('../utils');
const { User } = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


