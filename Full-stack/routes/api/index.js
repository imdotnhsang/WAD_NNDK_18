const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/tag', require('./tag'));

module.exports = router;