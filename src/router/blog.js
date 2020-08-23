
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id || ''
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
      return getList(author, keyword).then(res=>{
        return new SuccessModel(res)
       })
        
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
         return getDetail(id).then(data=>{
             return new SuccessModel(data)
         })
    }   

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = "jack";
        return newBlog(req.body).then(res=>{
            return new SuccessModel(res)
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return updateBlog(id,req.body).then(val=>{
            console.log(val)
            if (val) {
                return new SuccessModel(val)
            } else {
                return new ErrorModel('更新博客失败')
            }
        })

        

    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        req.body.author = "jack";
        return delBlog(id,req.body.author ).then(val=>{
            console.log(val)
            if (val) {
                return new SuccessModel(val)
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }

}

module.exports = handleBlogRouter;