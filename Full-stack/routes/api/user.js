const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { sendOTPCode, createOTP, pickUser } = require('../../utils');
const { User } = require('../../models/User');

router.post('/login', (req, res) => {
    const errors = {};
    const { username, email, password } = req.body;

    User
        .findOne({
            $and: [
                { $or: [{ username }, { email }] },
                { isActive: true }
            ]
        })
        .then(user => {
            if (!user) {
                errors.message = 'Username or email not found.';
                return res.status(404).json(errors);
            }

            if (user.confirmed === false) {
                errors.confirmed = 'Account must be active.'
            }
            if (user.validPassword(password)) {
                const payload = pickUser(user, user.userType);
                return res.json(payload);
            }

            errors.password = "Password incorrect.";
            return res.status(400).json(errors);
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

// router.get('/activation/:userId', (req, res) => {
//     const errors = {};
//     const userId = req.params.userId;

//     User
//         .findOne({ _id: userId, isActive: true })
//         .then(user => {
//             if (!user) {
//                 errors.message = 'Your token invaild.'
//                 return res.status(400).json(errors);
//             }

//             if (user.confirmed) {
//                 errors.message = 'Account already confirmed.'
//                 return res.status(400).json(errors);
//             }

//             user.confirmed = true;

//             return user
//                 .save()
//                 .then(userUpdated => res.json(userUpdated));
//         })
//         .catch(err => res.status(400).json(err));
// })

router.post('/validate-otp', (req, res) => {
    const errors = {};
    const { email, OTPCode } = req.body;

    const currentTime = new Date().getTime();
    User
        .findOne({
            $and: [
                { email },
                { "OTP.code": OTPCode },
                { "OTP.expiredAt": { $gt: currentTime } }
            ]
        })
        .then(user => {
            console.log('user: ', user);

            if (!user) {
                errors.message = "Your OTP Code invalid."
                return res.status(400).json(errors);
            }

            return res.json({ message: 'Success!.' })
        })
        .catch(err => res.status(400).json(err));

});

router.post('/forgot-password', (req, res) => {
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