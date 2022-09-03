const express=require('express')

const router=express.Router()

const userInfoHandler=require('../router-handler/userinfo')

const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema } = require('../schema/user')
const {update_password_schema}=require('../schema/user')
const {update_avatar_schema}=require('../schema/user')

router.get('/userinfo',userInfoHandler.getUserinfo)

router.post('/updateUserinfo',expressJoi(update_userinfo_schema),userInfoHandler.updateUserinfo)

router.post('/updateUserPwd',expressJoi(update_password_schema),userInfoHandler.updateUserPassword)

router.post('/updateUserAvatar',expressJoi(update_avatar_schema),userInfoHandler.updateUserAvatar)

module.exports=router
