const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { sendOTPCode, createOTP, pickUser } = require('../../utils');
const { User } = require('../../models/User');

router.post('/login', (req, res) => {
    const errors = {};
    const { usernameOrEmail, password } = req.body;

    User
        .findOne({
            $and: [
                { $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
                { isActive: true }
            ]
        })
        .then(user => {            
            if (!user) {
                errors.usernameOrEmail = 'Username or email not found.';
                return res.status(404).json(errors);
            }
            if (!user.validPassword(password)) {
                errors.password = "Password incorrect.";
                return res.status(400).json(errors);
            }

            if (user.confirmed === false) {
                errors.confirmed = 'Account must be confirmed email.'
                return res.status(400).json(errors);
            }
            
            const payload = pickUser(user, user.userType);
            return res.json(payload);
        })
        .catch(err => res.status(400).json(err));
});

router.post('/register', (req, res) => {
    const errors = {};
    const { username, fullname, email, password, userType, pseudonym } = req.body;

    User
        .findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                if (user.username === username) {
                    errors.username = 'Username already exist.'
                }

                if (user.email === email) {
                    errors.email = 'Email already exist.'
                }

                return res.status(400).json(errors);
            }

            const OTP = createOTP();
            const newUser = new User({ username, fullname, email, userType, OTP });

            switch (userType) {
                case 'subscriber':
                    newUser.expiredAt = new Date().getTime();
                    break;
                case 'editor':
                    newUser.categoriesManagement = [];
                    break;
                case 'writer':
                    if (_.isEmpty(pseudonym)) {
                        errors.pseudonym = 'Pseudonym is required.'
                        return res.status(400).json(errors);
                    }

                    newUser.pseudonym = pseudonym;
                    break;
                case 'administrator':
                    break;
                default:
                    errors.userType = 'Usertype does not exist.'
                    return res.status(400).json(errors);
            }

            newUser.password = newUser.encryptPassword(password);

            return newUser
                .save()
                .then(userCreated => {
                    const payload = pickUser(userCreated, userCreated.userType);
                    console.log(payload);

                    sendOTPCode(userCreated.email, userCreated.OTP.code, 'activation');

                    return res.json(payload);
                })
        })
        .catch(err => res.status(400).json(err));
});

router.post('/send-OTP', (req, res) => {
    const errors = {};
    const { email, actionType } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'Email does not exist.'
                return res.status(400).json(errors);
            }

            const OTP = createOTP();
            user.OTP = OTP;

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);

                    sendOTPCode(userUpdated.email, userUpdated.OTP.code, actionType);
                    return res.json(payload);
                })
        })
        .catch(err => res.status(400).json(err))
});

router.post('/validate-OTP', (req, res) => {
    const errors = {};
    const { email, OTPCode, actionType } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'Email does not exist.'
                return res.status(400).json(errors);
            }

            const OTP = user.OTP;
            console.log(OTP);
            
            if (OTP.code !== OTPCode) {
                errors.OTPcode = 'OTP code is invalid.'
                return res.status(400).json(errors);
            }

            const currentTime = new Date().getTime();
            if (OTP.expiredAt < currentTime) {
                errors.expiredAt = 'OTP code has expired.'
                return res.status(400).json(errors);
            }

            switch (actionType) {
                case 'activation':
                    if (user.confirmed) {
                        errors.confirmed = 'Account already activation.'
                        return res.status(400).json(errors);
                    }

                    user.confirmed = true;

                    return user.save()
                        .then(userUpdated => {
                            const payload = pickUser(userUpdated, userUpdated.userType);
                            return res.json(payload);
                        })

                case 'forgotten-password':
                    break;
                default:
                    break;
            }
        })
        .catch(err => res.status(400).json(err));

});

router.post('/forgotten-password', (req, res) => {
    const errors = {};
    const { email } = req.body;

    User
        .findOne({ email, isActive: true })
        .then(user => {
            if (!user) {
                errors.email = 'Email does not exits.';
                return res.status(404).json(errors);
            }

            sendOTPCode(user.email, 'forgotten');
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;