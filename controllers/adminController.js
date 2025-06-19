const User = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const generateToken =(userId)=>{
    const token = jwt.sign({id:userId}, process.env.JWT_SECRETKET, {
        expiresIn: "7d"
    })
    return token
}

const AdminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const Admin = await User.findOne({email})
        
        if(!Admin || Admin.role !== "admin"){
            return res.status(400).json({message : "Admin not found"})
        }
        const validate = await bcrypt.compare(password, Admin.password)
        if(!validate) return res.status(400).json({message : "Invalid credentials"})
        const Token = generateToken(Admin._id)
        return res.status(200).json({
            message : "Admin logged successfully",
            admininfo:{
                    id : Admin._id,
                    name : Admin.name,
                    email : Admin.email,
                    role : Admin.role
            },
            token:Token
        })    
    } catch (error) {
        console.log("Error in admin login",error)
    }
}


module.exports = {
    AdminLogin
}