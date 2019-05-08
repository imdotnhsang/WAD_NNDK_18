var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/administrator', function(req, res, next) {
  res.render('pages/administrator/index', { title: 'Express' });
});

module.exports = router;
