const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res) =>{
    const method = req.method   // GET POST
   
    // 登录
    if(method === 'GET'  && req.path === '/api/user/login') {
        const {username, password} = req.query
        return login(username, password).then(data=>{
            if(data.username){
                //设置session
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session',req.session)
                  return new SuccessModel("登录成功")
            }else{
                return new ErrorModel("登录失败")
            }

        })
     }

     //登录验证的测试
     if(method === 'GET' && req.path === '/api/user/login-test' ){
        console.log('req.session',req.session)
         if(req.session.username){
            return Promise.resolve(new SuccessModel({
                session:req.session
            })) 
         }
         return Promise.resolve(new ErrorModel('尚未登录'))
     }
}

module.exports = handleUserRouter