
const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")

router.post("/adminLogin",adminController.AdminLogin)


module.exports = router