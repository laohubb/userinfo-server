const express=require('express')

const router=express.Router()

const getUserinfo=require('../router-handler/userinfo')


router.get('/userinfo',getUserinfo.getUserinfo)


module.exports=router
