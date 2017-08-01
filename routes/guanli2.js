var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../model/config');
var pool = mysql.createPool(config.mysql);
router.get('/', function(req, res, next) {
    pool.getConnection(function (err,connection) {
        var sql1 = 'SELECT * FROM demo1';
        connection.query(sql1, function (err, result) {
            connection.release();
            var string=JSON.stringify(result);
            var result=JSON.parse(string);
            res.render('guanli2', {persons:result});

        });
    })
});
module.exports = router;