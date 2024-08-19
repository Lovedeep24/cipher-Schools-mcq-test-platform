const TestResult = require('../models/testResultModel');

const saveTestResult = async (req, res) => {
    const { userId, score, answers } = req.body;

    try {
        const newTestResult = new TestResult({
            userId,
            score,
            answers
        });

        await newTestResult.save();
        res.status(201).json({ message: 'Test result saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save test result' });
    }
};

module.exports = saveTestResult;
