var express = require('express');
var router = express.Router();

router.use('/', require('./user'));
router.use('/administrator', require('./administrator'));
router.use('/', require('./auth'));
router.use('/writer', require('./writer'));
router.use('/editor', require('./editor'));
router.use('/utils', require('./utils'));

module.exports = router;