const express=require('express')

const app=express()


const cors= require('cors')
app.use(cors())

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.cc =function (err,status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message :err,
        })
    }
    next()
})

const userRouter=require('./router/user')
app.use('/api',userRouter)

app.listen(3006,()=>{
    console.log('api server runnning at http://127.0.0.1:3007')
})

