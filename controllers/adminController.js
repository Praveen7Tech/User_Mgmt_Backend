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

const GetUsersData = async(req,res)=>{
    try {
        const UsersData = await User.find()
        return res.status(200).json(UsersData)
    } catch (error) {
        console.log("fetch error",error)
    }
}


const FetchUser = async(req,res)=>{
    try {
        const userId = req.params.id;

        const data = await User.findById(userId)
        return res.status(200).json({data})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    AdminLogin,
    GetUsersData,
    FetchUser
}