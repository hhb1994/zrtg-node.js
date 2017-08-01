var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../model/config');
var pool = mysql.createPool(config.mysql);
router.get('/', function(req, res, next) {
    pool.getConnection(function (err,connection) {
        var sql = 'SELECT * FROM project order by id DESC limit 1';
        connection.query(sql, function (err, result) {
            var string=JSON.stringify(result);
            var result=JSON.parse(string);
            res.render('guanli3', {results:result});
        });
    })
});
router.post('/guanli3post',function (req,res,next) {
    var company = req.body.company;
    var project = req.body.project;
    var amount = req.body.amount;
    pool.getConnection(function (err,connection) {
        var $sqla = 'INSERT INTO project(id, company, project, amount) VALUES(0, ?, ?, ?)';
        connection.query($sqla,[company, project, amount],function (err,result) {
            connection.release();

        });
    });
});
module.exports = router;