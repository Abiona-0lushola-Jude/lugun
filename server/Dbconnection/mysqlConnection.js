const mysql = require('mysql')


const myConnection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"@Lawrence1",
    database:"university_lugun"
})

myConnection.connect(()=>{
    console.log("Connection is stable with mysql")
})


module.exports =  myConnection