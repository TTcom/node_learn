const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring');

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
        //处理BLOG路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
                blogResult.then(blogData=>{
                    if (blogData) {
                        res.end(
                            JSON.stringify(blogData)
                        )
                    }
                })
                return
        }

        //处理USER路由
        const userResult = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        if(userResult){
            userResult.then(userData=>{
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
