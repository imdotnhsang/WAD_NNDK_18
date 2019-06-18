var express = require('express');
var router = express.Router();

router.use('/', require('./handleFiles'));

module.exports = router;