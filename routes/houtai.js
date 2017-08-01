var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../model/config');
var pool = mysql.createPool(config.mysql);
router.get('/', function(req, res, next) {
    pool.getConnection(function (err,connection) {
        var sql = 'SELECT * FROM project';
        connection.query(sql, function (err, result) {
            connection.release();
            var string=JSON.stringify(result);
            var result=JSON.parse(string);
            res.render('houtai', {results:result});
        });
    })
});
router.post('/houtaipost',function (req,res,next) {
    var max = req.body.max;
    var number = req.body.number;
    pool.getConnection(function (err,connection) {
        var $sql = 'INSERT INTO final(id, max, number) VALUES(0, ?, ?)';
        connection.query($sql,[max, number],function (err,result) {
            connection.release();

        });
    });
});
module.exports = router;
