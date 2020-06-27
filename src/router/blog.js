
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
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const onUpdate = updateBlog(req.body)
        if (onUpdate) {
            return new SuccessModel()
        } else {
            return new ErrorModel()
        }

    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel()
        }
    }

}

module.exports = handleBlogRouter;