const mongoose = require('mongoose')

const LugunSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    review: String,
    rating:String,
    lat:String,
    long:String,
    userId:String,
    userEmail:String
})

module.exports = mongoose.model('LugunModel', LugunSchema)