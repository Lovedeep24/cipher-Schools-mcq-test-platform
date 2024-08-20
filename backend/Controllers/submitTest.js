

const Question = require('../models/questionsSchema'); // Adjust the path
const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path

const submitTest = async (req, res) => {
  try {
    const { testId, answers, score, totalQuestions, correctAnswers, userEmail } = req.body;
    console.log('Received request at /submitTest');
    console.log('Request body:', req.body);

    // Store the test submission in the database
    const newSubmission = new TestSubmission({
      testId,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      userEmail,
      submittedAt: new Date(),
      evaluated: false
    });

    await newSubmission.save();

    // Redirect to "Finish Test" page
    res.status(201).json({ message: 'Test submitted successfully!', redirectUrl: '/finish-test' });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};

module.exports = submitTest;

module.exports = { submitTest };
