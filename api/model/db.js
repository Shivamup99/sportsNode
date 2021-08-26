const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const url = process.env.MONGOURL
const mongoDbConnect = async()=>{
    try {
        await mongoose.connect(url)
        console.log('connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoDbConnect;