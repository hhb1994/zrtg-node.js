var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../model/config');
var pool = mysql.createPool(config.mysql);
router.get('/', function(req, res, next) {
    pool.getConnection(function (err,connection) {
        var sql1 = 'SELECT * FROM person where show1=0';
        connection.query(sql1, function (err, result) {
            connection.release();
            var string=JSON.stringify(result);
            var result=JSON.parse(string);
            res.render('guanli1', {persons:result});

        });
    })
});
router.post('/guanli1post',function (req,res,next) {
    var name = req.body.name;
    var sex = req.body.sex;
    var depart = req.body.depart;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    pool.getConnection(function (err,connection) {
        var $sql = 'INSERT INTO person(id, name, sex, depart, s1, s2, s3, s4, s5, show1) VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?, 0)';
        connection.query($sql,[name, sex, depart, s1, s2, s3, s4, s5],function (err,result) {
        });
        connection.release();
    });
});
router.post('/guanli1post2',function (req) {
    var id2 = req.body.id2;
    pool.getConnection(function (err,connection) {
        var $sql1 = 'UPDATE person SET show1=1 where id=?';
        connection.query($sql1,[id2],function (err,result) {
        });
        connection.release();
    });
});
router.post('/guanli1post3',function (req) {
    var id2 = req.body.id2;
    var name = req.body.name;
    var sex = req.body.sex;
    var depart = req.body.depart;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    pool.getConnection(function (err,connection) {
        var $sql2 = 'UPDATE person SET name=?,sex=?,depart=?,s1=?,s2=?,s3=?,s4=?,s5=?where id=?';
        connection.query($sql2,[name, sex, depart, s1, s2, s3, s4, s5, id2]
            ,function (err,result) {
        });
        connection.release();
    });
});
module.exports = router;