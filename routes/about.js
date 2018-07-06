var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET home page. */
router.get('/about2', function(req, res, next) {
  res.render('about', { title: 'About with extras' });
});

module.exports = router;