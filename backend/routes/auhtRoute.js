const express = require("express");
const { login, signup } = require("../Controllers/authController");
const findQuestion= require("../Controllers/questionController");
const submitTest= require("../Controllers/submitTest");
const submissioncheck=require('../Controllers/submissionCheck')
const validateQuestion=require('../Middlewares/validateQuestion');
const insertQuestion = require("../Controllers/insertQuestions");
const forgotPassword = require("../Controllers/forgotPassword");
const resetPassword = require("../Controllers/resetPassword");
const createTest=require('../Controllers/createTests');
const addquestionToTest=require('../Controllers/quesToTest');
const allTests=require('../Controllers/allTests');
const questions=require('../Controllers/showTest')
// const tests = require("../Controllers/createTests");
const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);
router.get("/questions", findQuestion);
router.post("/insertquestions", validateQuestion,insertQuestion);
router.post("/createTest", createTest);
router.post("/:testid/ques-to-test", addquestionToTest);
router.get("/tests", allTests);
router.get("/tests/:testId/questions", questions);
router.post('/submitTest', submitTest);
router.get('/submissions', submissioncheck );
// router.post('/forget-password', forgotPassword);
// router.get('/reset-password', resetPassword );

module.exports = router;
