const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
const {token} = require("mysql/lib/protocol/Auth");

exports.regUser = (req, res) => {
    const userinfo = req.body

    const sqlStr = 'select * from user where username=?'

    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.send(err)
        }
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }

        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sqlInsert = 'insert into user set ?'
        db.query(sqlInsert, {username: userinfo.username, password: userinfo.password}, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc("注册用户失败，请稍后再试！")

            res.cc('注册成功', 0)
        })


    })
}


exports.login = (req, res) => {
    const userinfo = req.body

    const sql = `select * from user where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败')
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('登录失败！')
        }

        const user =  {...results[0], password: '', user_pic: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})

        res.send({status:0,
        message:'登录成功',
        token:'Bearer '+tokenStr
        })


    })

}
