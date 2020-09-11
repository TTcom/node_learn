const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring');
//const user = require('./src/controller/user');

//设置cookie的过期时间
const getCookieExpires = ()=>{
    const d = new Date()
    d.setTime(d.getTime() + (24*60*60*1000))
    console.log('time',d.toGMTString())
    return d.toGMTString()
} 

const SEESION_DATA = {}

//用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    //设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]

    getPostData(req).then(postData => {

        req.body = postData

        //解析 query
        req.query = querystring.parse(url.split('?')[1]);
                     
        //解析 cookie
        req.cookie = {}
        const cookieStr = req.headers.cookie || '' //k1=v1
        cookieStr.split(';').forEach(item=>{
            if(!item){
                return
            }
            const arr = item.split('=')
            const key = arr[0].trim()
            const val = arr[1].trim()
            req.cookie[key] = val
        })
        console.log('cookie',req.cookie)
        //解析session
        let needSetCookie = false  //判断是否需要cookie
        let userId = req.cookie.userid
        console.log('userId',userId)
        
        if(userId){
            if(!SEESION_DATA[userId]){
                SEESION_DATA[userId] = {}
            }
        }else{    //如果没有cookie
            needSetCookie = true
            userId = `${Date.now()}_${Math.random()}`
            SEESION_DATA[userId] = {}
        }
          console.log('SEESION_DATA',SEESION_DATA)
          console.log('SEESION_DATA',SEESION_DATA[userId])
          req.session =  SEESION_DATA[userId]  
          
        //处理BLOG路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
                blogResult.then(blogData=>{
                    if (blogData) {
                        if(needSetCookie){
                            res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                        }
                        res.end(
                            JSON.stringify(blogData)
                        )
                    }
                })
                return
        }

        //处理USER路由
        const userResult = handleUserRouter(req, res)

        if(userResult){
            userResult.then(userData=>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
            res.end(
                      JSON.stringify(userData)
                )    
            })
            return
        }
        //未命中路由，返回404
        res.writeHeader(404, { 'Content-type': 'text/plain' })
        res.write("404 Not Found\n")
        res.end();
    })

}
module.exports = serverHandle;

//process.env.NODE_ENV
