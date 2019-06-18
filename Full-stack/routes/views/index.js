var express = require('express');
var router = express.Router();

router.use('/', require('./user'));
router.use('/administrator', require('./administrator'));
router.use('/auth', require('./auth'));
router.use('/writer', require('./writer'));
router.use('/editor', require('./editor'));
router.use('/utils', require('./utils'));

router.get('/', function (req, res, next) {
    res.redirect('/home');
});

module.exports = router;