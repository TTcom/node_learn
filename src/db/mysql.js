const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db.js')
console.log(23123)
//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)    
// const con = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password: '123456',
//     port:'3306',
//     database:'blog'
// })
//开始连接
con.connect();
//统一执行sql的函数

function exec(sql){
    return new Promise((resolve,reject)=>{
            con.query(sql,(err,result)=>{
            
                if(err){
                    reject(err)
                    console.log(err)
                    return
                }
                resolve(result)
            })
            
        })
}
module.exports = {
    exec
}

//const sql = 'select * from user'
//执行sql语句
// con.query(sql,(err,result)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log(result)
// })

// //关闭连接
// con.end();