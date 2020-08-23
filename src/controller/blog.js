const {exec} = require('../db/mysql')

const getList = (author, keyword)=>{
    let sql = `select * from blogmsg where 1=1 `
    if(author) {
        sql += `and author='${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql +=`order by createtime desc` //order:顺序;根据创建时间倒序排序
    return exec(sql)
}


const getDetail = (id)=>{
    const sql = `select * from blogmsg where id='${id}'`
    return exec(sql).then(rows=>{
        return rows[0]
    })
}


const newBlog = (blogData = {})=>{
    //blogData 是一个博客对象，包含 title content
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()
    const sql = `
     insert into blogmsg (title,content,createtime,author)
     values ('${title}', '${content}', ${createTime}, '${author}');
    `
    return exec(sql).then(res=>{
        console.log('insertdata',res)
        return{
            id:res.insertId//表示新建博客插入到数据库里面的id
        }
    })
   
}

const updateBlog = (id,blogData = {})=>{
    //blogData 是一个博客对象，包含更新后的 id,title content
    const title = blogData.title
    const content = blogData.content
    const sql = `update blogmsg set title='${title}',content='${content}' where id='${id}'`
    return exec(sql).then(res=>{
        if(res.affectedRows > 0){ 
            return true
        }
        return false
    })
   // return true
}

const delBlog = (id,author)=>{
    //id 就是要删除的博客
    const sql = `delete from blogmsg where id='${id}' and author='${author}'`
    return exec(sql).then(res=>{
        if(res.affectedRows > 0){ 
            return true
        }
        return false
    })
}
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}