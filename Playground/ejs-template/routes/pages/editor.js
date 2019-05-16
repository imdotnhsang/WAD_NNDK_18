var express = require('express');
var router = express.Router();

router.get('/blog-post', function (req, res, next) {
    res.render(
        'pages/editor',
        {
            title: 'Blog Post',
            srcScript: ''
        }
    );
});

module.exports = router;