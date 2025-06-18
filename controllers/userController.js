const User = require("../models/userSchema");
const jwt = require("jsonwebtoken")

const GetUserData = async(req,res)=>{
    try {
        const userId = req.params.id
        const UserData = await User.findById(userId)
        console.log("ud",UserData)
        res.status(200).json(UserData)
    } catch (error) {
        console.log("Error in fetching user data",error)
    }
}

const generateToken =(userId)=>{
    const token = jwt.sign({id:userId}, process.env.JWT_SECRETKET, {
        expiresIn: "7d"
    })
    return token
}

const UploadImage = async(req,res)=>{
    try {
        const {userId} = req.body 
        console.log("FILE:", req.file); 
        console.log("BODY:", userId)
        const imageUrl = `uploads/${req.file.filename}`;

        const UpdatedUser = await User.findByIdAndUpdate(
            userId,
            {profileImage:imageUrl}
        )
        const token = generateToken(UpdatedUser._id)
        res.status(200).json({
            user:{
                _id:UpdatedUser._id,
                name:UpdatedUser.name,
                email:UpdatedUser.email,
                role:UpdatedUser.role,
                profileImage:UpdatedUser.profileImage
            },
            token
        })
    } catch (error) {
        console.log("Error in image upload",error)
    }
}


module.exports ={
    GetUserData,
    UploadImage
}