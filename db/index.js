const mysql=require('mysql')


const db=mysql.createPool({
    host:'192.168.1.254',
    user:'root',
    password:'database',
    database:'data'
})


module.exports=db
