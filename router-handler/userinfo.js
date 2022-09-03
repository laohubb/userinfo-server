const db=require('../db/index')
const bcrypt = require("bcryptjs");



exports.getUserinfo=(req,res)=>{

    const sql = `select id, username, nickname, email, user_pic from user where id=?`
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1) return res.cc('获取用户信息失败！')
        res.send({
            status:0,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
}


exports.updateUserinfo=(req,res)=>{
    const sql = `update user set ? where id=?`

    db.query(sql, [req.body, req.user.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')


        return res.cc('修改用户基本信息成功！', 0)
    })
}

exports.updateUserPassword=(req,res)=> {
    const sql = `select * from user where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在！')

        const bcrypt = require('bcryptjs')
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('原密码错误！')


        const sql = `update user set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功！', 0)
        })




    })


}



exports.updateUserAvatar=(req,res)=>{
    const sql = 'update user set user_pic=? where id=?'

    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) return res.cc(err)

        if(results.affectedRows!==1) return res.cc('更换头像失败！')

        return res.cc('更换头像成功！',0)
    })

}
