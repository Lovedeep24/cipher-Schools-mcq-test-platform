const express = require("express");
const {login,signup} = require("../Controllers/authController");
const adminCheck = require("../Middlewares/adminCheck");
const createTest = require("../Controllers/createTest");
const validateToken = require("../Middlewares/validateToken");
const router=express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/create-test",validateToken,adminCheck,createTest);
// router.post("current",validateToken)

module.exports=router;