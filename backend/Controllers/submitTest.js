const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path as necessary

const submitTest = async (req, res) => {
  try {
    const { finalScore, totalQuestions, email } = req.body;
    // console.log("request body:",req.body);
if(!finalScore || !totalQuestions || !email)
{
    return res.status(400).json({ message: 'All fields are mandatory' });
}
console.log('Received data:', {finalScore, totalQuestions, email });
    // Store the test submission in the database
    const newSubmission = new TestSubmission({
      finalScore,
      totalQuestions,
      email,
      // submittedAt: new Date(),
      // evaluated: false
    });

    await newSubmission.save();

    // Redirect to "Finish Test" page
    res.status(201).json({ message: 'Test submitted successfully!' });
    // , redirectUrl: '/finish-test'
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};

module.exports = submitTest;