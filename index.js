const mysql = require('mysql')
console.log(23123)
//创建连接对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'blog'
})
//开始连接
con.connect();
//写一个sql语句
const sql = 'select * from user'
//执行sql语句
con.query(sql,(err,result)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(result)
})

//关闭连接
con.end();