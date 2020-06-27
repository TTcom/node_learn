const {exec} = require('../db/mysql')

const getList = (author, keyword)=>{
    let sql = `select * from blogmsg where 1=1 `
    if(author) {
        sql += `and author='${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql +=`order by createtime desc` //根据创建时间倒序排序
    return exec(sql)
}


const getDetail = (id)=>{
       
    return {
        id:1,
        title:"a",
        content:'内容A的详情'
    }

}


const newBlog = (blogData = {})=>{
    //blogData 是一个博客对象，包含 title content
    return{
        id:3 //表示新建博客插入到数据库里面的id
    }
}

const updateBlog = (blogData = {})=>{
    //blogData 是一个博客对象，包含更新后的 id,title content
    return false
}

const delBlog = (id)=>{
    //id 就是要删除的博客
    return true
}
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog
}