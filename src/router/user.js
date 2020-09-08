const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res) =>{
    const method = req.method   // GET POST
const getCookieExpires = ()=>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    console.log('time',d.toGMTString())
    return d.toGMTString()
}    
    // 登录
    if(method === 'GET'  && req.path === '/api/user/login') {
        const {username, password} = req.query
        return login(username, password).then(data=>{
            if(data.username){
                res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel("登录成功")
            }else{
                return new ErrorModel("登录失败")
            }

        })
     }

     //登录验证的测试
     if(method === 'GET' && req.path === '/api/user/login-test' ){
         if(req.cookie.username){
            return Promise.resolve(new SuccessModel()) 
         }
         return Promise.resolve(new ErrorModel('尚未登录'))
     }
}

module.exports = handleUserRouter