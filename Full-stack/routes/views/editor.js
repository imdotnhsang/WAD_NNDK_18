var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render(
        'editor',
        {
            title: 'Blog Post',
            srcScript: ''
        }
    );
});

module.exports = router;