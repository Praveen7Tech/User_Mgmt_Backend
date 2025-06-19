
const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.post("/adminLogin",adminController.AdminLogin)
router.get("/getUsersData",adminController.GetUsersData)
router.get("/getProfileData/:id",adminController.FetchUser)


module.exports = router