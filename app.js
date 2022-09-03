const express=require('express')

const app=express()

const cors= require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.cc =function (msg,status=1){
        res.send({
            status,
            message:msg instanceof Error ? msg.message :msg,
        })
    }
    next()
})

const joi = require('joi')



const userRouter=require('./router/user')
app.use('/api',userRouter)
app.use( (err,req,res,next)=> {
    if (err instanceof joi.ValidationError)  res.cc(err)
    res.cc(err)
})

app.listen(3006,()=>{
    console.log('api server runnning at http://127.0.0.1:3007')
})

