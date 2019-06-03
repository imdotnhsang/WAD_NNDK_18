const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/tag', require('./tag'));
router.use('/category', require('./category'));
router.use('/article', require('./article'));

module.exports = router;