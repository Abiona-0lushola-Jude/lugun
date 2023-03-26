const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema({
    name:String,
    lat:String,
    long:String,
    acrimony:String,
    userId:String
})

module.exports = mongoose.model('UniversityModel', UniversitySchema)