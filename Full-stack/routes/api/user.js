const express = require('express');
const router = express.Router();
const _ = require('lodash');

// sendmail
const rootUrl = require('config').rootUrl;
const { sendActivationEmail, sendForgotPasswordEmail} = require('../../utils/sendMail');

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
                const payload = _.pick(user, ['id', 'username', 'email', 'birthday', 'fullname'])

                switch (user.userType) {
                    case 'subscriber':
                        payload.expiredAt = user.expiredAt;
                        break;
                    case 'writer':
                        payload.pseudonym = user.pseudonym;
                        break;
                    case 'editor':
                        payload.categoriesManagement = user.categoriesManagement;
                        break;
                    default:
                        break;
                }

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

            const newUser = new User({ username, fullname, email, userType });

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
                    newUser.isActive = true;
                    break;
                default:
                    errors.userType = 'Usertype does not exist.'
                    return res.status(400).json(errors);
            }

            newUser.password = newUser.encryptPassword(password);

            return newUser
                .save()
                .then(userCreated => {
                    const authUrl = `${rootUrl}/api/user/confirm/${userCreated._id}`;

                    sendActivationEmail(userCreated.email, authUrl);
                    return res.json(userCreated);
                });
        })
        .catch(err => res.status(400).json(err));
});

router.get('/activation/:userId', (req, res) => {
    const errors = {};
    const userId = req.params.userId;

    User
        .findOne({ _id: userId, isActive: true })
        .then(user => {
            if (!user) {
                errors.message = 'Your token invaild.'
                return res.status(400).json(errors);
            }

            if (user.confirmed) {
                errors.message = 'Account already confirmed.'
                return res.status(400).json(errors);
            }

            user.confirmed = true;

            return user
                .save()
                .then(userUpdated => res.json(userUpdated));
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

            const authCode = 1000 + new Date().getTime() % 9000;

            sendForgotPasswordEmail(user.email, authCode);
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;