const express = require("express");
const { login, signup } = require("../Controllers/authController");
const findQuestion= require("../Controllers/questionController");
const submitTest= require("../Controllers/submitTest");
const submissioncheck=require('../Controllers/submissionCheck')
const validateQuestion=require('../Middlewares/validateQuestion');
const insertQuestion = require("../Controllers/insertQuestions");

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);
router.get("/questions", findQuestion);
router.post("/insertquestions", validateQuestion,insertQuestion);
router.post('/submitTest', submitTest);
router.get('/submissions', submissioncheck );

module.exports = router;
