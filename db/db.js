const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI_DB)
    console.log("Connected to MongoDB".blue.bold.underline)
}


module.exports = connectDB