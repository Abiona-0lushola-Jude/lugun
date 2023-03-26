require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.Mongoose_URL)

const DB = mongoose.connection

DB.on('error', (error)=> console.log(error))
DB.once('open', ()=> console.log("DATABASE CONNECTED"))