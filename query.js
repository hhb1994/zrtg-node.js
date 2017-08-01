var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user:  'root',
    password: 'root',
    port: '3306',
    database: 'demo1'
});
connection.connect();
var sql = 'SELECT * FROM project order by id DESC limit 3';
connection.query(sql,function (err,result) {
    if(err){
        console.log('error');
        return;
    }
    var string=JSON.stringify(result);
    var json=JSON.parse(string);
    console.log(json);
    console.log(json.length);
    for (var i =0; i <json.length; i++) {
        console.log(json[i].id,json[i].company,json[i].project);

    };
});
connection.end();