const express = require('express');
const router = express.Router();
const _ = require('lodash');
const passport = require('passport');
const path = require('path');
const fs = require('fs');

const {
    sendOTPCode,
    createOTP,
    pickUser
} = require('../../utils');
const {
    User
} = require('../../models/User');

const multer = require('multer');
const destAvatar = path.join(__dirname, '../../public/images/avatars/');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destAvatar);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/login', (req, res) => {
    passport.authenticate('local.login', (err, user) => {
        const {
            isRemember
        } = req.body;

        console.log('isRemember: ', isRemember);

        if (err) {
            console.log(err);

            return res.status(400).json(err);
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json(err);
            }

            if (isRemember) {
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
            } else {
                req.session.cookie.expires = false;
            }

            return res.json(user);
        });
    })(req, res);
});

router.post('/register', (req, res) => {
    const errors = {};
    const {
        username,
        fullname,
        email,
        password,
        userType,
        pseudonym,
        categoriesManagement
    } = req.body;

    User
        .findOne({
            $or: [{
                username
            }, {
                email
            }]
        })
        .then(user => {
            if (user) {
                if (user.username === username) {
                    errors.username = 'Username already exist.';
                }

                if (user.email === email) {
                    errors.email = 'Email already exist.';
                }

                return res.status(400).json(errors);
            }

            const OTP = createOTP();
            const newUser = new User({
                username,
                fullname,
                email,
                userType,
                OTP
            });

            newUser.confirmed = true;
            newUser.expiredAt = Date.now() + 7 * 24 * 3600 * 1000;

            switch (userType) {
                case 'subscriber':
                    newUser.confirmed = false;
                    break;
                case 'editor':
                    if (_.isEmpty(categoriesManagement)) {
                        errors.categoriesManagement = 'categoriesManagement is required.'
                        return res.status(400).json(errors);
                    }

                    newUser.categoriesManagement = categoriesManagement;
                    break;
                case 'writer':
                    if (_.isEmpty(pseudonym)) {
                        errors.pseudonym = 'Pseudonym is required.'
                        return res.status(400).json(errors);
                    }
                    newUser.pseudonym = pseudonym;
                    break;
                case 'administrator':
                    newUser.expiredAt = Date.now() + 100 * 365 * 24 * 3600 * 1000;
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
                    
                    if (!payload.confirmed) {
                        sendOTPCode(userCreated.email, userCreated.OTP.code, 'activation');
                    }

                    return res.json(payload);
                })
        })
        .catch(err => res.status(400).json(err));
});

router.post('/update', (req, res) => {
    const errors = {};

    const {
        email,
        fullname,
        gender,
        birthday,
        pseudonym
    } = req.body;

    if (!req.user || email !== req.user.email) {
        errors.email = 'authorization has failed.';
        return res.status(400).json(errors);
    }

    if (!fullname || fullname.length === 0 || fullname.length > 32) {
        errors.fullname = 'Fullname is invalid.'
    }

    if (gender && !_.isBoolean(gender)) {
        errors.gender = 'Gender is invalid.';
    }

    if (birthday && !_.isNumber(birthday)) {
        errors.birthday = 'Birthday is invalid.';
    }

    const isInvalid = Object.keys(errors).length;
    if (isInvalid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email
    })
        .then(user => {
            if (!user) {
                errors.email = 'authorization has failed.';
                return res.status(400).json(errors);
            }

            if (user.userType === 'writer') {
                if (_.isEmpty(pseudonym)) {
                    errors.pseudonym = 'Pseudonym is invalid.';
                    return res.status(400).json(errors);
                }

                user.pseudonym = pseudonym;
            }

            user.fullname = fullname;
            user.gender = gender;
            user.birthday = birthday;

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);
                    req.session.passport.user = payload;

                    return res.json(payload);
                });
        })
        .catch(err => res.status(400).json(err));
});

router.post('/assignment', (req, res) => {
    const { categoriesManagement, editorId } = req.body;

    if (_.isEmpty(categoriesManagement)) {
        return res.status(404).json({ categoriesManagement: "categoriesManagement is requied. " });
    }

    User
        .findOne({
            _id: editorId,
            isActive: true
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ user: "User not found. " });
            }

            user.categoriesManagement = categoriesManagement;

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);
                    req.session.passport.user = payload;

                    return res.json(payload);
                });
        })
        .catch(err => res.status(400).json(err));
})

router.post('/change-password', (req, res) => {
    const errors = {};

    const {
        email,
        currentPassword,
        newPassword
    } = req.body;

    if (!req.user || email !== req.user.email) {
        errors.email = 'Authorization has failed.';
        return res.status(400).json(errors);
    }

    User.findOne({
        email
    })
        .then(user => {
            if (!user) {
                errors.email = 'Authorization has failed.';
                return res.status(400).json(errors);
            }

            if (!user.validPassword(currentPassword)) {
                errors.currentPassword = 'Current password incorrect.'
                return res.status(400).json(errors);
            }

            user.password = user.encryptPassword(newPassword);

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);
                    req.session.passport.user = payload;

                    return res.json(payload);
                })
        })
        .catch(err => res.status(400).json(err));
})

router.post('/send-OTP', (req, res) => {
    const errors = {};
    const {
        email,
        actionType
    } = req.body;

    User.findOne({
        email
    })
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
    const {
        email,
        OTPCode,
        actionType,
        password
    } = req.body;

    User.findOne({
        email
    })
        .then(user => {
            if (!user) {
                errors.email = 'Email does not exist.'
                return res.status(400).json(errors);
            }

            const OTP = user.OTP;
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

                case 'forgottenPassword':
                    console.log('password: ', password);

                    user.password = user.encryptPassword(password);

                    return user.save()
                        .then(userUpdated => {
                            console.log(userUpdated);

                            const payload = pickUser(userUpdated, userUpdated.userType);
                            return res.json(payload);
                        })
                default:
                    errors.actionType = 'Action type is invalid.'
                    return res.status(400).json(errors);
            }
        })
        .catch(err => res.status(400).json(err));

});

router.post('/recovery-password', (req, res) => {
    const errors = {};
    const {
        newPassword,
        email
    } = req.body;

    User
        .findOne({
            email,
            isActive: true
        })
        .then(user => {
            if (!user) {
                errors.email = 'Email does not exits.';
                return res.status(404).json(errors);
            }

            user.password = newUser.encryptPassword(newPassword);

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);
                    return res.json(payload);
                })

        })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.post('/renew-premium', (req, res) => {
    const errors = {};

    const {
        email,
        renewTime
    } = req.body;

    if (!_.isNumber(renewTime)) {
        errors.renewTime = 'Renew time is invalid.';

        return res.status(400).json(errors);
    }

    User
        .findOne({
            email,
            isActive: true
        })
        .then(user => {
            if (!user) {
                errors.email = 'Authorization has failed.';
                return res.status(400).json(errors);
            }

            user.expiredAt = Date.now() + renewTime;

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);
                    // req.session.passport.user = payload;

                    return res.json(payload);
                });
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    const errors = {};

    const file = req.file;
    if (!file) {
        errors.avatar = 'Avatar is invalid.';
        return res.status(400).json(errors);
    }

    const filename = req.file.filename;

    const {
        email
    } = req.body;

    if (!req.user || email !== req.user.email) {
        errors.email = 'Authorization has failed.';
        fs.unlinkSync(destAvatar + filename);

        return res.status(400).json(errors);
    }

    User
        .findOne({
            email,
            isActive: true
        })
        .then(user => {
            if (!user) {
                errors.email = 'Authorization has failed.';
                fs.unlinkSync(destAvatar + filename);

                return res.status(400).json(errors);
            }

            const pathFile = '/images/avatars/' + filename
            user.avatar = pathFile;

            return user.save()
                .then(userUpdated => {
                    const payload = pickUser(userUpdated, userUpdated.userType);
                    req.session.passport.user = payload;

                    return res.json(payload);
                });
        })
        .catch(err => {
            fs.unlinkSync(destAvatar + filename);
            return res.status(400).json(err);
        });
});

module.exports = router;