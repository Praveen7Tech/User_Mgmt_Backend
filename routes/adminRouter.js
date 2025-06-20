
const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.post("/adminLogin",adminController.AdminLogin)
router.get("/getUsersData",adminController.GetUsersData)
router.get("/getProfileData/:id",adminController.FetchUser)
router.put("/editUser/:id",adminController.EditUser)
router.delete("/deleteUser/:id",adminController.DeleteUser)
router.post("/createUser",adminController.CreateUser)

router.get("/getAdmin/:id",adminController.GetAdmin)


module.exports = router