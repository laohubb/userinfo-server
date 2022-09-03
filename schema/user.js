const joi = require('joi')

// 用户名密码验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}
// 用户昵称邮箱验证规则
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.update_userinfo_schema = {
    body: {
        nickname,
        email,
    },
}

// 用户更改密码验证规则
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

//用户头像验证规则
const avatar = joi.string().dataUri().required()
exports.update_avatar_schema = {
    body: {
        avatar,
    },
}
