const express=require('express')

const app=express()

const cors= require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))




// 路由错误级别中间件
app.use((req,res,next)=>{
    res.cc =function (msg,status=1){
        res.send({
            status,
            message:msg instanceof Error ? msg.message :msg,
        })
    }
    next()
})

// 获取token中间件
const config = require('./config')
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
app.use( (err, req, res, next) =>{

    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
})

// 用户路由模块
const userRouter=require('./router/user')
app.use('/api',userRouter)
// 用户信息路由模块
const userinfo=require('./router/userinfo')
app.use('/my',userinfo)

// 表单验证中间件
const joi = require('joi')
app.use( (err,req,res,next)=> {
    if (err instanceof joi.ValidationError)  return res.cc(err)
    res.cc(err)
})

app.listen(3006,()=>{
    console.log('api server runnning at http://127.0.0.1:3007')
})

