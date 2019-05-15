const express = require('express');
const router = express.Router();

const { User } = require('../../models/User');

router.post('/login', (req, res, _) => {
    const errors = {};
    const { username, password } = req.body;

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                errors.username = 'Username not found.';
                return res.status(400).json(errors);
            }

            if (user.validPassword(password)) {
                const payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    birthday: user.birthday,
                    fullname: user.fullname
                };

                switch (user.userType) {
                    case 'subscriber':
                        payload.expiredAt = user.expiredAt;
                        break;
                    case 'writer':
                        break;
                    case 'editor':
                        payload.categoriesManagement = user.categoriesManagement;
                        break;
                    case 'admin':

                        break;
                    default:
                        break;
                }

                return res.json(payload);
            } else {
                errors.password = "Password incorrect.";
                return res.status(400).json(errors);
            }
        })
});

router.post('/register', (req, res, _) => {
    const errors = {};
    const { username, fullname, email, password, userType } = req.body;

    User
        .findOne({ $or: [{ username }, { email }] })
        .then(user => {
            console.log(user);

            if (user) {
                if (user.username === username) {
                    errors.username = 'Username already exist.'
                }

                if (user.email === email) {
                    errors.email = 'Email already exist.'
                }

                return res.status(400).json(errors)
            }

            const newUser = new User({ username, fullname, email, userType });

            switch (userType) {
                case 'subscriber':
                    newUser.expiredAt = new Date().getTime();
                    break;
                case 'editor':
                    break;
                default:
                    errors.userType = 'Usertype does not exist.'
                    return res.status(400).json(errors)
            }

            newUser.password = newUser.encryptPassword(password);

            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
});

router.get('/current', (req, res, _) => {

});

module.exports = router;