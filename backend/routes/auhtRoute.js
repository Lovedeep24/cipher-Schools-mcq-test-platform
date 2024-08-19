const express = require("express");
const {login,signup} = require("../Controllers/authController");
// const saveTestResult = require("../Controllers/saveTestResult");
// const adminCheck = require("../Middlewares/adminCheck");
// const createTest = require("../Controllers/createTest");
const { findQuestion, insertQuestion } = require("../Controllers/questionController");
const submitTest = require("../Controllers/submitTest");
// const validateToken = require("../Middlewares/validateToken");
const router=express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.get("/questions",findQuestion);
router.post("/questions",insertQuestion);
router.post('/submitTest', submitTest);
// router.post('/saveTestResult', saveTestResult);

// router.post("/create-test",validateToken,adminCheck,createTest);
// router.post("current",validateToken)

module.exports=router;