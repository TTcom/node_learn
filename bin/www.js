const http = require('http');
const serverHandle = require('../app')

const server = http.createServer(serverHandle);

server.listen(3000,()=>{
    console.log('listening on 3000')
})

// const mysql = require('mysql');

// //创建连接对象
// const con = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password: '123456',
//     port:'3306',
//     database:'blog'
// })

// //开始连接
// con.connect()

//执行sql语句
// const sql = 'select * from user;'
// con.query(sql,(err, result) =>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(result)
// })