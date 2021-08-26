const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    video:{
        type:String
    }
    
},{timestamps:true})

module.exports = mongoose.model('About',aboutSchema)