const mongoose = require('mongoose');
const Question = require('../models/questionsSchema'); // Import the model, not the schema

// Now, Question is your model
const findQuestion = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        console.error("Error retrieving questions:", err);
        res.status(500).json({ error: 'An error occurred while retrieving the questions' });
    }
};

const insertQuestion = async (req, res) => {
    const { questionText, options, correctOption } = req.body;
    if (!questionText || !options || !correctOption) {
        return res.status(400).json({ error: "You must include questionText, options, and correctOption" });
    }
    try {
        const question = new Question({ questionText, options, correctOption });
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while saving the question' });
    }
};

module.exports = {findQuestion, insertQuestion};
