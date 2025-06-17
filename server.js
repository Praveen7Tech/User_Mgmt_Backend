
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const DataBase = require("./config/dataBase")
DataBase()

const app = express()


const PORT = process.env.PORT
app.listen(PORT,()=> console.log(`port active on http://localhost${PORT}`))