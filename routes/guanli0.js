var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('guanli0', { title: 'guanli0' });
});

module.exports = router;