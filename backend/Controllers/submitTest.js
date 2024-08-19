const express = require('express');
const router = express.Router();
const TestResult = require('../models/testResultSchema');
const authenticate = require('../Middlewares/validateToken'); // Uncomment this if you want to use authentication

// Controller function for submitting the test result
const submitTest = async (req, res) => {
    try {
        const { score, totalQuestions, correctAnswers } = req.body;
        const userId = req.user._id; // Assuming req.user is populated by the authenticate middleware

        // Create a new test result instance
        const testResult = new TestResult({
            userId,
            score,
            totalQuestions,
            correctAnswers,
        });

        // Save the test result to the database
        await testResult.save();
        res.status(201).json({ message: 'Test result submitted successfully' });
    } catch (error) {
        console.error('Error submitting test result:', error);
        res.status(500).json({ error: 'An error occurred while submitting the test result' });
    }
};

// Define the POST route for submitting the test
router.post('/submitTest',authenticate,  submitTest); // Add `authenticate` middleware if authentication is required

module.exports = router;
