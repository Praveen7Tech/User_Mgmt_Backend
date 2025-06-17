
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connctDB = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected..")
    } catch (error) {
        console.log("Db connection error", error)
        process.exit()
    }
}

module.exports = connctDB