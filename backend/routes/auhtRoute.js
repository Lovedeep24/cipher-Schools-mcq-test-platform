const express = require("express");
const { login, signup } = require("../Controllers/authController");
const { findQuestion, insertQuestion } = require("../Controllers/questionController");
const submitTest= require("../Controllers/submitTest");


const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/questions", findQuestion);
router.post("/questions", insertQuestion);
router.post('/submitTest', submitTest);

module.exports = router;
