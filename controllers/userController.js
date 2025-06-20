const User = require("../models/userSchema");
const jwt = require("jsonwebtoken")

const GetUserData = async(req,res)=>{
    try {
        const userId = req.params.id
        const UserData = await User.findById(userId)
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

const UpdateProfile = async(req,res)=>{
    try {
        const userData = JSON.parse(req.body.userData)
        const userId = req.params.id
        const file = req.file

        const update = {}
        if(userData.editName) update.name = userData.editName;
        if(file){
            const imageURL = `uploads/${file.filename}`
            update.profileImage = imageURL
        } 
    
        await User.findByIdAndUpdate(userId, update )
        return res.status(200).json({message : "Profile updated successfully"})
    } catch (error) {
        console.log(error)
    }
}


module.exports ={
    GetUserData,
    UploadImage,
    UpdateProfile
}