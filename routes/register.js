var express = require('express');
var router = express.Router();
// 实现与MySQL交互
var mysql = require('mysql');
var config = require('../model/config');
// 使用连接池，提升性能
var pool = mysql.createPool(config.mysql);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('register', {title: 'register'});
});
router.post('/userRegister', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name; //获取前台请求的参数
    pool.getConnection(function (err, connection) {
        //先判断该账号是否存在
        var $demo1 = "select * from demo1 where username=?";
        connection.query($demo1, [username], function (err, result) {
            var resultJson = result;
            console.log(resultJson.length);
            if (resultJson.length !== 0) {
                result = {
                    code: 300,
                    msg: '该账号已存在'
                };
                res.json(result);
                connection.release();
            } else {  //账号不存在，可以注册账号
                // 建立连接，向表中插入值  数据库表名为user-info会出错
                var $demo2 = "INSERT INTO demo1(id, username, password, name) VALUES(0,?,?,?)";
                connection.query($demo2, [username, password, name], function (err, result) {
                    console.log(result);
                    if (result) {
                        result = {
                            code: 200,
                            msg: '注册成功'
                        };
                    } else {
                        result = {
                            code: 400,
                            msg: '注册失败'
                        };
                    }
                    res.json(result); // 以json形式，把操作结果返回给前台页面
                    connection.release();// 释放连接
                });
            }
        });
    });
});
module.exports = router;