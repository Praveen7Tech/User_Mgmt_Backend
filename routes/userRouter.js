
const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const upload = require("../middlewares/multer")

router.get("/getUserData/:id",userController.GetUserData)
router.post("/UploadPicture", upload.single("profileImage"),userController.UploadImage)

router.put("/updateProfile/:id",upload.single("profileImage"),userController.UpdateProfile)

module.exports = router