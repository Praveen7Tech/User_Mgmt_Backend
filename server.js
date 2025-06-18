
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const DataBase = require("./config/dataBase")
DataBase()
const cors = require("cors")
const authRoute = require("./routes/authRouter")
const userRoute = require("./routes/userRouter")
const adminRoute = require("./routes/adminRouter")
const path = require("path") 

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")))


app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/admin",adminRoute)

const PORT = process.env.PORT
app.listen(PORT,()=> console.log(`port active on http://localhost${PORT}`))