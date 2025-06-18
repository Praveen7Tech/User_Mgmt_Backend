const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const generateToken =(userId)=>{
    const token = jwt.sign({id:userId}, process.env.JWT_SECRETKET, {
        expiresIn: "7d"
    })
    return token
}

const Register = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const exitUser = await User.findOne({email})
        if(exitUser){
            return res.status(400).json({message : "User with this email already exist!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user =await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token = generateToken(user._id)

        res.status(200).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            token
        })
    } catch (error) {
        console.log("Error in user register",error)
    }
}

const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existUser = await User.findOne({email})
        if(!existUser) return res.status(400).json({message : "User not Found"})
        const validatePass = await bcrypt.compare(password, existUser.password)
        if(!validatePass) return res.status(400).json({message : "Invalid credentials"})
        
        const token = generateToken(existUser._id)
        res.status(200).json({
            user:{
                _id : existUser._id,
                name : existUser.name,
                email : existUser.email,
                role : existUser.role
            },
            token
        })
    } catch (error) {
        console.log("Error in login",error)
    }
}



module.exports = {
    Register,
    Login
}